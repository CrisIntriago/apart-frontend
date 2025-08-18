import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { plans } from '@/constants/suscriptionPlans';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function OPTIONS() {
  console.log('🔧 [OPTIONS] CORS preflight request received');
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, stripe-signature',
    },
  });
}

export async function POST(req: NextRequest) {
  console.log('🚀 [WEBHOOK] Stripe webhook iniciado');
  console.log('🕐 [WEBHOOK] Timestamp:', new Date().toISOString());
  
  try {
    console.log('📥 [WEBHOOK] Obteniendo body del request...');
    const body = await req.text();
    console.log('📏 [WEBHOOK] Body length:', body.length);
    
    console.log('🔍 [WEBHOOK] Obteniendo headers...');
    const headersList = headers();
    const signature = headersList.get('stripe-signature');
    
    console.log('🔑 [WEBHOOK] Stripe signature present:', !!signature);
    console.log('🔑 [WEBHOOK] Signature length:', signature?.length || 0);
    console.log('🔧 [WEBHOOK] Environment check:', {
      hasStripeSecret: !!process.env.STRIPE_SECRET_KEY,
      hasWebhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
      backendUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL
    });

    if (!signature) {
      console.error('❌ [WEBHOOK] No stripe signature found in headers');
      console.log('📋 [WEBHOOK] Available headers:', Object.fromEntries(headersList.entries()));
      return NextResponse.json(
        { error: 'No signature found' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      console.log('🔐 [WEBHOOK] Verificando signature con Stripe...');
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      console.log('✅ [WEBHOOK] Evento Stripe validado exitosamente');
      console.log('📋 [WEBHOOK] Event details:', {
        id: event.id,
        type: event.type,
        created: event.created,
        api_version: event.api_version
      });
    } catch (err: any) {
      console.error('❌ [WEBHOOK] Webhook signature verification failed:', err.message);
      console.error('🔍 [WEBHOOK] Error details:', {
        name: err.name,
        message: err.message,
        stack: err.stack?.split('\n').slice(0, 3)
      });
      return NextResponse.json(
        { error: err.message },
        { status: 400 }
      );
    }

    const { type, data } = event;
    console.log('🎯 [WEBHOOK] Processing event type:', type);

    switch (type) {
      case 'checkout.session.completed': {
        console.log('💳 [CHECKOUT] Procesando checkout.session.completed');
        console.log('📋 [CHECKOUT] Session ID:', data.object.id);
        
        try {
          console.log('🔍 [CHECKOUT] Retrieving session details...');
          const session = await stripe.checkout.sessions.retrieve(
            data.object.id,
            { expand: ['line_items'] }
          );
          console.log('✅ [CHECKOUT] Session retrieved successfully');
          console.log('📋 [CHECKOUT] Session details:', {
            id: session.id,
            payment_status: session.payment_status,
            customer: session.customer,
            line_items_count: session.line_items?.data?.length || 0
          });

          const customerId = session?.customer as string;
          console.log('👤 [CHECKOUT] Customer ID:', customerId);
          
          if (!customerId) {
            console.error('❌ [CHECKOUT] No customer ID found in session');
            break;
          }

          console.log('🔍 [CHECKOUT] Retrieving customer details...');
          const customer = await stripe.customers.retrieve(customerId);
          console.log('✅ [CHECKOUT] Customer retrieved:', {
            id: customer.id,
            email: 'email' in customer ? customer.email : 'No email',
            deleted: customer.deleted || false
          });

          const priceId = session?.line_items?.data?.[0]?.price?.id;
          console.log('💰 [CHECKOUT] Price ID from line items:', priceId);
          console.log('📋 [CHECKOUT] Available plans:', {
            monthly: plans.mensual.priceId,
            annual: plans.anual.priceId
          });

          let planType: string | null = null;

          if (plans.mensual.priceId === priceId) {
            planType = "monthly";
            console.log('📅 [CHECKOUT] Plan type detected: MONTHLY');
          } else if (plans.anual.priceId === priceId) {
            planType = "annual";
            console.log('📅 [CHECKOUT] Plan type detected: ANNUAL');
          } else {
            console.warn('⚠️ [CHECKOUT] Unknown price ID, no plan type detected');
            console.log('🔍 [CHECKOUT] Price ID comparison:', {
              received: priceId,
              monthly_expected: plans.mensual.priceId,
              annual_expected: plans.anual.priceId
            });
          }

          if (planType && 'email' in customer && customer.email) {
            console.log('📤 [CHECKOUT] Sending backend update...');
            const backendPayload = {
              hasAccess: true,
              email: customer.email,
              planType,
            };
            console.log('📋 [CHECKOUT] Backend payload:', backendPayload);
            console.log('🌐 [CHECKOUT] Backend URL:', `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/people/update-access/`);

            try {
              const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/people/update-access/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(backendPayload),
              });
              
              console.log('📤 [CHECKOUT] Backend response status:', backendResponse.status);
              console.log('📤 [CHECKOUT] Backend response ok:', backendResponse.ok);
              
              if (backendResponse.ok) {
                const responseData = await backendResponse.text();
                console.log('✅ [CHECKOUT] Backend update successful');
                console.log('📋 [CHECKOUT] Backend response:', responseData);
              } else {
                const errorData = await backendResponse.text();
                console.error('❌ [CHECKOUT] Backend update failed');
                console.error('📋 [CHECKOUT] Backend error:', errorData);
              }
            } catch (err: any) {
              console.error('❌ [CHECKOUT] Error calling backend:', err.message);
              console.error('🔍 [CHECKOUT] Fetch error details:', {
                name: err.name,
                message: err.message,
                stack: err.stack?.split('\n').slice(0, 3)
              });
            }
          } else {
            console.warn('⚠️ [CHECKOUT] Skipping backend update - missing planType or customer email');
            console.log('🔍 [CHECKOUT] Debug info:', {
              hasPlanType: !!planType,
              hasCustomer: !!customer,
              isCustomerDeleted: customer.deleted,
              hasEmail: 'email' in customer ? !!customer.email : false
            });
          }
        } catch (sessionError: any) {
          console.error('❌ [CHECKOUT] Error processing checkout session:', sessionError.message);
          console.error('🔍 [CHECKOUT] Session error details:', {
            name: sessionError.name,
            message: sessionError.message
          });
        }
        break;
      }

      case 'customer.subscription.deleted': {
        console.log('🗑️ [SUBSCRIPTION] Procesando customer.subscription.deleted');
        console.log('📋 [SUBSCRIPTION] Subscription ID:', data.object.id);
        
        try {
          console.log('🔍 [SUBSCRIPTION] Retrieving subscription details...');
          const subscription = await stripe.subscriptions.retrieve(data.object.id);
          console.log('✅ [SUBSCRIPTION] Subscription retrieved successfully');
          console.log('📋 [SUBSCRIPTION] Subscription details:', {
            id: subscription.id,
            status: subscription.status,
            customer: subscription.customer
          });
          
          const customerEmail = (subscription as any).customer_email;
          console.log('📧 [SUBSCRIPTION] Customer email from subscription:', customerEmail);
          
          if (!customerEmail) {
            console.warn('⚠️ [SUBSCRIPTION] No customer email found, trying to get from customer object...');
            try {
              const customer = await stripe.customers.retrieve(subscription.customer as string);
              const email = 'email' in customer ? customer.email : null;
              console.log('📧 [SUBSCRIPTION] Email from customer object:', email);
            } catch (customerError: any) {
              console.error('❌ [SUBSCRIPTION] Error retrieving customer:', customerError.message);
            }
          }

          console.log('📤 [SUBSCRIPTION] Sending revocation to backend...');
          const backendPayload = {
            hasAccess: false,
            email: customerEmail || undefined,
          };
          console.log('📋 [SUBSCRIPTION] Backend payload:', backendPayload);
          console.log('🌐 [SUBSCRIPTION] Backend URL:', `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/people/update-access/`);
          
          try {
            const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/people/update-access/`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(backendPayload),
            });
            
            console.log('📤 [SUBSCRIPTION] Backend response status:', backendResponse.status);
            console.log('📤 [SUBSCRIPTION] Backend response ok:', backendResponse.ok);
            
            if (backendResponse.ok) {
              const responseData = await backendResponse.text();
              console.log('✅ [SUBSCRIPTION] Backend revocation successful');
              console.log('📋 [SUBSCRIPTION] Backend response:', responseData);
            } else {
              const errorData = await backendResponse.text();
              console.error('❌ [SUBSCRIPTION] Backend revocation failed');
              console.error('📋 [SUBSCRIPTION] Backend error:', errorData);
            }
          } catch (err: any) {
            console.error('❌ [SUBSCRIPTION] Error calling backend:', err.message);
            console.error('🔍 [SUBSCRIPTION] Fetch error details:', {
              name: err.name,
              message: err.message,
              stack: err.stack?.split('\n').slice(0, 3)
            });
          }
        } catch (subscriptionError: any) {
          console.error('❌ [SUBSCRIPTION] Error processing subscription deletion:', subscriptionError.message);
          console.error('🔍 [SUBSCRIPTION] Subscription error details:', {
            name: subscriptionError.name,
            message: subscriptionError.message
          });
        }
        break;
      }

      default:
        console.log(`❓ [WEBHOOK] Unhandled event type: ${type}`);
        console.log('📋 [WEBHOOK] Event data keys:', Object.keys(data.object));
    }

    console.log('✅ [WEBHOOK] Event processing completed successfully');
    return NextResponse.json(
      { received: true, event_type: type, event_id: event.id },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error: any) {
    console.error('💥 [WEBHOOK] Critical error in webhook processing:', error.message);
    console.error('🔍 [WEBHOOK] Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack?.split('\n').slice(0, 5)
    });
    console.error('🕐 [WEBHOOK] Error timestamp:', new Date().toISOString());
    
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        timestamp: new Date().toISOString(),
        error_type: error.name 
      },
      { status: 500 }
    );
  }
}

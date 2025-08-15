import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { plans } from '@/constants/suscriptionPlans';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
	console.log('--- Stripe Webhook recibido ---');
	console.log('Headers:', headers());
	const rawBody = await req.text();

	const body = rawBody

	const signature = headers().get('stripe-signature');

	let data;
	let eventType;
	let event;

	try {
	event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
	console.log('Evento Stripe:', event.type);
	} catch (err) {
		console.error(`Webhook signature verification failed. ${err.message}`);
		return NextResponse.json({ error: err.message }, { status: 400 });
	}

	data = event.data;
	console.log('Data:', data);
	console.log('EventType:', eventType);
	eventType = event.type;

	try {
		switch (eventType) {
			case 'checkout.session.completed': {
				console.log('checkout.session.completed recibido');
				// First payment is successful and a subscription is created (if mode was set to "subscription" in ButtonCheckout)
				// ✅ Grant access to the product
				const session = await stripe.checkout.sessions.retrieve(
					data.object.id,
					{
						expand: ['line_items']
					}
				);
				const customerId = session?.customer;
				console.log('CustomerId:', customerId);
				const customer = await stripe.customers.retrieve(customerId);
				console.log('Customer:', customer);
				const priceId = session?.line_items?.data[0]?.price.id;
				console.log('PriceId:', priceId);
				let planType = null;
				console.log('plans.mensual.priceId:', plans.mensual.priceId);
				console.log('plans.anual.priceId:', plans.anual.priceId);
				if (plans.mensual.priceId === priceId) {
					planType = "monthly";
				} else if (plans.anual.priceId === priceId) {
					planType = "annual";
				}

				if (planType) {
					console.log('PlanType detectado:', planType);
					console.log('Enviando fetch al backend con:', {
						hasAccess: true,
						email: customer.email,
						planType,
					});
					try {
						await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/people/update-access/`, {
							method: 'POST',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify({
								hasAccess: true,
								email: customer.email,
								planType,
							}),
						});
					} catch (err) {
						console.error('Error notificando acceso al backend:', err);
					}
				} else {
					console.error('No se reconoce el tipo de plan para priceId:', priceId);
				}

				// Extra: >>>>> send email to dashboard <<<<

				break;
			}

			case 'customer.subscription.deleted': {
				console.log('customer.subscription.deleted recibido');
				// ❌ Revoke access to the product
				// The customer might have changed the plan (higher or lower plan, cancel soon etc...)
				const subscription = await stripe.subscriptions.retrieve(
					data.object.id
				);
				console.log('Subscription:', subscription);
				console.log('Enviando fetch al backend para revocar acceso:', {
					hasAccess: false,
					email: subscription.customer_email || undefined,
				});
				// const user = await User.findOne({
				//     customerId: subscription.customer
				// });


				// // Revoke access to your product
				// user.hasAccess = false;
				// await user.save();

				// Notificar al backend para revocar acceso en Person
				try {
					await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/people/update-access`, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							hasAccess: false,
							email: subscription.customer_email || undefined,
						}),
					});
				} catch (err) {
					console.error('Error notificando acceso al backend:', err);
				}

				break;
			}

			default:
			// Unhandled event type
		}
	} catch (e) {
		console.error(
			'stripe error: ' + e.message + ' | EVENT TYPE: ' + eventType
		);
	}

	return NextResponse.json({});
}

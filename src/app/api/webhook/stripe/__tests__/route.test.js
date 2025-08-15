
import { POST } from '../route.mjs';

const mockSession = {
  id: 'cs_test',
  customer: 'cus_test',
  line_items: { data: [{ price: { id: 'price_1Rvgga2ZhqvpKINePwWLyFpY' } }] },
};

const mockCustomer = {
  email: 'test@example.com',
};

global.fetch = jest.fn(() => Promise.resolve({ json: () => ({}) }));

jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({
    webhooks: {
      constructEvent: (body, signature, secret) => {
        const event = JSON.parse(body);
        event.type = event.type;
        return event;
      },
    },
    checkout: {
      sessions: {
        retrieve: jest.fn(() => mockSession),
      },
    },
    customers: {
      retrieve: jest.fn(() => mockCustomer),
    },
    subscriptions: {
      retrieve: jest.fn(() => ({ customer_email: 'test@example.com' })),
    },
  }));
});

describe('Stripe Webhook POST', () => {
  it('handles checkout.session.completed', async () => {
    const req = {
      text: () => Promise.resolve(JSON.stringify({
        type: 'checkout.session.completed',
        data: { object: { id: 'cs_test' } },
      })),
      headers: () => new Map([['stripe-signature', 'test']]),
    };
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(global.fetch).toHaveBeenCalled();
  });

  it('handles customer.subscription.deleted', async () => {
    const req = {
      text: () => Promise.resolve(JSON.stringify({
        type: 'customer.subscription.deleted',
        data: { object: { id: 'sub_test', customer_email: 'test@example.com' } },
      })),
      headers: () => new Map([['stripe-signature', 'test']]),
    };
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(global.fetch).toHaveBeenCalled();
  });
});

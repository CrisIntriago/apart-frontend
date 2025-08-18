/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'picsum.photos', 
      'localhost', 
      'lh3.googleusercontent.com', 
      'apartbackend-production.up.railway.app', 
      'apart-backend-django.s3.us-east-1.amazonaws.com',
      'apart-backend-django.s3.amazonaws.com'
    ],
  },
  async headers() {
    return [
      {
        source: '/api/webhook/stripe',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'POST',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, stripe-signature',
          },
        ],
      },
    ];
  },
};
export default nextConfig;

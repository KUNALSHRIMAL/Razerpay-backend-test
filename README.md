# Razerpay Backend

A serverless backend for Razorpay subscription payment integration, deployed on Netlify Functions.

## Tech Stack

- **Runtime:** Node.js (CommonJS)
- **Deployment:** Netlify Functions (serverless)
- **Payment SDK:** [razorpay](https://www.npmjs.com/package/razorpay) v2.9.6

## Project Structure

```
Razerpay-backend-test/
├── netlify/
│   └── functions/
│       ├── create-subscription.js   # Creates a Razorpay subscription
│       └── verify-subscription.js  # Verifies payment signature
├── netlify.toml                     # Netlify config + CORS headers
└── package.json
```

## API Endpoints

Both endpoints are exposed as Netlify Functions under `/.netlify/functions/`.

### POST `/.netlify/functions/create-subscription`

Creates a new Razorpay subscription using the configured plan.

**Response**
```json
{ "subscription_id": "<razorpay_subscription_id>" }
```

---

### POST `/.netlify/functions/verify-subscription`

Verifies the HMAC-SHA256 signature returned by Razorpay after a payment.

**Request body**
```json
{
  "razorpay_payment_id": "pay_xxx",
  "razorpay_subscription_id": "sub_xxx",
  "razorpay_signature": "abc123..."
}
```

**Response**
```json
{ "success": true }
```

Both endpoints support `OPTIONS` preflight requests for CORS.

## Environment Variables

Create a `.env` file or set these in your Netlify dashboard:

| Variable | Description |
|---|---|
| `RAZORPAY_KEY_ID` | Razorpay public API key |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key (used for signature verification) |

## Setup & Local Development

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Install Netlify CLI**

   ```bash
   npm install -g netlify-cli
   ```

3. **Set environment variables**

   ```bash
   cp .env.example .env
   # fill in RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET
   ```

4. **Run locally**

   ```bash
   netlify dev
   ```

   Functions will be available at `http://localhost:8888/.netlify/functions/`.

## Deployment

Push to your connected Netlify repo or run:

```bash
netlify deploy --prod
```

Set `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` as environment variables in the Netlify dashboard under **Site settings > Environment variables**.

## Notes

- The subscription plan ID (`plan_SuMUHArIrMkWzW`) is hardcoded in `create-subscription.js`. Update it to match your Razorpay plan.
- There is no database — the backend is stateless. All state lives in Razorpay.
- CORS is open (`*`) by default via `netlify.toml`. Restrict `Access-Control-Allow-Origin` to your frontend domain in production.

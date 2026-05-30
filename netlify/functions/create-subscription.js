const Razorpay = require('razorpay');

exports.handler = async (event, context) => {

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'OK' })
    };
  }

  try {
    const razorpay = new Razorpay({
      key_id:     process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    const subscription = await razorpay.subscriptions.create({
      plan_id:         'plan_SuMUHArIrMkWzW',
      customer_notify: 1,
      total_count:     12,
      quantity:        1
    });

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ subscription_id: subscription.id })
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: err.message })
    };
  }
};
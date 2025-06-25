export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { amount, currency = 'SAR', customerEmail } = req.body;

  try {
    const response = await fetch(`${process.env.HYPERPAY_BASE_URL}/v1/checkouts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HYPERPAY_ACCESS_TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'entityId': process.env.HYPERPAY_ENTITY_ID,
        'amount': amount,
        'currency': currency,
        'paymentType': 'DB',
        'customer.email': customerEmail
      })
    });

    const data = await response.json();
    
    if (data.result.code.match(/^(000\.200)/)) {
      res.json({
        success: true,
        checkoutId: data.id,
        widgetUrl: `${process.env.HYPERPAY_BASE_URL}/v1/paymentWidgets.js?checkoutId=${data.id}`
      });
    } else {
      res.status(400).json({ success: false, error: data.result.description });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
// pages/api/hyperpay/payment-status.js
export default async function handler(req, res) {
  const { resourcePath } = req.query;

  if (!resourcePath) {
    return res.status(400).json({ success: false, error: 'Missing resourcePath' });
  }

  try {
    const response = await fetch(
      `${process.env.HYPERPAY_BASE_URL}${resourcePath}?entityId=${process.env.HYPERPAY_ENTITY_ID}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.HYPERPAY_ACCESS_TOKEN}`,
        },
      }
    );

    const data = await response.json();

    const resultCode = data.result?.code || '';
    const isSuccess = /^000\.000\.|000\.100\.1|000\.[36]/.test(resultCode);

    if (isSuccess) {
      res.json({ success: true, data });
    } else {
      res.json({ success: false, error: data.result?.description || 'Payment failed' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

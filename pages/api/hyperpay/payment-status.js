export default async function handler(req, res) {
  const { resourcePath } = req.query;

  try {
    const response = await fetch(`${process.env.HYPERPAY_BASE_URL}${resourcePath}?entityId=${process.env.HYPERPAY_ENTITY_ID}`, {
      headers: {
        'Authorization': `Bearer ${process.env.HYPERPAY_ACCESS_TOKEN}`
      }
    });

    const data = await response.json();
    const isSuccess = data.result.code.match(/^(000\.000\.|000\.100\.1|000\.[36])/);
    
    res.json({
      success: !!isSuccess,
      transactionId: data.id,
      amount: data.amount,
      currency: data.currency,
      resultCode: data.result.code,
      resultDescription: data.result.description
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
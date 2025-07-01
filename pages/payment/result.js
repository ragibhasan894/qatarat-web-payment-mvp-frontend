import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function PaymentResult() {
  const router = useRouter();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const resourcePath = router.query.resourcePath;
    if (!resourcePath) return;

    fetch(`http://localhost:8089/api/v2/hyperpay/payment-status?resourcePath=${resourcePath}`)
      .then((res) => res.json())
      .then(setResult)
      .catch((err) => setResult({ success: false, error: err.message }));
  }, [router.query]);

  if (!result) return <p>Checking payment result...</p>;

  return (
    <div style={{ textAlign: 'center', paddingTop: 50 }}>
      {result.success ? (
        <h1>✅ Payment Successful</h1>
      ) : (
        <h1>❌ Payment Failed: {result.error || 'Unknown error'}</h1>
      )}
    </div>
  );
}

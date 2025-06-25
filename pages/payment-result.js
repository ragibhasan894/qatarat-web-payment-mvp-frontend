// 3. Payment Result Handler: pages/payment-result.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function PaymentResult() {
  const [status, setStatus] = useState('checking');
  const [transactionData, setTransactionData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const { resourcePath } = router.query;
    
    if (resourcePath) {
      checkPaymentStatus(resourcePath);
    }
  }, [router.query]);

  const checkPaymentStatus = async (resourcePath) => {
    try {
      const response = await fetch(`/api/hyperpay/payment-status?resourcePath=${resourcePath}`);
      const data = await response.json();
      
      setTransactionData(data);
      setStatus(data.success ? 'success' : 'failed');
      
      // Redirect after 3 seconds
      setTimeout(() => {
        if (data.success) {
          router.push(`/order-confirmation?transactionId=${data.transactionId}`);
        } else {
          router.push('/checkout');
        }
      }, 3000);
      
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'checking') {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <div style={{ fontSize: '24px', marginBottom: '20px' }}>🔄</div>
        <h2>Checking Payment Status...</h2>
        <p>Please wait while we verify your payment.</p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: 'green' }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>✅</div>
        <h2>Payment Successful!</h2>
        <p>Transaction ID: {transactionData?.transactionId}</p>
        <p>Amount: {transactionData?.amount} {transactionData?.currency}</p>
        <p>Redirecting to confirmation page...</p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
      <div style={{ fontSize: '48px', marginBottom: '20px' }}>❌</div>
      <h2>Payment Failed</h2>
      <p>Your payment could not be processed.</p>
      <p>Redirecting back to checkout...</p>
    </div>
  );
}
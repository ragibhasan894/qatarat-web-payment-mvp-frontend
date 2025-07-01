import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function HyperPayWidget({ amount, currency = 'SAR', customerEmail }) {
  const [checkoutId, setCheckoutId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Handle payment result on page load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const resourcePath = urlParams.get('resourcePath');
    
    if (resourcePath) {
      checkPaymentResult(resourcePath);
    }
  }, []);

  const checkPaymentResult = async (resourcePath) => {
    try {
      const response = await fetch(`/api/hyperpay/payment-status?resourcePath=${resourcePath}`);
      const data = await response.json();
      
      if (data.success) {
        router.push(`/success?transactionId=${data.transactionId}`);
      } else {
        router.push('/failed');
      }
    } catch (error) {
      router.push('/failed');
    }
  };

  const initializePayment = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/hyperpay/prepare-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency, customerEmail })
      });

      const data = await response.json();
      
      if (data.success) {
        setCheckoutId(data.checkoutId);
        
        // Load HyperPay widget script
        const script = document.createElement('script');
        script.src = data.widgetUrl;
        script.async = true;
        document.head.appendChild(script);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Failed to initialize payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2>Payment Details</h2>
      <p>Amount: {amount} {currency}</p>
      
      {error && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          Error: {error}
        </div>
      )}

      {!checkoutId ? (
        <button 
          onClick={initializePayment}
          disabled={loading}
          style={{
            width: '100%',
            padding: '8px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Initializing...' : 'Pay Now'}
        </button>
      ) : (
        <div>
          {/* HyperPay Widget Form */}
          <form 
            action={`${process.env.NEXT_PUBLIC_BASE_URL}/checkout`}
            className="paymentWidgets" 
            data-brands="VISA MASTER MADA"
          >
            {/* Widget will automatically inject payment fields here */}
          </form>
        </div>
      )}
    </div>
  );
}
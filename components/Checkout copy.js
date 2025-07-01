import { useEffect, useState } from 'react';
import { PayTabsService } from '../lib/paytabs';

const PAYMENT_METHODS = {
  HYPERPAY: 'hyperpay',
  PAYTABS: 'paytabs',
  CREDIT_CARD: 'credit_card',
  BANK_TRANSFER: 'bank_transfer',
  WALLET: 'wallet'
};

export default function Checkout() {
  // Payment gateway states
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(PAYMENT_METHODS.HYPERPAY);
  const [checkoutId, setCheckoutId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Order data
  const [orderData] = useState({
    amount: '100.00',
    currency: 'SAR',
    description: 'Product Purchase'
  });

  // Customer data for PayTabs
  const [customerData, setCustomerData] = useState({
    name: '',
    email: 'test@example.com',
    phone: '',
    address: '',
    city: 'Riyadh',
    country: 'SA'
  });

  // Initialize HyperPay when selected
  useEffect(() => {
    if (selectedPaymentMethod === PAYMENT_METHODS.HYPERPAY) {
      initializeHyperPay();
    }
  }, [selectedPaymentMethod]);

  // Load HyperPay script when checkoutId is available
  useEffect(() => {
    if (!checkoutId || selectedPaymentMethod !== PAYMENT_METHODS.HYPERPAY) return;

    const script = document.createElement('script');
    script.src = `https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script
      const existingScript = document.querySelector(`script[src*="paymentWidgets.js"]`);
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, [checkoutId, selectedPaymentMethod]);

  const initializeHyperPay = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8089/api/v2/hyperpay/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: orderData.amount,
          currency: orderData.currency,
          customerEmail: customerData.email,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setCheckoutId(data.checkoutId);
      } else {
        setError('Failed to initialize HyperPay: ' + data.error);
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePayTabsPayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const paymentData = {
        amount: parseFloat(orderData.amount),
        description: orderData.description,
        return_url: `${window.location.origin}/payment/success`,
        customer_name: customerData.name,
        customer_email: customerData.email,
        customer_phone: customerData.phone,
        customer_address: customerData.address,
        customer_city: customerData.city,
        customer_country: customerData.country,
      };

      const result = await PayTabsService.initiatePayment(paymentData);

      if (result.success) {
        // Redirect to PayTabs payment page
        PayTabsService.redirectToPayment(result.payment_url);
      } else {
        setError('PayTabs error: ' + result.message);
      }
    } catch (err) {
      setError('PayTabs error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerDataChange = (field, value) => {
    setCustomerData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
    setCheckoutId(null);
    setError(null);
  };

  const renderPaymentMethodSelector = () => (
    <div className="payment-method-selector" style={{ marginBottom: '30px' }}>
      <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: 'bold' }}>
        Choose Payment Method
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
        {/* HyperPay */}
        <div 
          className={`payment-option ${selectedPaymentMethod === PAYMENT_METHODS.HYPERPAY ? 'selected' : ''}`}
          style={{
            border: selectedPaymentMethod === PAYMENT_METHODS.HYPERPAY ? '2px solid #007bff' : '2px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            cursor: 'pointer',
            textAlign: 'center',
            backgroundColor: selectedPaymentMethod === PAYMENT_METHODS.HYPERPAY ? '#f8f9fa' : '#fff'
          }}
          onClick={() => handlePaymentMethodChange(PAYMENT_METHODS.HYPERPAY)}
        >
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>💳</div>
          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>HyperPay</div>
          <div style={{ fontSize: '12px', color: '#666' }}>VISA, MasterCard, MADA</div>
        </div>

        {/* PayTabs */}
        <div 
          className={`payment-option ${selectedPaymentMethod === PAYMENT_METHODS.PAYTABS ? 'selected' : ''}`}
          style={{
            border: selectedPaymentMethod === PAYMENT_METHODS.PAYTABS ? '2px solid #007bff' : '2px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            cursor: 'pointer',
            textAlign: 'center',
            backgroundColor: selectedPaymentMethod === PAYMENT_METHODS.PAYTABS ? '#f8f9fa' : '#fff'
          }}
          onClick={() => handlePaymentMethodChange(PAYMENT_METHODS.PAYTABS)}
        >
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>🏦</div>
          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>PayTabs</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Multiple Payment Options</div>
        </div>

        {/* Credit Card Direct */}
        <div 
          className={`payment-option ${selectedPaymentMethod === PAYMENT_METHODS.CREDIT_CARD ? 'selected' : ''}`}
          style={{
            border: selectedPaymentMethod === PAYMENT_METHODS.CREDIT_CARD ? '2px solid #007bff' : '2px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            cursor: 'pointer',
            textAlign: 'center',
            backgroundColor: selectedPaymentMethod === PAYMENT_METHODS.CREDIT_CARD ? '#f8f9fa' : '#fff',
            opacity: 0.6
          }}
          onClick={() => handlePaymentMethodChange(PAYMENT_METHODS.CREDIT_CARD)}
        >
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>💰</div>
          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Credit Card</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Coming Soon</div>
        </div>

        {/* Bank Transfer */}
        <div 
          className={`payment-option ${selectedPaymentMethod === PAYMENT_METHODS.BANK_TRANSFER ? 'selected' : ''}`}
          style={{
            border: selectedPaymentMethod === PAYMENT_METHODS.BANK_TRANSFER ? '2px solid #007bff' : '2px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            cursor: 'pointer',
            textAlign: 'center',
            backgroundColor: selectedPaymentMethod === PAYMENT_METHODS.BANK_TRANSFER ? '#f8f9fa' : '#fff',
            opacity: 0.6
          }}
          onClick={() => handlePaymentMethodChange(PAYMENT_METHODS.BANK_TRANSFER)}
        >
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>🏛️</div>
          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Bank Transfer</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Coming Soon</div>
        </div>
      </div>
    </div>
  );

  const renderCustomerForm = () => {
    if (selectedPaymentMethod !== PAYMENT_METHODS.PAYTABS) return null;

    return (
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h4 style={{ marginBottom: '15px', fontSize: '16px', fontWeight: 'bold' }}>
          Customer Information
        </h4>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>
              Full Name *
            </label>
            <input
              type="text"
              value={customerData.name}
              onChange={(e) => handleCustomerDataChange('name', e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>
              Email *
            </label>
            <input
              type="email"
              value={customerData.email}
              onChange={(e) => handleCustomerDataChange('email', e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>
              Phone *
            </label>
            <input
              type="tel"
              value={customerData.phone}
              onChange={(e) => handleCustomerDataChange('phone', e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>
              City
            </label>
            <input
              type="text"
              value={customerData.city}
              onChange={(e) => handleCustomerDataChange('city', e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderPaymentInterface = () => {
    switch (selectedPaymentMethod) {
      case PAYMENT_METHODS.HYPERPAY:
        if (loading) {
          return <div style={{ textAlign: 'center', padding: '20px' }}>Loading HyperPay...</div>;
        }
        
        if (checkoutId) {
          return (
            <div style={{ marginTop: '20px' }}>
              <h4 style={{ marginBottom: '15px', fontSize: '16px', fontWeight: 'bold' }}>
                HyperPay Secure Payment
              </h4>
              <form
                action="/payment/result"
                className="paymentWidgets"
                data-brands="VISA MASTER MADA"
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '20px',
                  backgroundColor: '#f8f9fa'
                }}
              ></form>
            </div>
          );
        }
        break;

      case PAYMENT_METHODS.PAYTABS:
        return (
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={handlePayTabsPayment}
              disabled={loading || !customerData.name || !customerData.email || !customerData.phone}
              style={{
                width: '100%',
                padding: '15px',
                backgroundColor: loading ? '#ccc' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Processing...' : `Pay ${orderData.currency} ${orderData.amount} with PayTabs`}
            </button>
          </div>
        );

      case PAYMENT_METHODS.CREDIT_CARD:
      case PAYMENT_METHODS.BANK_TRANSFER:
      case PAYMENT_METHODS.WALLET:
        return (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '8px',
            border: '1px solid #ddd'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>🚧</div>
            <h4 style={{ marginBottom: '10px' }}>Coming Soon</h4>
            <p style={{ color: '#666', fontSize: '14px' }}>
              This payment method will be available soon.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '40px 20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px' }}>
          Secure Checkout
        </h1>
        <p style={{ color: '#666', fontSize: '16px' }}>
          Complete your purchase securely with your preferred payment method
        </p>
      </div>

      {/* Order Summary */}
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '8px', 
        marginBottom: '30px',
        border: '1px solid #ddd'
      }}>
        <h3 style={{ marginBottom: '15px', fontSize: '18px', fontWeight: 'bold' }}>
          Order Summary
        </h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span>Amount:</span>
          <span style={{ fontWeight: 'bold' }}>{orderData.currency} {orderData.amount}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span>Description:</span>
          <span>{orderData.description}</span>
        </div>
        <hr style={{ margin: '15px 0', border: 'none', borderTop: '1px solid #ddd' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold' }}>
          <span>Total:</span>
          <span>{orderData.currency} {orderData.amount}</span>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #f5c6cb'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Payment Method Selector */}
      {renderPaymentMethodSelector()}

      {/* Customer Form (for PayTabs) */}
      {renderCustomerForm()}

      {/* Payment Interface */}
      {renderPaymentInterface()}

      {/* Security Notice */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '30px', 
        padding: '15px',
        backgroundColor: '#e7f3ff',
        borderRadius: '8px',
        border: '1px solid #b3d9ff'
      }}>
        <div style={{ fontSize: '20px', marginBottom: '8px' }}>🔒</div>
        <p style={{ fontSize: '14px', color: '#0056b3', margin: 0 }}>
          Your payment information is encrypted and secure. We never store your card details.
        </p>
      </div>
    </div>
  );
}
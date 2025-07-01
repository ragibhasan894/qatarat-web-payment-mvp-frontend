export const OrderSummary = ({ orderData, style = {} }) => {
  const defaultStyle = {
    backgroundColor: '#f8f9fa',
    padding: '25px',
    borderRadius: '12px',
    marginBottom: '30px',
    border: '1px solid #e0e0e0'
  };

  return (
    <div style={{ ...defaultStyle, ...style }}>
      <h3 style={{ 
        marginBottom: '20px', 
        fontSize: '20px', 
        fontWeight: 'bold',
        color: '#333',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        📋 Order Summary
      </h3>
      
      <div style={{ space: '15px 0' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '12px',
          paddingBottom: '8px'
        }}>
          <span style={{ color: '#666' }}>Description:</span>
          <span style={{ fontWeight: '500' }}>{orderData.description}</span>
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          fontSize: '18px', 
          fontWeight: 'bold',
          color: '#333'
        }}>
          <span>Total Amount:</span>
          <span style={{ color: '#007bff' }}>
            {orderData.currency} {orderData.totalAmount || orderData.amount}
          </span>
        </div>
      </div>
    </div>
  );
};
export const PaymentMethodCard = ({ 
  method, 
  isSelected, 
  onClick, 
  icon, 
  title, 
  description, 
  isComingSoon = false 
}) => {
  return (
    <div 
      className={`payment-method-card ${isSelected ? 'selected' : ''} ${isComingSoon ? 'coming-soon' : ''}`}
      style={{
        border: isSelected ? '2px solid #007bff' : '2px solid #ddd',
        borderRadius: '12px',
        padding: '20px',
        cursor: isComingSoon ? 'not-allowed' : 'pointer',
        textAlign: 'center',
        backgroundColor: isSelected ? '#f8f9fa' : '#fff',
        opacity: isComingSoon ? 0.6 : 1,
        transition: 'all 0.3s ease',
        position: 'relative',
        minHeight: '120px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
      onClick={() => !isComingSoon && onClick(method)}
      onMouseEnter={(e) => {
        if (!isComingSoon && !isSelected) {
          e.target.style.borderColor = '#007bff';
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 4px 12px rgba(0,123,255,0.15)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isComingSoon && !isSelected) {
          e.target.style.borderColor = '#ddd';
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'none';
        }
      }}
    >
      {isComingSoon && (
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          backgroundColor: '#ffc107',
          color: '#000',
          fontSize: '10px',
          padding: '2px 6px',
          borderRadius: '12px',
          fontWeight: 'bold'
        }}>
          SOON
        </div>
      )}
      
      <div style={{ fontSize: '32px', marginBottom: '12px' }}>{icon}</div>
      <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '16px' }}>{title}</div>
      <div style={{ fontSize: '12px', color: '#666', lineHeight: '1.4' }}>{description}</div>
      
      {isSelected && (
        <div style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          backgroundColor: '#007bff',
          color: 'white',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px'
        }}>
          ✓
        </div>
      )}
    </div>
  );
};
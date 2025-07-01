export const CustomerInfoForm = ({ customerData, onChange, required = [] }) => {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const isFieldRequired = (field) => required.includes(field);

  return (
    <div style={{ 
      marginBottom: '30px', 
      padding: '25px', 
      border: '1px solid #e0e0e0', 
      borderRadius: '12px',
      backgroundColor: '#fafafa'
    }}>
      <h4 style={{ 
        marginBottom: '20px', 
        fontSize: '18px', 
        fontWeight: 'bold',
        color: '#333'
      }}>
        Customer Information
      </h4>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '20px' 
      }}>
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontSize: '14px', 
            fontWeight: '600',
            color: '#555'
          }}>
            Full Name {isFieldRequired('name') && <span style={{ color: '#dc3545' }}>*</span>}
          </label>
          <input
            type="text"
            value={customerData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Enter your full name"
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '14px',
              transition: 'border-color 0.3s ease',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => e.target.style.borderColor = '#007bff'}
            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            required={isFieldRequired('name')}
          />
        </div>

        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontSize: '14px', 
            fontWeight: '600',
            color: '#555'
          }}>
            Email Address {isFieldRequired('email') && <span style={{ color: '#dc3545' }}>*</span>}
          </label>
          <input
            type="email"
            value={customerData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="Enter your email address"
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '14px',
              transition: 'border-color 0.3s ease',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => e.target.style.borderColor = '#007bff'}
            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            required={isFieldRequired('email')}
          />
        </div>

        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontSize: '14px', 
            fontWeight: '600',
            color: '#555'
          }}>
            Phone Number {isFieldRequired('phone') && <span style={{ color: '#dc3545' }}>*</span>}
          </label>
          <input
            type="tel"
            value={customerData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="Enter your phone number"
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '14px',
              transition: 'border-color 0.3s ease',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => e.target.style.borderColor = '#007bff'}
            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            required={isFieldRequired('phone')}
          />
        </div>

        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontSize: '14px', 
            fontWeight: '600',
            color: '#555'
          }}>
            City
          </label>
          <input
            type="text"
            value={customerData.city}
            onChange={(e) => handleChange('city', e.target.value)}
            placeholder="Enter your city"
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '14px',
              transition: 'border-color 0.3s ease',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => e.target.style.borderColor = '#007bff'}
            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
          />
        </div>

        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontSize: '14px', 
            fontWeight: '600',
            color: '#555'
          }}>
            Address
          </label>
          <input
            type="text"
            value={customerData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="Enter your address"
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '14px',
              transition: 'border-color 0.3s ease',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => e.target.style.borderColor = '#007bff'}
            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
          />
        </div>

        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontSize: '14px', 
            fontWeight: '600',
            color: '#555'
          }}>
            Country
          </label>
          <select
            value={customerData.country}
            onChange={(e) => handleChange('country', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '14px',
              transition: 'border-color 0.3s ease',
              boxSizing: 'border-box',
              backgroundColor: 'white'
            }}
            onFocus={(e) => e.target.style.borderColor = '#007bff'}
            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
          >
            <option value="SA">Saudi Arabia</option>
            <option value="AE">United Arab Emirates</option>
            <option value="EG">Egypt</option>
            <option value="JO">Jordan</option>
            <option value="KW">Kuwait</option>
            <option value="QA">Qatar</option>
            <option value="BH">Bahrain</option>
            <option value="OM">Oman</option>
          </select>
        </div>
      </div>
    </div>
  );
};
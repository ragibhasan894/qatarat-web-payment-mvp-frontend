const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8089/api/v2';

export class PayTabsService {
  static async initiatePayment(paymentData) {
    try {
      const response = await fetch(`${API_BASE_URL}/web-payments/initiate/paytabs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Payment initiation failed');
      }

      return result;
    } catch (error) {
      console.error('PayTabs initiation error:', error);
      throw error;
    }
  }

  static async verifyPayment(tranRef) {
    try {
      const response = await fetch(`${API_BASE_URL}/paytabs/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ tran_ref: tranRef }),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('PayTabs verification error:', error);
      throw error;
    }
  }

  static redirectToPayment(paymentUrl) {
    window.location.href = paymentUrl;
  }
}
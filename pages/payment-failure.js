export default function PaymentFailure() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1 style={{ color: 'red' }}>❌ Payment Failed</h1>
      <p>Unfortunately, your payment could not be completed.</p>
      <a href="/checkout" style={{ color: 'blue' }}>Try Again</a>
    </div>
  );
}

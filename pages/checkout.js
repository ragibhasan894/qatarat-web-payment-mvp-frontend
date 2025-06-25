import HyperPayWidget from '../components/HyperPayWidget';

export default function CheckoutPage() {
  return (
    <div>
      <h1>Checkout</h1>
      <HyperPayWidget 
        amount="1.00"
        currency="SAR"
        customerEmail="customer@example.com"
      />
    </div>
  );
}
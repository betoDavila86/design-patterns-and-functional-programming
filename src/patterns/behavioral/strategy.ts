/**
 * ============================================================================
 * STRATEGY PATTERN
 * ============================================================================
 *
 * PROBLEM: Need to use different algorithms interchangeably at runtime.
 * SOLUTION: Define a family of algorithms as separate strategy classes.
 *
 * USE CASES: Payment processing, sorting, pricing calculations.
 * ============================================================================
 */

// Strategy interface
export interface PaymentStrategy {
    pay(amount: number): void;
}

// Concrete Strategy A
export class CreditCardPayment implements PaymentStrategy {
    constructor(private cardNumber: string) { }

    pay(amount: number): void {
        console.log(`  💳 Paid $${amount.toFixed(2)} with card ending ${this.cardNumber.slice(-4)}`);
    }
}

// Concrete Strategy B
export class PayPalPayment implements PaymentStrategy {
    constructor(private email: string) { }

    pay(amount: number): void {
        console.log(`  🅿️  Paid $${amount.toFixed(2)} via PayPal (${this.email})`);
    }
}

// Concrete Strategy C
export class CryptoPayment implements PaymentStrategy {
    constructor(private walletAddress: string) { }

    pay(amount: number): void {
        console.log(`  ₿  Paid $${amount.toFixed(2)} via crypto wallet ${this.walletAddress}`);
    }
}

// Context
export class ShoppingCart {
    private items: Array<{ name: string; price: number }> = [];
    private paymentStrategy: PaymentStrategy | null = null;

    addItem(name: string, price: number): void {
        this.items.push({ name, price });
    }

    setPaymentStrategy(strategy: PaymentStrategy): void {
        this.paymentStrategy = strategy;
    }

    checkout(): void {
        const total = this.items.reduce((sum, item) => sum + item.price, 0);
        console.log(`  🛒 Cart total: $${total.toFixed(2)}`);

        if (!this.paymentStrategy) {
            console.log('  ⚠️  No payment method selected!');
            return;
        }
        this.paymentStrategy.pay(total);
    }
}

// ============================================================================
// USAGE EXAMPLE
// ============================================================================

export function demonstrateStrategy(): void {
    const cart = new ShoppingCart();
    cart.addItem('Laptop', 999.99);
    cart.addItem('Mouse', 49.99);

    console.log('Checkout with Credit Card:');
    cart.setPaymentStrategy(new CreditCardPayment('4111111111111111'));
    cart.checkout();

    console.log('\nCheckout with PayPal:');
    cart.setPaymentStrategy(new PayPalPayment('user@example.com'));
    cart.checkout();

    console.log('\nCheckout with Crypto:');
    cart.setPaymentStrategy(new CryptoPayment('0x1234567890abcdef'));
    cart.checkout();
}

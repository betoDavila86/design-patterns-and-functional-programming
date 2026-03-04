/**
 * ============================================================================
 * STRATEGY PATTERN — Functional Approach
 * ============================================================================
 *
 * FUNCTIONAL INSIGHT: In FP, a "strategy" is a function (first-class citizens)
 *
 * KEY SIMPLIFICATION: Type alias → 3 functions → pass as argument
 * ============================================================================
 */

type Item = { name: string; price: number };

// "Strategy interface"
type PaymentStrategy = (amount: number) => void;

// ─── Strategies ──────────────────────────────────
const payWithCreditCard = (cardNumber: string): PaymentStrategy =>
    (amount) => console.log(`  💳 Paid $${amount.toFixed(2)} with card ending ${cardNumber.slice(-4)}`);

const payWithPayPal = (email: string): PaymentStrategy =>
    (amount) => console.log(`  🅿️  Paid $${amount.toFixed(2)} via PayPal (${email})`);

const payWithCrypto = (walletAddress: string): PaymentStrategy =>
    (amount) => console.log(`  ₿  Paid $${amount.toFixed(2)} via crypto wallet ${walletAddress}`);

// ─── Context (pure function) ────────────────────────────────
const checkout = (items: Item[], paymentStrategy: PaymentStrategy): void => {
    const total = items.reduce((sum, item) => sum + item.price, 0);
    console.log(`  🛒 Cart total: $${total.toFixed(2)}`);
    paymentStrategy(total);
};

// ─── Demo ─────────────────────────────────────────────────────────────────────
export function demonstrateStrategyFP(): void {
    const items: Item[] = [
        { name: 'Laptop', price: 999.99 },
        { name: 'Mouse', price: 49.99 },
    ];

    console.log('Checkout with Credit Card:');
    checkout(items, payWithCreditCard('4111111111111111'));

    console.log('\nCheckout with PayPal:');
    checkout(items, payWithPayPal('user@example.com'));

    console.log('\nCheckout with Crypto:');
    checkout(items, payWithCrypto('0x1234567890abcdef'));

    // ── BONUS: An inline strategy ────────────────
    console.log('\nCheckout with Apple Pay');
    checkout(items, (amount) => console.log(`  🍎 Paid $${amount.toFixed(2)} via Apple Pay`));
}

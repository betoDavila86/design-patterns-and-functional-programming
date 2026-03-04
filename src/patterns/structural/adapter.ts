/**
 * ============================================================================
 * ADAPTER PATTERN
 * ============================================================================
 *
 * CATEGORY: Structural Pattern
 *
 * PROBLEM:
 * - Need to use an existing class, but its interface is incompatible
 * - Can't modify the source code of the existing class (third-party library)
 * - Need to create a reusable class that cooperates with unrelated classes
 *
 * SOLUTION:
 * - Create an adapter class that implements the expected interface
 * - Adapter wraps the incompatible object and translates calls
 * - Client works with adapter through the expected interface
 *
 * USE CASES:
 * - Integrating third-party libraries
 * - Working with legacy code
 * - Unifying different API interfaces
 * ============================================================================
 */

export interface PaymentResult {
    success: boolean;
    transactionId: string;
    message: string;
}

// Target interface - what the client expects
export interface PaymentProcessor {
    processPayment(amount: number, currency: string): PaymentResult;
    refund(transactionId: string, amount: number): PaymentResult;
}

// Adaptee - existing class with incompatible interface (third-party library)
export class LegacyPaymentGateway {
    makePayment(cents: number, currencyCode: number): { code: number; ref: string } {
        console.log(`  Legacy: Processing ${cents} cents with currency code ${currencyCode}`);
        return {
            code: 0, // success
            ref: `LEG-${Date.now()}`,
        };
    }

    reversePayment(reference: string, cents: number): { code: number; message: string } {
        console.log(`  Legacy: Reversing ${cents} cents for ref ${reference}`);
        return {
            code: 0,
            message: 'Reversal complete',
        };
    }
}

// Another Adaptee - different third-party payment service
export class ModernPaymentAPI {
    async charge(request: {
        value: number;
        curr: string;
        idempotencyKey: string;
    }): Promise<{ status: 'approved' | 'declined'; id: string }> {
        console.log(`  Modern API: Charging ${request.value} ${request.curr}`);
        return {
            status: 'approved',
            id: `MOD-${request.idempotencyKey}`,
        };
    }

    async void(paymentId: string): Promise<{ status: 'voided' | 'error' }> {
        console.log(`  Modern API: Voiding payment ${paymentId}`);
        return { status: 'voided' };
    }
}

// Adapter for legacy system
export class LegacyPaymentAdapter implements PaymentProcessor {
    private currencyMap: Map<string, number> = new Map([
        ['USD', 840],
        ['EUR', 978],
        ['GBP', 826],
    ]);

    constructor(private legacyGateway: LegacyPaymentGateway) { }

    processPayment(amount: number, currency: string): PaymentResult {
        // Convert dollars to cents
        const cents = Math.round(amount * 100);
        const currencyCode = this.currencyMap.get(currency) ?? 840;

        const result = this.legacyGateway.makePayment(cents, currencyCode);

        return {
            success: result.code === 0,
            transactionId: result.ref,
            message: result.code === 0 ? 'Payment successful' : 'Payment failed',
        };
    }

    refund(transactionId: string, amount: number): PaymentResult {
        const cents = Math.round(amount * 100);
        const result = this.legacyGateway.reversePayment(transactionId, cents);

        return {
            success: result.code === 0,
            transactionId: transactionId,
            message: result.message,
        };
    }
}

// Adapter for modern API (using async transactions)
export class ModernPaymentAdapter implements PaymentProcessor {
    constructor(private modernAPI: ModernPaymentAPI) { }

    processPayment(amount: number, currency: string): PaymentResult {
        // Note: In real code, you'd handle async properly. This is simplified for demo
        const idempotencyKey = `${Date.now()}-${Math.random().toString(36).substring(2)}`;

        console.log(`  Adapter: Converting to Modern API format`);

        // Simulating sync response
        const transactionId = `MOD-${idempotencyKey}`;
        return {
            success: false,
            transactionId,
            message: 'Payment not approved',
        };
    }

    refund(transactionId: string, _amount: number): PaymentResult {
        console.log(`  Adapter: Converting refund to void operation`);
        return {
            success: true,
            transactionId,
            message: 'Payment voided',
        };
    }
}

// ============================================================================
// USAGE EXAMPLE
// ============================================================================

// Client
function checkout(processor: PaymentProcessor, amount: number): void {
    console.log(`\nProcessing $${amount} payment...`);
    const result = processor.processPayment(amount, 'USD');
    console.log(`Result: ${result.success ? '✓' : '✗'} ${result.message}`);
    console.log(`Transaction ID: ${result.transactionId}`);
}

export function demonstrateAdapter(): void {
    // Using legacy gateway through adapter
    console.log('1. Using Legacy Payment Gateway (via Adapter):');
    const legacyAdapter = new LegacyPaymentAdapter(new LegacyPaymentGateway());
    checkout(legacyAdapter, 99.99);

    // Using modern API through adapter
    console.log('\n2. Using Modern Payment API (via Adapter):');
    const modernAdapter = new ModernPaymentAdapter(new ModernPaymentAPI());
    checkout(modernAdapter, 149.99);
}

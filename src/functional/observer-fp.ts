/**
 * ============================================================================
 * OBSERVER PATTERN — Functional Approach
 * ============================================================================
 *
 * FUNCTIONAL INSIGHT:
 *   An "observer" is a callback function.
 *   A "subject" is a list of callbacks.
 *
 * KEY SIMPLIFICATION: type EventHandler<T>  →  subscribe/notify functions
 *
 * FP EQUIVALENT: addEventListener, EventEmitter, React context, RxJS Observable
 * ============================================================================
 *
 * The FP version also gives you:
 *    • Unsubscribe via returned function (self-contained, no reference needed)
 *    • Composable multi-event bus with zero extra classes
 */

// "Observer"
type EventHandler<T> = (data: T) => void;

// ─── createEventBus: replaces the Subject ───────────────────────────────
// This is a generic system using closures for encapsulation.
const createEventBus = <T>() => {
    const handlers = new Set<EventHandler<T>>();

    return {
        subscribe: (handler: EventHandler<T>): (() => void) => {
            handlers.add(handler);
            console.log(`  📌 Subscribed. Total listeners: ${handlers.size}`);
            return () => {
                handlers.delete(handler);
                console.log(`  📌 Unsubscribed. Total listeners: ${handlers.size}`);
            };
        },
        publish: (data: T): void => {
            handlers.forEach((handler) => handler(data));
        },
    };
};

// ─── Demo ─────────────────────────────────────────────────────────────────────
export function demonstrateObserverFP(): void {
    const newsChannel = createEventBus<string>();

    const emailHandler = (news: string) =>
        console.log(`  📧 Email to reader@example.com: ${news}`);

    const phoneHandler = (news: string) =>
        console.log(`  📱 SMS to 555-1234: ${news}`);

    console.log('Subscribing:');
    const unsubscribeEmail = newsChannel.subscribe(emailHandler);
    newsChannel.subscribe(phoneHandler);

    // Publish an event
    console.log('\n  📰 Breaking: "TypeScript 5.0 Released!"');
    newsChannel.publish('TypeScript 5.0 Released!');

    // Unsubscribe email — no reference to the object needed, just call the returned fn
    console.log('\nUnsubscribing email:');
    unsubscribeEmail();

    console.log('\n  📰 Breaking: "New JavaScript Runtime Announced"');
    newsChannel.publish('New JavaScript Runtime Announced');

    /*
    console.log('\n── Bonus: Typed multi-event bus ──');
    type AppEvents = {
        'user:login': { userId: string };
        'user:logout': { userId: string };
        'order:placed': { orderId: string; total: number };
    };

    // A simple typed multi-event bus
     const createTypedBus = <E extends Record<string, unknown>>() => {
        const buses = {} as { [K in keyof E]: ReturnType<typeof createEventBus<E[K]>> };

        return {
            on: <K extends keyof E>(event: K, handler: EventHandler<E[K]>) => {
                if (!buses[event]) buses[event] = createEventBus<E[K]>();
                return buses[event].subscribe(handler);
            },
            emit: <K extends keyof E>(event: K, data: E[K]) => {
                buses[event]?.publish(data);
            },
        };
    };

    const bus = createTypedBus<AppEvents>();

    bus.on('user:login', ({ userId }) =>
        console.log(`  👤 User ${userId} logged in → send welcome email`));
    bus.on('order:placed', ({ orderId, total }) =>
        console.log(`  📦 Order ${orderId} ($${total}) placed → notify warehouse`));

    bus.emit('user:login', { userId: 'u-42' });
    bus.emit('order:placed', { orderId: 'ord-7', total: 149.99 });*/
}

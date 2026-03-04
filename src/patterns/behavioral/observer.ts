/**
 * ============================================================================
 * OBSERVER PATTERN
 * ============================================================================
 *
 * PROBLEM: Need to notify multiple objects when one object changes state.
 * SOLUTION: Define a subscription mechanism where observers register for updates.
 *
 * USE CASES: Event systems (YT channel), real-time data feeds, etc
 * ============================================================================
 */


export interface Observer<T> {
    update(data: T): void;
}

export interface Subject<T> {
    subscribe(observer: Observer<T>): void;
    unsubscribe(observer: Observer<T>): void;
    notify(data: T): void;
}

// Publisher
export class NewsAgency implements Subject<string> {
    private observers: Set<Observer<string>> = new Set();

    subscribe(observer: Observer<string>): void {
        this.observers.add(observer);
        console.log(`  📌 Subscriber added. Total: ${this.observers.size}`);
    }

    unsubscribe(observer: Observer<string>): void {
        this.observers.delete(observer);
        console.log(`  📌 Subscriber removed. Total: ${this.observers.size}`);
    }

    notify(news: string): void {
        this.observers.forEach((observer) => observer.update(news));
    }

    publishNews(headline: string): void {
        console.log(`\n  📰 Breaking: "${headline}"`);
        this.notify(headline);
    }
}

// Concrete subscriber A
export class EmailSubscriber implements Observer<string> {
    constructor(private email: string) { }

    update(news: string): void {
        console.log(`  📧 Email to ${this.email}: ${news}`);
    }
}

// Concrete subscriber B
export class PhoneSubscriber implements Observer<string> {
    constructor(private phone: string) { }

    update(news: string): void {
        console.log(`  📱 SMS to ${this.phone}: ${news}`);
    }
}

// ============================================================================
// USAGE EXAMPLE
// ============================================================================
export function demonstrateObserver(): void {
    const agency = new NewsAgency();
    const emailSub = new EmailSubscriber('reader@example.com');
    const phoneSub = new PhoneSubscriber('555-1234');

    console.log('Subscribing:');
    agency.subscribe(emailSub);
    agency.subscribe(phoneSub);

    agency.publishNews('Quieres saber lo último de los patrones de diseño?');

    console.log('\nUnsubscribing email:');
    agency.unsubscribe(emailSub);

    agency.publishNews('Una noticia muy molona acaba de salir!');
}

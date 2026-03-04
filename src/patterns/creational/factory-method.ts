/**
 * ============================================================================
 * FACTORY METHOD PATTERN
 * ============================================================================
 *
 * CATEGORY: Creational Pattern
 *
 * PROBLEM: Need to create objects without specifying the exact class to instantiate
 *
 * SOLUTION:
 * - Define an interface for creating objects
 * - Let subclasses decide which class to instantiate
 * - Client works with products through a common interface
 *
 * USE CASES:
 * - UI component libraries (different buttons for different OS)
 * - Document generators (PDF, Word, HTML)
 * - Notification systems (email, SMS, push)
 * ============================================================================
 */

// Product interface
export interface Notification {
    send(message: string): void;
    getType(): string;
}

// Creator abstract class
export abstract class NotificationFactory {
    abstract createNotification(recipient: string): Notification;

    sendNotification(recipient: string, message: string): void {
        const notification = this.createNotification(recipient);
        console.log(`Sending ${notification.getType()} notification...`);
        notification.send(message);
    }
}

// Concrete Creator A
export class EmailNotificationFactory extends NotificationFactory {
    createNotification(recipient: string): Notification {
        return new EmailNotification(recipient);
    }
}

// Concrete Creator B
export class SMSNotificationFactory extends NotificationFactory {
    createNotification(phoneNumber: string): Notification {
        return new SMSNotification(phoneNumber);
    }
}

// Concrete Creator C
export class PushNotificationFactory extends NotificationFactory {
    createNotification(deviceToken: string): Notification {
        return new PushNotification(deviceToken);
    }
}

// Concrete Product A
export class EmailNotification implements Notification {
    constructor(private recipient: string) { }

    send(message: string): void {
        console.log(`📧 Email sent to ${this.recipient}: ${message}`);
    }

    getType(): string {
        return 'Email';
    }
}

// Concrete Product B
export class SMSNotification implements Notification {
    constructor(private phoneNumber: string) { }

    send(message: string): void {
        console.log(`📱 SMS sent to ${this.phoneNumber}: ${message}`);
    }

    getType(): string {
        return 'SMS';
    }
}

// Concrete Product C
export class PushNotification implements Notification {
    constructor(private deviceToken: string) { }

    send(message: string): void {
        console.log(`🔔 Push notification to ${this.deviceToken}: ${message}`);
    }

    getType(): string {
        return 'Push';
    }
}

// ============================================================================
// USAGE EXAMPLE
// ============================================================================
export function demonstrateFactoryMethod(): void {
    const factories: NotificationFactory[] = [
        new EmailNotificationFactory(),
        new SMSNotificationFactory(),
        new PushNotificationFactory()
    ];

    factories.forEach((factory) => {
        factory.sendNotification('user-123', 'Your order has been shipped!');
    });
}

/**
 * ============================================================================
 * FACTORY METHOD & ABSTRACT FACTORY — Functional Approach
 * ============================================================================
 *
 * FUNCTIONAL INSIGHT:
 *   A factory is just a function that returns a value.
 *   A "product interface" is just a type.
 *   An "abstract factory" is just an object literal grouping factory functions.
 *
 * KEY SIMPLIFICATION: A Record/map of factory functions
 * ============================================================================
 *
 *  OOP Factory Method                     FP Equivalent
 *  ─────────────────────────────────────  ──────────────────────────────────────
 *  abstract class NotificationFactory     type Channel = 'email'|'sms'|'push'
 *  3x concrete factory classes            Record<Channel, Notification>
 *  3x concrete product classes            object literal with typed properties
 *  new EmailNotificationFactory()         createNotification('email', recipient)
 *
 *  OOP Abstract Factory                   FP Equivalent
 *  ─────────────────────────────────────  ──────────────────────────────────────
 *  interface UIFactory                    type UITheme = { renderButton, ... }
 *  class WindowsUIFactory                 const windowsUI: UITheme = { ... }
 *  class MacOSUIFactory                   const macosUI: UITheme = { ... }
 *  getFactory(os): UIFactory              themes[os]   ← just a lookup
 *
 *  In FP, you just call a function or look up a value in a map.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── Types (replaces Product interfaces) ──────────────────────────────────────
type Notification = {
    type: string;
    send: (message: string) => void;
};

// Factory Method as a simple function
type Channel = 'email' | 'sms' | 'push';

const createNotification = (channel: Channel, recipient: string): Notification => {
    const senders: Record<Channel, Notification> = {
        email: {
            type: 'Email',
            send: (msg) => console.log(`  📧 Email to ${recipient}: ${msg}`),
        },
        sms: {
            type: 'SMS',
            send: (msg) => console.log(`  📱 SMS to ${recipient}: ${msg}`),
        },
        push: {
            type: 'Push',
            send: (msg) => console.log(`  🔔 Push to ${recipient}: ${msg}`),
        },
    };
    return senders[channel];
};

// Abstract Factory as an object literal
type UITheme = {
    renderButton: () => void;
    renderCheckbox: (checked: boolean) => void;
};

const windowsUI: UITheme = {
    renderButton: () => console.log('  [═══ Windows Button ═══]'),
    renderCheckbox: (checked) => console.log(`  [${checked ? '✓' : ' '}] Windows Checkbox`),
};

const macosUI: UITheme = {
    renderButton: () => console.log('  (  macOS Button  )'),
    renderCheckbox: (checked) => console.log(`  (${checked ? '●' : '○'}) macOS Checkbox`),
};

type Theme = 'windows' | 'macos';
const themes: Record<Theme, UITheme> = { windows: windowsUI, macos: macosUI };
// A factory of factories
const getTheme = (theme: Theme): UITheme => themes[theme];

// ─── Client code ──────────────────────────────────────────────────────────────
const renderApp = (ui: UITheme): void => {
    ui.renderCheckbox(true);
    ui.renderButton();
};

// ─── Demo ─────────────────────────────────────────────────────────────────────
export function demonstrateFactoryFP(): void {
    console.log('── Factory Method ──');
    const channels: Channel[] = ['email', 'sms', 'push'];
    channels.forEach((channel) => {
        const notification = createNotification(channel, 'user-123');
        console.log(`Sending ${notification.type} notification...`);
        notification.send('Your order has shipped!');
    });

    console.log('\n── Abstract Factory ──');
    console.log('Windows UI:');
    renderApp(getTheme('windows'));

    console.log('\nmacOS UI:');
    renderApp(getTheme('macos'));

    // Ad-hoc "factory"
    console.log('\nLinux UI (ad-hoc):');
    renderApp({
        renderButton: () => console.log('  < Linux GTK Button >'),
        renderCheckbox: (checked) => console.log(`  [${checked ? 'x' : ' '}] Linux Checkbox`),
    });
}

/**
 * ============================================================================
 * ABSTRACT FACTORY PATTERN
 * ============================================================================
 *
 * Problem: Need to create families of related objects that work together.
 * Solution: Define an abstract factory interface that creates related products preserving consistency.
 *
 * USE CASES: Cross-platform UI toolkits, theming systems, db providers.
 * ============================================================================
 */

// Abstract Factory
export interface UIFactory {
    createButton(): Button;
    createCheckbox(): Checkbox;
}

// Abstract Products
export interface Button {
    render(): void;
    onClick(): void;
}

export interface Checkbox {
    render(): void;
    toggle(): void;
}

// Concrete Factories
export class WindowsUIFactory implements UIFactory {
    createButton(): Button {
        return new WindowsButton();
    }
    createCheckbox(): Checkbox {
        return new WindowsCheckbox();
    }
}

export class MacOSUIFactory implements UIFactory {
    createButton(): Button {
        return new MacOSButton();
    }
    createCheckbox(): Checkbox {
        return new MacOSCheckbox();
    }
}

// Windows Products
export class WindowsButton implements Button {
    render(): void {
        console.log('  [═══ Windows Button ═══]');
    }
    onClick(): void {
        console.log('  Windows button clicked!');
    }
}

export class WindowsCheckbox implements Checkbox {
    private checked = false;
    render(): void {
        console.log(`  [${this.checked ? '✓' : ' '}] Windows Checkbox`);
    }
    toggle(): void {
        this.checked = !this.checked;
    }
}

// macOS Products
export class MacOSButton implements Button {
    render(): void {
        console.log('  (  macOS Button  )');
    }
    onClick(): void {
        console.log('  macOS button clicked!');
    }
}

export class MacOSCheckbox implements Checkbox {
    private checked = true;
    render(): void {
        console.log(`  (${this.checked ? '●' : '○'}) macOS Checkbox`);
    }
    toggle(): void {
        this.checked = !this.checked;
    }
}

// Client code
const renderUI = (factory: UIFactory): void => {
    const button = factory.createButton();
    const checkbox = factory.createCheckbox();

    checkbox.toggle();
    checkbox.render();
    button.render();
    button.onClick();
}

// ============================================================================
// USAGE EXAMPLE
// ============================================================================
export function demonstrateAbstractFactory(): void {
    console.log('Windows UI:');
    renderUI(new WindowsUIFactory());

    console.log('\nmacOS UI:');
    renderUI(new MacOSUIFactory());
}

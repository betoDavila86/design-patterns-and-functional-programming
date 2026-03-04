/**
 * ============================================================================
 * DESIGN PATTERNS IN TYPESCRIPT - DEMO RUNNER
 * ============================================================================
 *
 * This project demonstrates 15 key design patterns organized into three categories,
 * PLUS functional programming equivalents that solve the same problems with less code.
 *
 * CREATIONAL PATTERNS (Object creation):
 *   - Singleton: Single instance with global access
 *   - Factory Method: Defer instantiation to subclasses
 *   - Abstract Factory: Create families of related objects
 *   - Builder: Construct complex objects step by step
 *   - Prototype: Clone existing objects
 *
 * STRUCTURAL PATTERNS (Object composition):
 *   - Adapter: Convert interface to another expected interface
 *   - Decorator: Add responsibilities dynamically
 *   - Facade: Simplified interface to complex subsystem
 *   - Proxy: Placeholder controlling access to object
 *   - Composite: Treat individual and composite objects uniformly
 *
 * BEHAVIORAL PATTERNS (Object communication):
 *   - Observer: Notify multiple objects of state changes
 *   - Strategy: Interchangeable algorithms
 *   - Command: Encapsulate requests as objects
 *   - State: Object behavior based on internal state
 *   - Template Method: Algorithm skeleton with customizable steps
 *
 * FUNCTIONAL EQUIVALENTS (src/functional/):
 *   - fp-strategy:   Functions replace the Strategy class hierarchy
 *   - fp-factory:    Object literals + Records replace Factory classes
 *   - fp-observer:   Callbacks + closures replace Observer classes
 *   - fp-command:    Closures replace Command classes and the Invoker
 *   - fp-decorator:  Function composition replaces Decorator hierarchies
 *   - fp-builder:    Partial<T> + object spread replaces the Builder class
 *   - fp-all:        Run all functional demos at once
 *
 * Run with: npm run demo
 *           npm run demo:fp
 *           npm run demo fp-strategy
 * ============================================================================
 */

// Creational Patterns
export * from './patterns/creational/singleton.js';
export * from './patterns/creational/factory-method.js';
export * from './patterns/creational/abstract-factory.js';
export * from './patterns/creational/builder.js';
export * from './patterns/creational/prototype.js';

// Structural Patterns
export * from './patterns/structural/adapter.js';
export * from './patterns/structural/decorator.js';
export * from './patterns/structural/facade.js';
export * from './patterns/structural/proxy.js';
export * from './patterns/structural/composite.js';

// Behavioral Patterns
export * from './patterns/behavioral/observer.js';
export * from './patterns/behavioral/strategy.js';
export * from './patterns/behavioral/command.js';
export * from './patterns/behavioral/state.js';
export * from './patterns/behavioral/template-method.js';

// Functional Pattern Equivalents
export * from './functional/index.js';

import { demonstrateSingleton } from './patterns/creational/singleton.js';
import { demonstrateFactoryMethod } from './patterns/creational/factory-method.js';
import { demonstrateAbstractFactory } from './patterns/creational/abstract-factory.js';
import { demonstrateBuilder } from './patterns/creational/builder.js';
import { demonstratePrototype } from './patterns/creational/prototype.js';
import { demonstrateAdapter } from './patterns/structural/adapter.js';
import { demonstrateDecorator } from './patterns/structural/decorator.js';
import { demonstrateFacade } from './patterns/structural/facade.js';
import { demonstrateProxy } from './patterns/structural/proxy.js';
import { demonstrateComposite } from './patterns/structural/composite.js';
import { demonstrateObserver } from './patterns/behavioral/observer.js';
import { demonstrateStrategy } from './patterns/behavioral/strategy.js';
import { demonstrateCommand } from './patterns/behavioral/command.js';
import { demonstrateState } from './patterns/behavioral/state.js';
import { demonstrateTemplateMethod } from './patterns/behavioral/template-method.js';
import { demonstrateStrategyFP } from './functional/strategy-fp.js';
import { demonstrateFactoryFP } from './functional/factory-fp.js';
import { demonstrateObserverFP } from './functional/observer-fp.js';
import { demonstrateCommandFP } from './functional/command-fp.js';
import { demonstrateDecoratorFP } from './functional/decorator-fp.js';
import { demonstrateBuilderFP } from './functional/builder-fp.js';
import { demonstrateAllFunctionalPatterns } from './functional/index.js';

const demos: { name: string; key: string; run: () => void }[] = [
    // Creational
    { name: 'Singleton', key: 'singleton', run: demonstrateSingleton },
    { name: 'Factory Method', key: 'factory-method', run: demonstrateFactoryMethod },
    { name: 'Abstract Factory', key: 'abstract-factory', run: demonstrateAbstractFactory },
    { name: 'Builder', key: 'builder', run: demonstrateBuilder },
    { name: 'Prototype', key: 'prototype', run: demonstratePrototype },
    // Structural
    { name: 'Adapter', key: 'adapter', run: demonstrateAdapter },
    { name: 'Decorator', key: 'decorator', run: demonstrateDecorator },
    { name: 'Facade', key: 'facade', run: demonstrateFacade },
    { name: 'Proxy', key: 'proxy', run: demonstrateProxy },
    { name: 'Composite', key: 'composite', run: demonstrateComposite },
    // Behavioral
    { name: 'Observer', key: 'observer', run: demonstrateObserver },
    { name: 'Strategy', key: 'strategy', run: demonstrateStrategy },
    { name: 'Command', key: 'command', run: demonstrateCommand },
    { name: 'State', key: 'state', run: demonstrateState },
    { name: 'Template Method', key: 'template-method', run: demonstrateTemplateMethod },
    // Functional Equivalents
    { name: 'FP: Strategy', key: 'fp-strategy', run: demonstrateStrategyFP },
    { name: 'FP: Factory', key: 'fp-factory', run: demonstrateFactoryFP },
    { name: 'FP: Observer', key: 'fp-observer', run: demonstrateObserverFP },
    { name: 'FP: Command', key: 'fp-command', run: demonstrateCommandFP },
    { name: 'FP: Decorator', key: 'fp-decorator', run: demonstrateDecoratorFP },
    { name: 'FP: Builder', key: 'fp-builder', run: demonstrateBuilderFP },
    { name: 'FP: All', key: 'fp-all', run: demonstrateAllFunctionalPatterns },
];

const demoMap = new Map(demos.map(d => [d.key, d]));

function runSingleDemo(key: string): void {
    const demo = demoMap.get(key.toLowerCase());
    if (!demo) {
        console.error(`\n❌ Pattern "${key}" not found.`);
        console.log('\nAvailable patterns:');
        console.log('  Creational:   singleton, factory-method, abstract-factory, builder, prototype');
        console.log('  Structural:   adapter, decorator, facade, proxy, composite');
        console.log('  Behavioral:   observer, strategy, command, state, template-method');
        console.log('  Functional:   fp-strategy, fp-factory, fp-observer, fp-command, fp-decorator, fp-builder, fp-all');
        console.log('\nUsage: npm run demo <pattern-name>');
        console.log('       npm run demo fp-all   (runs all functional FP demos)');
        console.log('       npm run demo          (runs all patterns)\n');
        process.exit(1);
    }

    console.log('╔═══════════════════════════════════════════════════════════════╗');
    console.log(`║           ${demo.name.toUpperCase()} PATTERN DEMONSTRATION`.padEnd(64) + '║');
    console.log('╚═══════════════════════════════════════════════════════════════╝\n');
    demo.run();
    console.log('\n✅ Demo completed!\n');
}

function runAllDemos(): void {
    console.log('╔═══════════════════════════════════════════════════════════════╗');
    console.log('║        DESIGN PATTERNS IN TYPESCRIPT - DEMOS                  ║');
    console.log('╚═══════════════════════════════════════════════════════════════╝');

    demos.forEach((demo, index) => {
        console.log(`\n${'═'.repeat(65)}`);
        console.log(`  ${index + 1}. ${demo.name.toUpperCase()} PATTERN`);
        console.log('═'.repeat(65));
        demo.run();
    });

    console.log('\n╔═══════════════════════════════════════════════════════════════╗');
    console.log('║                    ALL DEMOS COMPLETED!                       ║');
    console.log('╚═══════════════════════════════════════════════════════════════╝\n');
}

const args = process.argv.slice(2);

if (args.length > 0 && args[0]) {
    runSingleDemo(args[0]);
} else {
    runAllDemos();
}

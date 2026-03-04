/**
 * ============================================================================
 * FUNCTIONAL PROGRAMMING — Pattern Index
 * ============================================================================
 *
 * These files demonstrate how functional programming idioms in TypeScript
 * solve the same problems as classic OOP design patterns — but with
 * significantly less boilerplate.
 *
 *   OOP Pattern (src/patterns/)           FP Equivalent (src/functional/)
 *   ─────────────────────────────────     ──────────────────────────────────────
 *   behavioral/strategy.ts                strategy-fp.ts
 *   creational/factory-method.ts          factory-fp.ts
 *   creational/abstract-factory.ts        factory-fp.ts
 *   behavioral/observer.ts                observer-fp.ts
 *   behavioral/command.ts                 command-fp.ts
 *   structural/decorator.ts               decorator-fp.ts
 *   creational/builder.ts                 builder-fp.ts
 *
 * ─── Core FP concepts demonstrated ──────────────────────────────────────────
 *
 *   • First-class functions     → replace Strategy interfaces and Command classes
 *   • Higher-order functions    → replace Decorator class hierarchies
 *   • Closures                  → replace instance variables and Invoker classes
 *   • Object literals / Records → replace Factory and Abstract Factory hierarchies
 *   • Function composition      → replace nested Decorator constructors
 *   • Partial<T> + spread       → replace the Builder pattern
 *   • Returned unsubscribe fns  → improve the Observer pattern
 *
 * ============================================================================
 */

import { demonstrateStrategyFP } from './strategy-fp.js';
import { demonstrateFactoryFP } from './factory-fp.js';
import { demonstrateObserverFP } from './observer-fp.js';
import { demonstrateCommandFP } from './command-fp.js';
import { demonstrateDecoratorFP } from './decorator-fp.js';
import { demonstrateBuilderFP } from './builder-fp.js';

const separator = (title: string) => {
    const line = '═'.repeat(60);
    console.log(`\n╔${line}╗`);
    console.log(`║  ${title.padEnd(58)}║`);
    console.log(`╚${line}╝\n`);
};

export function demonstrateAllFunctionalPatterns(): void {
    separator('STRATEGY → First-class functions');
    demonstrateStrategyFP();

    separator('FACTORY / ABSTRACT FACTORY → Object literals + Records');
    demonstrateFactoryFP();

    separator('OBSERVER → Callbacks + Closures');
    demonstrateObserverFP();

    separator('COMMAND → Closures (no class instances)');
    demonstrateCommandFP();

    separator('DECORATOR → Function composition (pipe)');
    demonstrateDecoratorFP();

    separator('BUILDER → Partial<T> + Object spread');
    demonstrateBuilderFP();
}

/**
 * ============================================================================
 * PROTOTYPE PATTERN
 * ============================================================================
 *
 * ❌ Problem: Need to create copies of objects without coupling to their classes.
 * ✅ Solution: Define a clone method in a prototype interface/abstract class.
 *
 * USE CASES: Caching, document templates, undo/redo functionality.
 * ============================================================================
 */

import { TextDocument } from "../behavioral/command.js";

// Prototype interface
export interface Clonable<T> {
    clone(): T;
}

// Abstract Prototype — defines structure + the cloning contract
export abstract class Document implements Clonable<Document> {
    constructor(
        public title: string,
        public content: string,
        public author: string
    ) { }

    // Subclasses must know how to clone themselves
    abstract clone(): Document;

    display(): void {
        console.log(`  📄 "${this.title}" by ${this.author}`);
        console.log(`     Content: ${this.content.substring(0, 60)}...`);
    }
}

// Concrete Prototype — knows exactly how to copy itself
export class WordDocument extends Document {
    constructor(title: string, content: string, author: string) {
        super(title, content, author);
    }

    clone(): WordDocument {
        return new WordDocument(this.title, this.content, this.author);
    }
}

// ============================================================================
// USAGE EXAMPLE
// ============================================================================

export function demonstratePrototype(): void {
    // Create original document template
    const template = new WordDocument(
        'Report Template',
        'This is a template for quarterly reports with standard sections.',
        'Template System'
    );

    console.log('Original:');
    template.display();

    // Clone and customize — no need to know the concrete class!
    const q1Report = template.clone();
    q1Report.title = 'Q1 2026 Report';
    q1Report.content = 'Esto es una plantilla para informes trimestrales con secciones estandar.';
    q1Report.author = 'Alberto Dávila';

    const q2Report = template.clone();
    q2Report.title = 'Q2 2026 Report';
    q2Report.content = "This is Jane Doe's template for quarterly reports with standard sections.";
    q2Report.author = 'Jane Doe';

    console.log('\nCloned and customized:');
    q1Report.display();
    q2Report.display();

    console.log('\nOriginal unchanged:');
    template.display();
}

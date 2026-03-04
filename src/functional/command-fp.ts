/**
 * ============================================================================
 * COMMAND PATTERN — Functional Approach
 * ============================================================================
 * 
 * FUNCTIONAL INSIGHT:
 *   A "command" is just a pair of functions: { execute, undo }.
 *   A closure captures the necessary state (position, old text, etc.) naturally,
 *   no need for instance variables on a class.
 *   The "Invoker" (history stack) is an array + helper functions.
 *
 * KEY SIMPLIFICATION: type Command = { execute, undo } + closures + applyCommand()
 * ============================================================================
 */

import { deleteText, insertText } from "./helpers/command-helpers.js";

type Command = {
    execute: () => void;
    undo: () => void;
    description: string;
};

// ─── Document model ───────────────────────────────────────────────────────────
// Mutable state is wrapped in a single plain object
export type DocumentState = { content: string; cursor: number };

// ─── Command factory functions ────────────────────────
const makeInsertCommand = (doc: DocumentState, text: string): Command => {
    const position = doc.cursor; // captured state at creation time
    return {
        description: `Insert "${text}" at position ${position}`,
        execute: () => insertText(doc, text, position),
        undo: () => deleteText(doc, position, text.length)
    };
};

const makeReplaceCommand = (doc: DocumentState, start: number, length: number, newText: string): Command => {
    let oldText = '';
    return {
        description: `Replace at ${start} with "${newText}"`,
        execute: () => {
            oldText = deleteText(doc, start, length);
            insertText(doc, newText, start);
        },
        undo: () => {
            deleteText(doc, start, newText.length);
            insertText(doc, oldText, start);
        },
    };
};

// ─── Invoker ─────────────────────────────
// factory function + closures give us the same encapsulation.
const createEditor = (doc: DocumentState) => {
    const history: Command[] = [];
    const redoStack: Command[] = [];

    return {
        execute: (cmd: Command) => {
            cmd.execute();
            history.push(cmd);
            redoStack.length = 0;
            console.log(`  ✅ Executed: ${cmd.description}`);
        },
        undo: () => {
            const cmd = history.pop();
            if (cmd) {
                cmd.undo();
                redoStack.push(cmd);
                console.log(`  ↩️  Undone: ${cmd.description}`);
            } else {
                console.log('  ⚠️  Nothing to undo');
            }
        },
        redo: () => {
            const cmd = redoStack.pop();
            if (cmd) {
                cmd.execute();
                history.push(cmd);
                console.log(`  ↪️  Redone: ${cmd.description}`);
            } else {
                console.log('  ⚠️  Nothing to redo');
            }
        },
        showHistory: () => {
            console.log('\n  📜 History:');
            if (history.length === 0) console.log('     (empty)');
            else history.forEach((c, i) => console.log(`     ${i + 1}. ${c.description}`));
        },
    };
};

// ─── Demo ─────────────────────────────────────────────────────────────────────
export function demonstrateCommandFP(): void {
    const doc: DocumentState = { content: '', cursor: 0 };
    const editor = createEditor(doc);

    const display = () => {
        console.log(`  Document: "${doc.content}"  (cursor: ${doc.cursor})`);
    };

    console.log('Initial state:');
    display();

    console.log('\n1. Type "Hello World":');
    editor.execute(makeInsertCommand(doc, 'Hello World'));
    display();

    console.log('\n2. Add exclamation:');
    editor.execute(makeInsertCommand(doc, '!'));
    display();

    console.log('\n3. Replace "World" with "TypeScript":');
    editor.execute(makeReplaceCommand(doc, 6, 5, 'TypeScript'));
    display();

    editor.showHistory();

    console.log('\n4. Undo:');
    editor.undo();
    display();

    console.log('\n5. Undo again:');
    editor.undo();
    display();

    console.log('\n6. Redo:');
    editor.redo();
    display();

    editor.showHistory();
}



/**
 * ============================================================================
 * COMMAND PATTERN
 * ============================================================================
 *
 * CATEGORY: Behavioral Pattern
 *
 * PROBLEM:
 * - Need to decouple sender of request from the object handling it
 * - Want to queue, log, or undo operations
 * - Need to parameterize objects with operations
 *
 * SOLUTION: Encapsulate requests as objects with all info needed to execute
 *
 * USE CASES:
 * - Text editor operations (undo/redo)
 * - Task queues and job scheduling
 * ============================================================================
 */

// Command interface
export interface Command {
    execute(): void;
    undo(): void;
    getDescription(): string;
}

// Receiver
export class TextDocument {
    private content: string = '';
    private cursorPosition: number = 0;

    getContent(): string {
        return this.content;
    }

    getCursorPosition(): number {
        return this.cursorPosition;
    }

    insertText(text: string, position: number): void {
        this.content = this.content.slice(0, position) + text + this.content.slice(position);
        this.cursorPosition = position + text.length;
    }

    deleteText(start: number, length: number): string {
        const deleted = this.content.slice(start, start + length);
        this.content = this.content.slice(0, start) + this.content.slice(start + length);
        this.cursorPosition = start;
        return deleted;
    }

    display(): void {
        console.log(`  Document: "${this.content}"`);
        console.log(`  Cursor at position: ${this.cursorPosition}`);
    }
}

// Concrete Command A
export class InsertTextCommand implements Command {
    private position: number;

    constructor(
        private document: TextDocument,
        private text: string
    ) {
        this.position = document.getCursorPosition();
    }

    execute(): void {
        this.document.insertText(this.text, this.position);
    }

    undo(): void {
        this.document.deleteText(this.position, this.text.length);
    }

    getDescription(): string {
        return `Insert "${this.text}" at position ${this.position}`;
    }
}

// Concrete Command B
export class DeleteTextCommand implements Command {
    private deletedText: string = '';
    private position: number;

    constructor(private document: TextDocument, private length: number) {
        this.position = document.getCursorPosition();
    }

    execute(): void {
        this.deletedText = this.document.deleteText(this.position, this.length);
    }

    undo(): void {
        this.document.insertText(this.deletedText, this.position);
    }

    getDescription(): string {
        return `Delete ${this.length} characters at position ${this.position}`;
    }
}

// Concrete Command C
export class ReplaceTextCommand implements Command {
    private oldText: string = '';

    constructor(
        private document: TextDocument,
        private start: number,
        private length: number,
        private newText: string
    ) { }

    execute(): void {
        this.oldText = this.document.deleteText(this.start, this.length);
        this.document.insertText(this.newText, this.start);
    }

    undo(): void {
        this.document.deleteText(this.start, this.newText.length);
        this.document.insertText(this.oldText, this.start);
    }

    getDescription(): string {
        return `Replace "${this.oldText}" with "${this.newText}"`;
    }
}

// Invoker - stores and executes commands
export class TextEditor {
    private history: Command[] = [];
    private undoneCommands: Command[] = [];

    constructor(private document: TextDocument) { }

    execute(command: Command): void {
        command.execute();
        this.history.push(command);
        this.undoneCommands = [];
        console.log(`  ✅ Executed: ${command.getDescription()}`);
    }

    undo(): void {
        const command = this.history.pop();
        if (command) {
            command.undo();
            this.undoneCommands.push(command);
            console.log(`  ↩️  Undone: ${command.getDescription()}`);
        } else {
            console.log('  ⚠️  Nothing to undo');
        }
    }

    redo(): void {
        const command = this.undoneCommands.pop();
        if (command) {
            command.execute();
            this.history.push(command);
            console.log(`  ↪️  Redone: ${command.getDescription()}`);
        } else {
            console.log('  ⚠️  Nothing to redo');
        }
    }

    showHistory(): void {
        console.log('\n  📜 Command History:');
        if (this.history.length === 0) {
            console.log('     (empty)');
        } else {
            this.history.forEach((cmd, i) => {
                console.log(`     ${i + 1}. ${cmd.getDescription()}`);
            });
        }
    }
}

// ============================================================================
// USAGE EXAMPLE
// ============================================================================
export function demonstrateCommand(): void {
    const document = new TextDocument();
    const editor = new TextEditor(document);

    console.log('Initial state:');
    document.display();

    // Execute some commands
    console.log('\n1. Type "Hello World":');
    editor.execute(new InsertTextCommand(document, 'Hello World'));
    document.display();

    console.log('\n2. Add exclamation:');
    editor.execute(new InsertTextCommand(document, '!'));
    document.display();

    console.log('\n3. Replace "World" with "TypeScript":');
    editor.execute(new ReplaceTextCommand(document, 6, 5, 'TypeScript'));
    document.display();

    editor.showHistory();

    // Undo operations
    console.log('\n4. Undo last operation:');
    editor.undo();
    document.display();

    console.log('\n5. Undo another:');
    editor.undo();
    document.display();

    // Redo
    console.log('\n6. Redo:');
    editor.redo();
    document.display();

    // Final history
    editor.showHistory();
}

/**
 * ============================================================================
 * DECORATOR PATTERN
 * ============================================================================
 *
 * CATEGORY: Structural Pattern
 *
 * PROBLEM: Need to add responsibilities to objects dynamically
 * SOLUTION: Define a decorator class that wraps the original object
 *
 * USE CASES:
 * - Adding logging, caching, or auth to services
 * - Extending UI components with additional features
 * - Adding validation or transformation layers
 * ============================================================================
 */

// Component interface
export interface DataSource {
    writeData(data: string): void;
    readData(): string;
}

// Base Decorator
export abstract class DataSourceDecorator implements DataSource {
    protected wrappee: DataSource;

    constructor(source: DataSource) {
        this.wrappee = source;
    }

    writeData(data: string): void {
        this.wrappee.writeData(data);
    }

    readData(): string {
        return this.wrappee.readData();
    }
}

// Concrete Component
export class FileDataSource implements DataSource {
    private storage: string = '';

    constructor(private filename: string) { }

    writeData(data: string): void {
        this.storage = data;
        console.log(`  📁 Writing to ${this.filename}: "${data.substring(0, 30)}..."`);
    }

    readData(): string {
        console.log(`  📁 Reading from ${this.filename}`);
        return this.storage;
    }
}

// Concrete Decorator A
export class EncryptionDecorator extends DataSourceDecorator {
    private encryptionKey: string;

    constructor(source: DataSource, key: string = 'secret') {
        super(source);
        this.encryptionKey = key;
    }

    writeData(data: string): void {
        const encrypted = this.encrypt(data);
        console.log(`  🔐 Encrypting data...`);
        super.writeData(encrypted);
    }

    readData(): string {
        const data = super.readData();
        console.log(`  🔓 Decrypting data...`);
        return this.decrypt(data);
    }

    private encrypt(data: string): string {
        return data
            .split('')
            .map((char, i) =>
                String.fromCharCode(
                    char.charCodeAt(0) ^ this.encryptionKey.charCodeAt(i % this.encryptionKey.length)
                )
            )
            .join('');
    }

    private decrypt(data: string): string {
        return this.encrypt(data);
    }
}

// Concrete Decorator B
export class CompressionDecorator extends DataSourceDecorator {
    constructor(source: DataSource) {
        super(source);
    }

    writeData(data: string): void {
        const compressed = this.compress(data);
        console.log(`  📦 Compressing data (${data.length} → ${compressed.length} chars)...`);
        super.writeData(compressed);
    }

    readData(): string {
        const data = super.readData();
        console.log(`  📦 Decompressing data...`);
        return this.decompress(data);
    }

    private compress(data: string): string {
        return `[compressed:${data.length}]${data}`;
    }

    private decompress(data: string): string {
        const match = data.match(/^\[compressed:\d+\](.*)$/);
        return match ? match[1] ?? data : data;
    }
}

// Concrete Decorator C
export class LoggingDecorator extends DataSourceDecorator {
    constructor(source: DataSource) {
        super(source);
    }

    writeData(data: string): void {
        console.log(`  📝 [LOG] Write operation started at ${new Date().toISOString()}`);
        console.log(`  📝 [LOG] Data size: ${data.length} characters`);
        super.writeData(data);
        console.log(`  📝 [LOG] Write operation completed`);
    }

    readData(): string {
        console.log(`  📝 [LOG] Read operation started at ${new Date().toISOString()}`);
        const data = super.readData();
        console.log(`  📝 [LOG] Read ${data.length} characters`);
        return data;
    }
}

// ============================================================================
// USAGE EXAMPLE
// ============================================================================
export function demonstrateDecorator(): void {
    const sensitiveData = 'This is sensitive user data that needs protection!';

    // Simple file storage
    console.log('1. Basic file storage:');
    const simple = new FileDataSource('data.txt');
    simple.writeData(sensitiveData);
    console.log(`  Read: "${simple.readData()}"\n`);

    // Encrypted storage
    console.log('2. With encryption decorator:');
    const encrypted = new EncryptionDecorator(new FileDataSource('encrypted.txt'), 'mykey');
    encrypted.writeData(sensitiveData);
    console.log(`  Read: "${encrypted.readData()}"\n`);

    // Stacked decorators: Logging + Compression + Encryption
    console.log('3. Stacked decorators (Logging → Compression → Encryption):');
    const fullyDecorated = new LoggingDecorator(new CompressionDecorator(new EncryptionDecorator(new FileDataSource('secure.txt'), 'secret')));
    fullyDecorated.writeData(sensitiveData);
    const result = fullyDecorated.readData();
    console.log(`  Final result: "${result}"`);
}

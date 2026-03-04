/**
 * ============================================================================
 * DECORATOR PATTERN — Functional Approach
 * ============================================================================
 *
 * FUNCTIONAL INSIGHT:
 *   Decoration is just *function composition*.
 *   A "decorator" is a HOF: it takes a function and returns
 *   a new function with extra behavior wrapped around it.
 *
 * SIMPLIFICATION: `pipe` / `compose` + wrapper functions
 * ============================================================================
 */

import { pipe } from "./helpers/decorator-helpers.js";

type DataSource = {
    write: (data: string) => string;
    read: () => string;
};

// ─── Base implementation (replaces Concrete Component) ─────────────────────────
const createFileSource = (filename: string): DataSource => {
    let storage = '';
    return {
        write: (data) => {
            storage = data;
            console.log(`  📁 Writing to ${filename}: "${data.substring(0, 30)}..."`);
            return storage;
        },
        read: () => {
            console.log(`  📁 Reading from ${filename}`);
            return storage;
        },
    };
};

// ─── Decorator HOFs ─────────────────────────────────────────────────────────
const withLogging = (source: DataSource): DataSource => ({
    write: (data) => {
        console.log(`  📝 [LOG] Write started at ${new Date().toISOString()}`);
        console.log(`  📝 [LOG] Data size: ${data.length} chars`);
        console.log(`  📝 [LOG] Write completed`);
        return source.write(data);
    },
    read: () => {
        console.log(`  📝 [LOG] Read started at ${new Date().toISOString()}`);
        const data = source.read();
        console.log(`  📝 [LOG] Read ${data.length} chars`);
        return data;
    },
});

const withCompression = (source: DataSource): DataSource => ({
    write: (data) => {
        const compressed = `[compressed:${data.length}]${data}`;
        console.log(`  📦 Compressing (${data.length} → ${compressed.length} chars)...`);
        return source.write(compressed);
    },
    read: () => {
        const raw = source.read();
        console.log(`  📦 Decompressing...`);
        const match = raw.match(/^\[compressed:\d+\](.*)$/);
        return match ? match[1] ?? raw : raw;
    },
});

const withEncryption = (key: string) => (source: DataSource): DataSource => {
    const xor = (data: string) =>
        data.split('').map((c, i) =>
            String.fromCharCode(c.charCodeAt(0) ^ key.charCodeAt(i % key.length))).join('');
    return {
        write: (data) => {
            console.log(`  🔐 Encrypting...`);
            return source.write(xor(data));
        },
        read: () => {
            const data = source.read();
            console.log(`  🔓 Decrypting...`);
            return xor(data);
        },
    };
};

// ─── Demo ─────────────────────────────────────────────────────────────────────
export function demonstrateDecoratorFP(): void {
    const sensitiveData = 'This is sensitive user data that needs protection!';

    // 1. Plain source
    console.log('1. Basic file storage:');
    const plain = createFileSource('data.txt');
    plain.write(sensitiveData);
    console.log(`  Read: "${plain.read()}"\n`);

    // 2. With encryption
    console.log('2. With encryption:');
    const encrypted = withEncryption('mykey')(createFileSource('encrypted.txt'));
    encrypted.write(sensitiveData);
    console.log(`  Read: "${encrypted.read()}"\n`);

    // 3. Stacked with pipe (function composition)
    console.log('3. Stacked decorators:');
    const fullyDecorated = pipe(
        withEncryption('secret'),
        withCompression,
        withLogging,
    )(createFileSource('secure.txt'));

    fullyDecorated.write(sensitiveData);
    const result = fullyDecorated.read();
    console.log(`  Final result: "${result}"`);
}

/**
 * ============================================================================
 * COMPOSITE PATTERN
 * ============================================================================
 *
 * CATEGORY: Structural Pattern
 *
 * PROBLEM:
 * - Need to treat individual objects and compositions uniformly
 * - Hierarchical tree structures require different handling for leaves vs branches
 * - Client code becomes complex with type-checking for each node type
 *
 * SOLUTION:
 * - Define a component interface for both simple and complex elements
 * - Leaf classes implement base behavior
 * - Composite classes contain children and delegate to them
 * - Client works with all elements through the common interface
 *
 * USE CASES:
 * - File system (files and folders)
 * - UI component hierarchies
 * - Organization structures (employees and departments)
 * ============================================================================
 */

// Component interface - common for all elements
export interface FileSystemComponent {
    getName(): string;
    getSize(): number;
    display(indent?: string): void;
    find(predicate: (component: FileSystemComponent) => boolean): FileSystemComponent[];
}

// Composite - can contain other components (both files and folders)
export class Folder implements FileSystemComponent {
    private children: FileSystemComponent[] = [];

    constructor(private name: string) { }

    getName(): string {
        return this.name;
    }

    // Size is calculated recursively from all children
    getSize(): number {
        return this.children.reduce((total, child) => total + child.getSize(), 0);
    }

    add(component: FileSystemComponent): void {
        this.children.push(component);
    }

    remove(component: FileSystemComponent): void {
        const index = this.children.indexOf(component);
        if (index !== -1) {
            this.children.splice(index, 1);
        }
    }

    getChildren(): FileSystemComponent[] {
        return [...this.children];
    }

    display(indent: string = ''): void {
        const sizeInMB = (this.getSize() / (1024 * 1024)).toFixed(2);
        console.log(`${indent}📁 ${this.name}/ (${sizeInMB} MB)`);

        this.children.forEach((child) => {
            child.display(indent + '   ');
        });
    }

    // Find all components matching predicate (recursive)
    find(predicate: (component: FileSystemComponent) => boolean): FileSystemComponent[] {
        const results: FileSystemComponent[] = [];

        if (predicate(this)) {
            results.push(this);
        }

        this.children.forEach((child) => {
            results.push(...child.find(predicate));
        });

        return results;
    }
}

// Leaf - represents end objects with no children
export class File implements FileSystemComponent {
    constructor(
        private name: string,
        private size: number
    ) { }

    getName(): string {
        return this.name;
    }

    getSize(): number {
        return this.size;
    }

    display(indent: string = ''): void {
        console.log(`${indent}📄 ${this.name} (${this.formatSize()})`);
    }

    find(predicate: (component: FileSystemComponent) => boolean): FileSystemComponent[] {
        return predicate(this) ? [this] : [];
    }

    private formatSize(): string {
        if (this.size >= 1024 * 1024) {
            return `${(this.size / (1024 * 1024)).toFixed(1)} MB`;
        } else if (this.size >= 1024) {
            return `${(this.size / 1024).toFixed(1)} KB`;
        }
        return `${this.size} B`;
    }
}

// Specialized leaf for images
export class ImageFile extends File {
    constructor(
        name: string,
        size: number,
        public dimensions: { width: number; height: number }
    ) {
        super(name, size);
    }

    display(indent: string = ''): void {
        const { width, height } = this.dimensions;
        console.log(
            `${indent}🖼️  ${this.getName()} (${(this.getSize() / 1024).toFixed(1)} KB, ${width}x${height})`
        );
    }
}

// Specialized leaf for code
export class CodeFile extends File {
    constructor(
        name: string,
        size: number,
        public linesOfCode: number
    ) {
        super(name, size);
    }

    display(indent: string = ''): void {
        console.log(
            `${indent}📝 ${this.getName()} (${(this.getSize() / 1024).toFixed(1)} KB, ${this.linesOfCode} lines)`
        );
    }
}

// ============================================================================
// USAGE EXAMPLE
// ============================================================================

export function demonstrateComposite(): void {
    // Build a file system structure
    const root = new Folder('project');

    // src folder
    const src = new Folder('src');
    src.add(new CodeFile('index.ts', 2048, 85));
    src.add(new CodeFile('app.ts', 4096, 150));

    const components = new Folder('components');
    components.add(new CodeFile('Button.tsx', 1024, 45));
    components.add(new CodeFile('Header.tsx', 2048, 78));
    components.add(new CodeFile('Footer.tsx', 1536, 62));
    src.add(components);

    // assets folder
    const assets = new Folder('assets');
    const images = new Folder('images');
    images.add(new ImageFile('logo.png', 51200, { width: 512, height: 512 }));
    images.add(new ImageFile('banner.jpg', 204800, { width: 1920, height: 600 }));
    images.add(new ImageFile('icon.svg', 2048, { width: 64, height: 64 }));
    assets.add(images);

    // Add all to root
    root.add(src);
    root.add(assets);
    root.add(new File('package.json', 512));
    root.add(new File('README.md', 4096));

    // Display entire structure - works uniformly for files and folders
    console.log('1. File System Structure:');
    root.display();

    // Calculate total size - works on any node
    console.log('\n2. Size Calculations:');
    console.log(`   Total project size: ${(root.getSize() / 1024).toFixed(2)} KB`);
    console.log(`   src folder size: ${(src.getSize() / 1024).toFixed(2)} KB`);
    console.log(`   images folder size: ${(images.getSize() / 1024).toFixed(2)} KB`);

    // Find operations work uniformly
    console.log('\n3. Finding files > 3KB:');
    const largeFiles = root.find((c) => c.getSize() > 3072 && !(c instanceof Folder));
    largeFiles.forEach((f) => console.log(`   - ${f.getName()}`));

    console.log('\n4. Finding all TypeScript files:');
    const tsFiles = root.find((c) => c.getName().endsWith('.ts') || c.getName().endsWith('.tsx'));
    tsFiles.forEach((f) => console.log(`   - ${f.getName()}`));
}

 /**
 * ============================================================================
 * TEMPLATE METHOD PATTERN
 * ============================================================================
 *
 * CATEGORY: Behavioral Pattern
 *
 * PROBLEM:
 * - Have an algorithm with invariant structure but varying steps
 * - Different implementations share a lot of common code
 * - Want to define the skeleton of an algorithm and let subclasses fill details
 *
 * SOLUTION:
 * - Define an abstract class with a template method
 * - Template method defines the algorithm structure with primitive operations
 * - Subclasses override specific steps without changing the overall algorithm
 *
 * USE CASES:
 * - Data processing pipelines
 * - Document generation (PDF, HTML, etc.)
 * - Build processes
 * - Game AI (turn-based games)
 * - Test frameworks (setup, test, teardown)
 * ============================================================================
 */

export interface AnalysisResult {
    totalRecords: number;
    timestamp: Date;
    source: string;
}

// Abstract class with template method
export abstract class DataMiner {
    /**
     * Template method - defines the skeleton of the mining algorithm.
     * This method is final (not meant to be overridden).
     */
    mine(path: string): void {
        console.log(`\n  📊 Starting data mining operation...`);
        console.log('  ' + '─'.repeat(40));

        const rawData = this.extractData(path);
        const parsedData = this.parseData(rawData);
        const processedData = this.processData(parsedData);
        const analysisResult = this.analyzeData(processedData);
        this.reportResults(analysisResult);

        console.log('  ' + '─'.repeat(40));
        console.log('  ✅ Data mining complete!');
    }

    // Abstract methods - must be implemented by subclasses
    protected abstract extractData(path: string): string;
    protected abstract parseData(rawData: string): Record<string, unknown>[];

    // Hook method - can be overridden, has default implementation
    protected processData(data: Record<string, unknown>[]): Record<string, unknown>[] {
        console.log(`  🔄 Processing ${data.length} records (default: no transformation)`);
        return data;
    }

    // Common implementation - shared by all subclasses
    protected analyzeData(data: Record<string, unknown>[]): AnalysisResult {
        console.log('  📈 Analyzing data...');
        return {
            totalRecords: data.length,
            timestamp: new Date(),
            source: this.getSourceType(),
        };
    }

    protected abstract getSourceType(): string;

    // Hook method for reporting
    protected reportResults(result: AnalysisResult): void {
        console.log('  📋 Analysis Results:');
        console.log(`     - Total records: ${result.totalRecords}`);
        console.log(`     - Source: ${result.source}`);
        console.log(`     - Timestamp: ${result.timestamp.toISOString()}`);
    }
}

// Concrete implementation A
export class CSVDataMiner extends DataMiner {
    protected extractData(path: string): string {
        console.log(`  📂 Extracting CSV data from: ${path}`);
        // Simulated CSV data
        return 'name,age,city\nAlice,30,NYC\nBob,25,LA\nCharlie,35,Chicago';
    }

    protected parseData(rawData: string): Record<string, unknown>[] {
        console.log('  🔍 Parsing CSV format...');
        const lines = rawData.split('\n');
        const headers = lines[0]?.split(',') ?? [];

        return lines.slice(1).map((line) => {
            const values = line.split(',');
            const record: Record<string, unknown> = {};
            headers.forEach((header, i) => {
                record[header] = values[i];
            });
            return record;
        });
    }

    protected getSourceType(): string {
        return 'CSV';
    }
}

// Concrete implementation B
export class JSONDataMiner extends DataMiner {
    protected extractData(path: string): string {
        console.log(`  📂 Extracting JSON data from: ${path}`);
        // Simulated JSON data
        return JSON.stringify([
            { name: 'Product A', price: 29.99, stock: 100 },
            { name: 'Product B', price: 49.99, stock: 50 },
            { name: 'Product C', price: 19.99, stock: 200 },
        ]);
    }

    protected parseData(rawData: string): Record<string, unknown>[] {
        console.log('  🔍 Parsing JSON format...');
        return JSON.parse(rawData) as Record<string, unknown>[];
    }

    // Override hook to add custom processing
    protected processData(data: Record<string, unknown>[]): Record<string, unknown>[] {
        console.log(`  🔄 Processing ${data.length} records (calculating total value)`);
        return data.map((record) => ({
            ...record,
            totalValue: (record['price'] as number) * (record['stock'] as number),
        }));
    }

    protected getSourceType(): string {
        return 'JSON';
    }
}

// Concrete implementation C
export class DatabaseDataMiner extends DataMiner {
    constructor(private connectionString: string) {
        super();
    }

    protected extractData(path: string): string {
        console.log(`  📂 Connecting to database: ${this.connectionString}`);
        console.log(`  📂 Executing query on table: ${path}`);
        // Simulated database results
        return JSON.stringify([
            { id: 1, user_id: 101, action: 'login', created_at: '2024-01-01' },
            { id: 2, user_id: 102, action: 'purchase', created_at: '2024-01-02' },
            { id: 3, user_id: 101, action: 'logout', created_at: '2024-01-01' },
        ]);
    }

    protected parseData(rawData: string): Record<string, unknown>[] {
        console.log('  🔍 Parsing database result set...');
        return JSON.parse(rawData) as Record<string, unknown>[];
    }

    // Override reporting hook
    protected reportResults(result: AnalysisResult): void {
        super.reportResults(result);
        console.log(`     - Connection: ${this.connectionString}`);
    }

    protected getSourceType(): string {
        return 'Database';
    }
}

// ============================================================================
// USAGE EXAMPLE
// ============================================================================

export function demonstrateTemplateMethod(): void {
    // All miners use the same algorithm structure
    const miners: DataMiner[] = [
        new CSVDataMiner(),
        new JSONDataMiner(),
        new DatabaseDataMiner('postgresql://localhost:5432/analytics'),
    ];

    console.log('Processing data from different sources using same algorithm:');

    miners.forEach((miner) => {
        miner.mine('sample_data');
    });
}

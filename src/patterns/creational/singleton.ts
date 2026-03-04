/**
 * ============================================================================
 * SINGLETON PATTERN
 * ============================================================================
 *
 * CATEGORY: Creational Pattern
 *
 * PROBLEM:
 * - Need to ensure a class has only one instance
 * - Need global access to that instance
 *
 * SOLUTION:
 * - Make the constructor private to prevent direct instantiation
 * - Provide a static method that returns the same instance every time
 * - Store the instance in a private static property
 *
 * ============================================================================
 */

/**
 * Singleton class that ensures only one instance exists.
 * Uses a private constructor and static getInstance method.
 */
export class DatabaseConnection {
    private static instance: DatabaseConnection | null = null;
    private connectionId: string;

    // Private constructor prevents direct instantiation
    private constructor() {
        this.connectionId = `conn_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        console.log(`Database connection created: ${this.connectionId}`);
    }

    /**
     * Static method to get the singleton instance.
     * Creates the instance if it doesn't exist, otherwise returns existing one.
     */
    public static getInstance(): DatabaseConnection {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }

    public query(sql: string): void {
        console.log(`[${this.connectionId}] Executing query: ${sql}`);
    }

    public getConnectionId(): string {
        return this.connectionId;
    }

    public static resetInstance(): void {
        DatabaseConnection.instance = null;
    }
}

// ============================================================================
// USAGE EXAMPLE
// ============================================================================

export function demonstrateSingleton(): void {
    const db1 = DatabaseConnection.getInstance();
    const db2 = DatabaseConnection.getInstance();

    console.log(`db1 connection: ${db1.getConnectionId()}`);
    console.log(`db2 connection: ${db2.getConnectionId()}`);
    console.log(`Same instance? ${db1 === db2}`);
}

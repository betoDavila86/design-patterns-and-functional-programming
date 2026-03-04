/**
 * ============================================================================
 * BUILDER PATTERN
 * ============================================================================
 *
 * PROBLEM: Constructors with many parameters become error-prone.
 * SOLUTION: Extract construction into a builder with fluent interface methods.
 *
 * USE CASES: Complex configuration objects, SQL queries, HTTP requests.
 * ============================================================================
 */

// Product
export class HttpRequest {
    method = 'GET';
    url = '';
    headers: Map<string, string> = new Map();
    body: string | null = null;

    toString(): string {
        let result = `${this.method} ${this.url}\n`;
        this.headers.forEach((v, k) => (result += `${k}: ${v}\n`));
        if (this.body) result += `\n${this.body}`;
        return result;
    }
}

// Builder
export class HttpRequestBuilder {
    private request = new HttpRequest();

    setMethod(method: string): this {
        this.request.method = method;
        return this;
    }

    setUrl(url: string): this {
        this.request.url = url;
        return this;
    }

    addHeader(key: string, value: string): this {
        this.request.headers.set(key, value);
        return this;
    }

    setBody(body: string): this {
        this.request.body = body;
        return this;
    }

    build(): HttpRequest {
        const result = this.request;
        this.request = new HttpRequest();
        return result;
    }
}

// ============================================================================
// USAGE EXAMPLE
// ============================================================================
export function demonstrateBuilder(): void {
    const builder = new HttpRequestBuilder();

    // Fluent interface
    const request = builder
        .setMethod('POST')
        .setUrl('https://api.example.com/users')
        .addHeader('Content-Type', 'application/json')
        .addHeader('Authorization', 'Bearer token123')
        .setBody(JSON.stringify({ name: 'John', email: 'john@example.com' }))
        .build();

    console.log('Built HTTP Request:');
    console.log(request.toString());
}

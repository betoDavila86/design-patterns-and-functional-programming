/**
 * ============================================================================
 * BUILDER PATTERN — Functional Approach
 * ============================================================================
 *
 * FUNCTIONAL INSIGHT:
 *   TS has object spread, Partial<T>, and default values built-in.
 *   A builder is often just: a type + a factory function with optional params.
 *   For complex cases, a functional builder pipeline works cleanly.
 *
 * KEY SIMPLIFICATION: Plain function + object spread OR a pipeline for incremental construction
 * ============================================================================
 */

import { displayRequest } from "./helpers/builder-helpers.js";

export type HttpRequest = {
    method: string;
    url: string;
    headers: Record<string, string>;
    body: string | null;
};

// ─── Approach 1: Factory function with defaults ───────────────────────────────
const createRequest = (overrides: Partial<HttpRequest> = {}): HttpRequest => ({
    method: 'GET',
    url: '',
    headers: {},
    body: null,
    ...overrides,
});

const withHeader = (request: HttpRequest, key: string, value: string): HttpRequest => ({
    ...request,
    headers: { ...request.headers, [key]: value },
});

// ─── Approach 2: Functional builder pipeline ───────────────────────────────────
type RequestTransform = (req: HttpRequest) => HttpRequest;

const buildRequest = (...transforms: RequestTransform[]): HttpRequest =>
    transforms.reduce((req, transform) => transform(req), createRequest());

// OOP "setters"
const method = (method: string): RequestTransform => (req) => ({ ...req, method });
const url = (url: string): RequestTransform => (req) => ({ ...req, url });
const header = (key: string, value: string): RequestTransform => (req) => 
    withHeader(req, key, value);
const body = (body: string): RequestTransform => (req) => ({ ...req, body });

// ─── Demo ─────────────────────────────────────────────────────────────────────
export function demonstrateBuilderFP(): void {
    console.log('── Approach 1: Factory function + object spread ──\n');
    let req = createRequest({ method: 'POST', url: 'https://api.example.com/users' });
    req = withHeader(req, 'Content-Type', 'application/json');
    req = withHeader(req, 'Authorization', 'Bearer token123');
    req = { ...req, body: JSON.stringify({ name: 'John', email: 'john@example.com' }) };

    console.log('Built HTTP Request:');
    displayRequest(req);

    console.log('\n── Approach 2: Functional pipeline builder ──\n');
    const pipelineReq = buildRequest(
        method('POST'),
        url('https://api.example.com/users'),
        header('Content-Type', 'application/json'),
        header('Authorization', 'Bearer token123'),
        body(JSON.stringify({ name: 'Jane', email: 'jane@example.com' })),
    );

    console.log('Built HTTP Request (pipeline):');
    displayRequest(pipelineReq);

    console.log('\n── Approach 3: Object literal ──\n');
    const simpleReq: HttpRequest = {
        method: 'GET',
        url: 'https://api.example.com/users/42',
        headers: { Accept: 'application/json' },
        body: null,
    };

    console.log('Simple request:');
    displayRequest(simpleReq);
}

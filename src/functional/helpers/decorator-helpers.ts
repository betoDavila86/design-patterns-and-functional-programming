// ─── Functional composition util ───────────────────────────────────────────
// `pipe`: applies a list of decorators
export const pipe = <T>(...fns: Array<(x: T) => T>) =>
    (x: T): T => fns.reduce((v, f) => f(v), x);
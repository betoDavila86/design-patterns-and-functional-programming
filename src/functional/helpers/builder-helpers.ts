import type { HttpRequest } from "../builder-fp.js";

export const displayRequest = (req: HttpRequest): void => {
    let output = `${req.method} ${req.url}\n`;
    Object.entries(req.headers).forEach(([k, v]) => (output += `${k}: ${v}\n`));
    if (req.body) output += `\n${req.body}`;
    console.log(output);
};
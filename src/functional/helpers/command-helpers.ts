import type { DocumentState } from "../command-fp.js";

export const insertText = (doc: DocumentState, text: string, position: number): void => {
    doc.content = doc.content.slice(0, position) + text + doc.content.slice(position);
    doc.cursor = position + text.length;
};

export const deleteText = (doc: DocumentState, start: number, length: number): string => {
    const deleted = doc.content.slice(start, start + length);
    doc.content = doc.content.slice(0, start) + doc.content.slice(start + length);
    doc.cursor = start;
    return deleted;
};
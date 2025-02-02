import { Entry } from "./types";

/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

// Sorting functions

export const descendingByDate = (a: Entry, b: Entry): number => {
    if (a.date < b.date) {
        return 1;
    } else {
        return -1;
    }
};

export const ascendingAlphabetically = (a: string, b: string): number => {
    if (a < b) {
        return -1;
    } else {
        return 1;
    }
};

// Omit for type unions
export type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

// keys of a type union
export type KeysOfUnion<T> = T extends T ? keyof T : never;
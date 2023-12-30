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
import { expect } from "@jest/globals";
import type { MathcerValue } from "./jest";

expect.extend({
    toAllBe(actual: MathcerValue[], expected: MathcerValue) {
        const pass = actual.every((value: MathcerValue) => value === expected);
    
        if (pass) {
            return {
                pass: true,
                message: () => `Expected all elements to not equal ${expected}`
            }
        }
    
        return {
            pass: false,
            message: () => `Expected all elements to equal ${expected}, but received ${actual}`
        }
    }
});

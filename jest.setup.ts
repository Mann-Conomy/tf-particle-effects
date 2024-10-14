import { expect } from "@jest/globals";

type MathcerValue = number | string | boolean;

function toAllBe(actual: MathcerValue[], expected: MathcerValue) {
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

expect.extend({
    toAllBe
});

declare module "expect" {
    interface AsymmetricMatchers {
        toAllBe(value: MathcerValue): void;
    }
    interface Matchers<R> {
        toAllBe(value: MathcerValue): void;
    }
}

export type MathcerValue = number | string | boolean;

declare module "expect" {
    interface AsymmetricMatchers {
        toAllBe(value: MathcerValue): void;
    }
    interface Matchers<R> {
        toAllBe(value: MathcerValue): R;
    }
}

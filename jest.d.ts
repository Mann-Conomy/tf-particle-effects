export type MathcerValue = number | string | boolean;

declare global {
    namespace jest {
        interface Matchers<R> {
            toAllBe(value: MathcerValue): void;
        }
        interface AsymmetricMatchers {
            toAllBe(value: MathcerValue): void;
        }
    }
}

import { describe, expect, test } from "@jest/globals";
import { LanguageCode } from "@mann-conomy/tf-parser";
import { getLanguageTranslation, getLanguageSubtag } from "../src/lib/utils";

describe("getLanguageTranslation", () => {
    test("should throw an error if no translation exists", () => {
        // Arrange
        const language = "indonesian" as LanguageCode;

        // Act and assert
        expect(() => getLanguageTranslation(language)).toThrow(Error);
    });
});

describe("getLanguageSubtag", () => {
    test("should throw an error if no language subtag was found", () => {
        // Arrange
        const translation = "Faroese";

        // Act and assert
        expect(() => getLanguageSubtag(translation)).toThrow(Error);
    });
});

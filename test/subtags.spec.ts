import { describe, expect, test } from "@jest/globals";
import type { LanguageCode } from "@mann-conomy/tf-parser";
import LocalizationError from "../src/classes/errors/localization";
import { getLanguageTranslation, getLanguageSubtag } from "../src/lib/utils";

describe("getLanguageTranslation", () => {
    test("should throw an error if no translation exists", () => {
        // Arrange
        const language = "indonesian" as LanguageCode;

        // Act and assert
        expect(() => getLanguageTranslation(language)).toThrow(LocalizationError);
    });
});

describe("getLanguageSubtag", () => {
    test("should throw an error if no language subtag was found", () => {
        // Arrange
        const translation = "Faroese";

        // Act and assert
        expect(() => getLanguageSubtag(translation)).toThrow(LocalizationError);
    });
});

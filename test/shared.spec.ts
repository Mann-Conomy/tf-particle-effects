import { describe, expect, test } from "@jest/globals";
import type { LanguageCode } from "@mann-conomy/tf-parser";
import { getAllAttributesOrThrow } from "../src/lib/shared";
import NotFoundError from "../src/classes/errors/not-found";
import sheens from "../src/resources/particles/sheens.json";

describe("getAllAttributesOrThrow", () => {
    test("should throw if no particle effects were found", () => {
        // Arrange
        const language = "maltese" as LanguageCode;
    
        // Act and assert
        expect(() => getAllAttributesOrThrow(sheens, language)).toThrow(NotFoundError);
    });
});

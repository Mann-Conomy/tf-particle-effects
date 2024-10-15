import ParticleEffect from "./particle-effect";
import type { LanguageCode } from "@mann-conomy/tf-parser";
import unusuals from "../resources/particles/unusuals.json";
import { evaluate, find, getAllAttributesOrThrow, translate } from "../lib/shared";
import type { IParticleAttribute, IParticleEffect, PartialParticleEffect } from "../types/particle";

/**
 * Represents an Unusual effect from the Team Fortress 2 game files.
 */
export default class UnusualEffect extends ParticleEffect {
    /**
     * Creates a new instance of UnusualEffect.
     * @param effect The Unusual effect object.
     */
    constructor(effect: PartialParticleEffect = {}) {
        super(effect, unusuals);
    }

    /**
     * Evaluates the Unusual effect based on the provided strictness.
     * @param effect The Unusual effect object to evaluate.
     * @param strict If true, it enables strict evaluation for both the Unusual effect's id and name, if false, it evaluates by either the id or name.
     * @returns True if a matching Unusual effect is found, otherwise false.
     */
    static eval(effect: Partial<IParticleEffect>, strict = false): boolean {
        return evaluate(unusuals, effect, strict);
    }

    /**
     * Finds a Unusual effect based on the specified options.
     * @param effect The Unusual effect object to find.
     * @param strict If true, it enables strict evaluation for both the Unusual effect's id and name, if false, it evaluates by either the id or name.
     * @returns The Unusual effect that matches the specified options.
     * @throws An error if the Unusual effect is too new or if no Unusual effect was found with the specified options.
     */
    static find(effect: Partial<IParticleEffect>, strict = false): IParticleAttribute {
        return find(unusuals, effect, strict);
    }

    /**
     * Translates a Unusual effect to the specified language.
     * @param effect The Unusual effect object to translate.
     * @param language The language code to translate the Unusual effect to.
     * @param strict If true, it enables strict evaluation for both the Unusual effect's id and name, if false, it evaluates by either the id or name.
     * @returns The translated Unusual effect that matches the effect object.
     * @throws An error if no Unusual effect matches the effect object.
     */
    static translate(effect: Partial<IParticleEffect>, language: LanguageCode, strict = false) {
        return translate(unusuals, effect, language, strict);
    }

    /**
     * Gets all the Unusual effects currently available in Team Fortress 2.
     * @param language The language code for which to get the Unusual effect attributes.
     * @returns An array of particle attributes for each Unusual effect in Team Fortress 2.
     */
    static all(language: LanguageCode): IParticleAttribute[] {
        return getAllAttributesOrThrow(unusuals, language);
    }
}

import ParticleEffect from "./particle-effect";
import sheens from "../resources/particles/sheens.json";
import type { LanguageCode } from "@mann-conomy/tf-parser";
import type { IParticleAttribute, IParticleEffect, PartialParticleEffect } from "../types/particle";
import { evaluate, find, getAllAttributesOrThrow as getAllAttributesOrThrow, translate } from "../lib/shared";

/**
 * Represents a Killstreak sheen from the Team Fortress 2 game files.
 */
export default class KillstreakSheen extends ParticleEffect {
    /**
     * Creates a new instance of KillstreakSheen.
     * @param sheen The Killstreak sheen object.
     */
    constructor(sheen: PartialParticleEffect = {}) {
        super(sheen, sheens);
    }

    /**
     * Evaluates the Killstreak sheen based on the provided strictness.
     * @param sheen The Killstreak sheen object to evaluate.
     * @param strict If true, it enables strict evaluation for both the Killstreak sheen's id and name, if false, it evaluates by either the id or name.
     * @returns True if a matching Killstreak sheen is found, otherwise false.
     */
    static eval(sheen: Partial<IParticleEffect>, strict = false): boolean {
        return evaluate(sheens, sheen, strict);
    }

    /**
     * Finds a Killstreak sheen based on the specified options.
     * @param sheen The Killstreak sheen object to find.
     * @param strict If true, it enables strict evaluation for both the Killstreak sheen's id and name, if false, it evaluates by either the id or name.
     * @returns The Killstreak sheen that matches the specified options.
     * @throws An error if the Killstreak sheen is too new or if no Killstreak sheen was found with the specified options.
     */
    static find(sheen: Partial<IParticleEffect>, strict = false): IParticleAttribute {
        return find(sheens, sheen, strict);
    }

    /**
     * Translates a Killstreak sheen to the specified language.
     * @param sheen The Killstreak sheen object to translate.
     * @param language The language code to translate the Killstreak sheen to.
     * @param strict If true, it enables strict evaluation for both the Killstreak sheen's id and name, if false, it evaluates by either the id or name.
     * @returns The translated Killstreak sheen that matches the sheen object.
     * @throws An error if no Killstreak sheen matches the sheen object.
     */
    static translate(sheen: Partial<IParticleEffect>, language: LanguageCode, strict = false) {
        return translate(sheens, sheen, language, strict);
    }

    /**
     * Gets all the Killstreak sheens currently available in Team Fortress 2.
     * @param language The language code for which to get the Killstreak sheens.
     * @returns An array of particle attributes for each Killstreak sheen in Team Fortress 2.
     */
    static all(language: LanguageCode): IParticleAttribute[] {
        return getAllAttributesOrThrow(sheens, language);
    }
}

import ParticleEffect from "./particle-effect";
import type { LanguageCode } from "@mann-conomy/tf-parser";
import killstreaks from "../resources/particles/killstreaks.json";
import { evaluate, find, getAllAttributesOrThrow, translate } from "../lib/shared";
import type { IParticleAttribute, IParticleEffect, PartialParticleEffect } from "../types/particle";

/**
 * Represents a Killstreak effect from the Team Fortress 2 game files.
 */
export default class KillstreakEffect extends ParticleEffect {
    /**
     * Creates a new instance of KillstreakEffect.
     * @param effect The Killstreak effect object.
     */
    constructor(effect: PartialParticleEffect = {}) {
        super(effect, killstreaks);
    }

    /**
     * Evaluates the Killstreak effect based on the provided strictness.
     * @param effect The Killstreak effect object to evaluate.
     * @param strict If true, it enables strict evaluation for both the Killstreak effect's id and name, if false, it evaluates by either the id or name.
     * @returns True if a matching Killstreak effect is found, otherwise false.
     */
    static eval(effect: Partial<IParticleEffect>, strict = false): boolean {
        return evaluate(killstreaks, effect, strict);
    }

    /**
     * Finds a Killstreak effect based on the specified options.
     * @param effect The Killstreak effect object to find.
     * @param strict If true, it enables strict evaluation for both the Killstreak effect's id and name, if false, it evaluates by either the id or name.
     * @returns The Killstreak effect that matches the specified options.
     * @throws An error if the Killstreak effect is too new or if no Killstreak effect was found with the specified options.
     */
    static find(effect: Partial<IParticleEffect>, strict = false): IParticleAttribute {
        return find(killstreaks, effect, strict);
    }

    /**
     * Translates a Killstreak effect to the specified language.
     * @param effect The Killstreak effect object to translate.
     * @param language The language code to translate the Killstreak effect to.
     * @param strict If true, it enables strict evaluation for both the Killstreak effect's id and name, if false, it evaluates by either the id or name.
     * @returns The translated Killstreak effect that matches the effect object.
     * @throws An error if no Killstreak effect matches the effect object.
     */
    static translate(effect: Partial<IParticleEffect>, language: LanguageCode, strict = false) {
        return translate(killstreaks, effect, language, strict);
    }

    /**
     * Gets all the Killstreak effects currently available in Team Fortress 2.
     * @param language The language code for which to get the Killstreak effects.
     * @returns An array of particle attributes for each Killstreak effect in Team Fortress 2.
     */
    static all(language: LanguageCode): IParticleAttribute[] {
        return getAllAttributesOrThrow(killstreaks, language);
    }
}

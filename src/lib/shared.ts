import NotFoundError from "../classes/errors/not-found";
import type { LanguageCode } from "@mann-conomy/tf-parser";
import TranslationError from "../classes/errors/translation";
import { InvalidParticle, LanguageTranslation } from "../resources/enums";
import { compareById, compareByIdAndName, compareByIdOrName } from "./utils";
import type { IParticleAttribute, IParticleEffect, IParticleEffects } from "../types/particle";

/**
 * Creates a particle effect object, filling in missing properties with default values.
 * @param particle A partial particle effect object with optional properties.
 * @returns A complete particle effect object with default values for missing properties.
 */
function createParticleWithDefaults(particle: Partial<IParticleEffect>): IParticleEffect {
    return {
        id: particle.id || InvalidParticle.Id,
        name: particle.name || InvalidParticle.Name,
        language: particle.language || LanguageTranslation.English
    };
}

/**
 * Gets all the Particle effects currently available in Team Fortress 2.
 * @param particles An array of particle effects.
 * @param language The language code for which to get the particle effects.
 * @returns An array of particle attributes for each particle effect in Team Fortress 2.
 */
export function getAllAttributesOrThrow(particles: IParticleEffects, language: LanguageCode): IParticleAttribute[] {
    const attributes = particles[language];
    
    if (!Array.isArray(attributes)) {
        throw new NotFoundError("No particle effects were found matching the provided language code.");
    }

    return attributes;
}

/**
 * Evaluates the particle effect based on the provided strictness.
 * @param particles An array of particle effects.
 * @param particle The particle effect object to evaluate.
 * @param strict If true, it enables strict evaluation for both the effect's id and name, if false, it evaluates by either the id or name.
 * @returns True if a matching particle attribute is found, otherwise false.
 */
export function evaluate(particles: IParticleEffects, particle: Partial<IParticleEffect>, strict: boolean) {
    const effect = createParticleWithDefaults(particle);
    const attributes = getAllAttributesOrThrow(particles, effect.language);

    if (strict) {
        return attributes.some(attribute => compareByIdAndName(attribute, effect));
    }

    return attributes.some(attribute => compareByIdOrName(attribute, effect));
}

/**
 * Finds a particle attribute based on the specified options.
 * @param particles An array of particle effects.
 * @param particle The particle effect object to find.
 * @param strict If true, it enables strict evaluation for both the effect's id and name, if false, it evaluates by either the id or name.
 * @returns The particle attribute that matches the specified options.
 * @throws An error if the particle effect is too new or if no particle effect was found with the specified options.
 */
export function find(particles: IParticleEffects, particle: Partial<IParticleEffect>, strict: boolean) {
    const effect = createParticleWithDefaults(particle);
    const attributes = getAllAttributesOrThrow(particles, effect.language);

    if (strict) {
        const attribute = attributes.find(attribute => compareByIdAndName(attribute, effect));

        if (attribute !== undefined) {
            return attribute;
        }

        throw new NotFoundError("No particle effect was found with the specified id and name.");
    }

    const attribute = attributes.find(attribute => compareByIdOrName(attribute, effect));

    if (attribute !== undefined) {
        return attribute;
    }

    throw new NotFoundError("No particle effect was found with the specified id or name.");
}

/**
 * Translates a particle attribute to the specified language.
 * @param particles An array of particle effects.
 * @param particle The particle effect object to translate.
 * @param language The language code to translate the particle attribute to.
 * @param strict If true, it enables strict evaluation for both the effect's id and name, if false, it evaluates by either the id or name.
 * @returns The translated particle attribute that matches the constructor options.
 * @throws An error if no particle effect matches the constructor options.
 */
export function translate(particles: IParticleEffects, particle: Partial<IParticleEffect>, language: LanguageCode, strict: boolean) {
    const effect = find(particles, particle, strict);

    const attributes = getAllAttributesOrThrow(particles, language);
    const attribute = attributes.find(attribute => compareById(attribute, effect.id));

    if (attribute !== undefined) {
        return attribute;
    }

    throw new TranslationError("No translation exists for this particle effect.");
}

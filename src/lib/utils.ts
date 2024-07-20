import type { LanguageCode } from "@mann-conomy/tf-parser";
import LocalizationError from "../classes/errors/localization";
import { LanguageSubtag, LanguageTranslation } from "../resources/enums";
import type { IParticleAttribute, IParticleEffect } from "../types/particle";

/**
 * Checks if the attributes array is udefined or empty.
 * @param attributes An array of particle attributes.
 * @returns True if the attributes array is udefined or empty, otherwise false.
 */
export function isUndefinedOrEmpty(attributes: IParticleAttribute[]): boolean {
    return !(Array.isArray(attributes) && attributes.length > 0);
}

/**
 * Compares a particle attribute's id with the given id.
 * @param attribute A particle attribute object.
 * @param id The id to compare with the particle attribute's id.
 * @returns True if the particle attribute's id matches the given id, otherwise false.
 */
export function compareById(attribute: IParticleAttribute, id: number): boolean {
    return attribute.id === id;
}

/**
 * Retrieves the language translation name for a given language code.
 * @param language The language code to be translated.
 * @returns The translated language name.
 * @throws An error if no translation is found for the specified language code.
 */
export function getLanguageTranslation(language: LanguageCode): string {
    const translations = Object.entries(LanguageTranslation).map(([name, code]) => ({name, code}));

    const translation = translations.find(translation => translation.code.toLowerCase() === language.toLowerCase());

    if (translation !== undefined) {
        return translation.name;
    }

    throw new LocalizationError("No translation exists for the provided language code.");
}

/**
 * Retrieves the language subtag for a given translation.
 * @param translation The translation of the language to be retrieved.
 * @returns The language subtag corresponding to the translation.
 * @throws An error if no language subtag is found matching the provided translation.
 */
export function getLanguageSubtag(translation: string): string {
    const languageTags = Object.entries(LanguageSubtag).map(([name, subtag]) => ({name, subtag}));

    const languageTag = languageTags.find(subtag => subtag.name.toLowerCase() === translation.toLowerCase());

    if (languageTag !== undefined) {
        return languageTag.subtag;
    }

    throw new LocalizationError("No language subtag was found matching the provided language code.");
}

/**
 * Compares a particle attribute's id or name with the given id or name.
 * @param attribute A particle attribute object.
 * @param id The id to compare with the particle attribute's id.
 * @param name The name to compare with the particle attribute's name.
 * @returns True if the particle attribute's id or name matches the given id or name, otherwise false.
 */
export function compareByIdOrName(attribute: IParticleAttribute, effect: IParticleEffect): boolean {
    const translation = getLanguageTranslation(effect.language);
    const subtag = getLanguageSubtag(translation);
    
    return attribute.id === effect.id || attribute.name.toLocaleLowerCase(subtag) === effect.name.toLocaleLowerCase(subtag);
}

/**
 * Compares a particle attribute's id and name with the given id and name.
 * @param attribute A particle attribute object.
 * @param effect The id to compare with the particle attribute's id.
 * @returns True if both the particle attribute's id and name matches the given id and name, otherwise false.
 */
export function compareByIdAndName(attribute: IParticleAttribute, effect: IParticleEffect): boolean {
    const translation = getLanguageTranslation(effect.language);
    const subtag = getLanguageSubtag(translation);

    return attribute.id === effect.id && attribute.name.toLocaleLowerCase(subtag) === effect.name.toLocaleLowerCase(subtag);
}

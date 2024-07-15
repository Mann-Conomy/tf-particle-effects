import { InvalidParticle } from "../resources/enums";
import { LanguageTranslation, type LanguageCode } from "@mann-conomy/tf-parser";
import type { IParticleEffect, IParticleAttribute, IParticleEffects } from "../types/particle";
import { compareById, compareByIdAndName, compareByIdOrName, isAttributesArray } from "../lib/utils";

/**
 * Represents a generic Particle Effect from the Team Fortress 2 game files.
 */
export default class ParticleEffect {
    private readonly id: number;
    private readonly name: string;
    private readonly language: LanguageCode;
    private readonly particles: IParticleEffects;
    private readonly attributes: IParticleAttribute[];

    /**
     * Creates a new instance of ParticleEffect.
     * @param effect The Particle Effect object.
     * @param particles An array of ParticleEffect objects.
     */
    constructor(effect: Partial<IParticleEffect> = {}, particles: IParticleEffects) {        
        this.id = effect.id || InvalidParticle.Id;
        this.name = effect.name || InvalidParticle.Name;
        this.language = effect.language || LanguageTranslation.English;

        this.particles = particles;
        this.attributes = particles[this.language];
    }

    /**
     * Evaluates the particle effect based on the provided strictness.
     * @param strict If true, it enables strict evaluation for both the effect's id and name, if false, it evaluates by either the id or name.
     * @returns True if a matching particle attribute is found, otherwise false.
     * @throws An error if the language code is invalid or not supported.
     */
    eval(strict = false): boolean {
        if (isAttributesArray(this.attributes)) {
            if (strict) {
                return this.attributes.some(attribute => compareByIdAndName(attribute, this.json()));
            }
    
            return this.attributes.some(attribute => compareByIdOrName(attribute, this.json()));
        }

        throw new Error("No particle effect was found matching the provided language code.");
    }

    /**
     * Finds a particle attribute based on the constructor options.
     * @param strict If true, it enables strict evaluation for both the effect's id and name, if false, it evaluates by either the id or name.
     * @returns The particle attribute that matches the constructor options.
     * @throws An error if the language is not supported, the particle effect is too new, or if no particle effect matches the constructor options.
     */
    find(strict = false): IParticleAttribute {
        if (isAttributesArray(this.attributes)) {
            if (strict) {
                const attribute = this.attributes.find(attribute => compareByIdAndName(attribute, this.json()));

                if (attribute !== undefined) {
                    return attribute;
                }

                throw new Error("No particle effect was found with the specified id and name.");
            }
    
            const attribute = this.attributes.find(attribute => compareByIdOrName(attribute, this.json()));

            if (attribute !== undefined) {
                return attribute;
            }

            throw new Error("No particle effect was found with the specified id or name.");
        }

        throw new Error("No particle effects were found matching the provided language code.");
    }

    /**
     * Translates a particle attribute to the specified language.
     * @param language The language code to translate the particle attribute to.
     * @param strict If true, it enables strict evaluation for both the effect's id and name, if false, it evaluates by either the id or name.
     * @returns The translated particle attribute that matches the constructor options.
     * @throws An error if the language is not supported or if no particle effect matches the constructor options.
     */
    translate(language: LanguageCode, strict = false): IParticleAttribute {
        if (isAttributesArray(this.attributes)) {
            const particle = this.find(strict);
    
            const attribute = this.particles[language].find(attribute => compareById(attribute, particle.id));
    
            if (attribute !== undefined) {
                return attribute;
            }

            throw new Error("No translation exists for this particle effect.");
        }

        throw new Error("No particle effects were found matching the provided language code.");
    }

    /**
     * Gets all the Particle Effects currently available in Team Fortress 2.
     * @returns An array of particle attributes for each particle effect in Team Fortress 2.
     * @throws An error if the language code is invalid or not supported.
     */
    all(): IParticleAttribute[] {
        if (isAttributesArray(this.attributes)) {
            return this.attributes;
        }

        throw new Error("No particle effects were found matching the provided language code.");
    }

    /**
     * Gets the ParticleEffect's in-game ID.
     * @returns The in-game ID of the ParticleEffect.
     */
    getId(): number {
        return this.id;
    }

    /**
     * Gets the ParticleEffect's in-game name.
     * @returns The in-game name of the ParticleEffect.
     */
    getName(): string {
        return this.name;
    }

    /**
     * Gets the current language code for the ParticleEffect's name.
     * @returns The ParticleEffect's current language code.
     */
    getLanguage(): LanguageCode {
        return this.language;
    }

    /**
     * Converts the ParticleEffect to a JSON object.
     * @returns The JSON representation of the ParticleEffect.
     */
    json(): IParticleEffect {
        return {
            id: this.id,
            name: this.name,
            language: this.language
        };
    }

    /**
     * Converts the ParticleEffect to a JSON string.
     * @returns The JSON string representation of the ParticleEffect.
     */
    stringify(): string {
        return JSON.stringify(this.json());
    }

    /**
     * Converts the ParticleEffect to a string.
     * @returns The string representation of the ParticleEffect.
     */
    toString(): string {
        return [this.id, this.name, this.language].join(";");
    }

    /**
     * Creates a copy of the current ParticleEffect instance.
     * @returns A new ParticleEffect instance with the same properties as the current instance.
     */
    copy(): ParticleEffect {
        return new ParticleEffect(this.json(), this.particles);
    }
}
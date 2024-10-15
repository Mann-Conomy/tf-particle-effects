import NotFoundError from "./errors/not-found";
import { isUndefinedOrEmpty } from "../lib/utils";
import type { LanguageCode } from "@mann-conomy/tf-parser";
import { InvalidParticle, LanguageTranslation } from "../resources/enums";
import { evaluate, find, getAllAttributesOrThrow, translate } from "../lib/shared";
import type { IParticleEffect, IParticleAttribute, IParticleEffects, PartialParticleEffect } from "../types/particle";

/**
 * Represents a generic Particle effect from the Team Fortress 2 game files.
 */
export default class ParticleEffect {
    private readonly id: number;
    private readonly name: string;
    private readonly language: LanguageCode;
    private readonly particles: IParticleEffects;

    /**
     * Creates a new instance of ParticleEffect.
     * @param effect The Particle effect object.
     * @param particles An array of ParticleEffect objects.
     */
    constructor(effect: PartialParticleEffect = {}, particles: IParticleEffects) {
        this.particles = particles;
        this.id = effect.id || InvalidParticle.Id;
        this.name = effect.name || InvalidParticle.Name;
        this.language = effect.language || LanguageTranslation.English;

        if (isUndefinedOrEmpty(this.particles[this.language])) {
            throw new NotFoundError("No particle effects were found matching the provided language code.");
        }
    }

    /**
     * Evaluates the particle effect based on the provided strictness.
     * @param strict If true, it enables strict evaluation for both the effect's id and name, if false, it evaluates by either the id or name.
     * @returns True if a matching particle attribute is found, otherwise false.
     */
    eval(strict = false): boolean {
        return evaluate(this.particles, this.json(), strict);
    }

    /**
     * Finds a particle attribute based on the specified options.
     * @param strict If true, it enables strict evaluation for both the effect's id and name, if false, it evaluates by either the id or name.
     * @returns The particle attribute that matches the specified options.
     * @throws An error if the particle effect is too new or if no particle effect was found with the specified options.
     */
    find(strict = false): IParticleAttribute {
        return find(this.particles, this.json(), strict);
    }

    /**
     * Translates a particle attribute to the specified language.
     * @param language The language code to translate the particle attribute to.
     * @param strict If true, it enables strict evaluation for both the effect's id and name, if false, it evaluates by either the id or name.
     * @returns The translated particle attribute that matches the constructor options.
     * @throws An error if no particle effect matches the constructor options.
     */
    translate(language: LanguageCode, strict = false): IParticleAttribute {
        return translate(this.particles, this.json(), language, strict);
    }

    /**
     * Gets all the Particle effects currently available in Team Fortress 2.
     * @returns An array of particle attributes for each particle effect in Team Fortress 2.
     */
    all(): IParticleAttribute[] {
        return getAllAttributesOrThrow(this.particles, this.language);
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

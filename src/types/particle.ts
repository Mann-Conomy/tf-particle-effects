import type { LanguageCode } from "@mann-conomy/tf-parser";
import type ParticleAttribute from "../classes/particle-attribute";

/**
 * A filter function for particle attributes.
 * @param attribute The attribute to be checked.
 * @returns True if the attribute passes the filter, otherwise false.
 */
export type ParticleAttributeFilter = (attribute: string) => boolean;

/**
 * Represents a Particle Attribute from the Team Fortress 2 game files.
 */
export interface IParticleAttribute {
    /**
     * The unique identifier for the particle attribute.
     */
    id: number;
    /**
     * The in-game name of the particle attribute.
     */
    name: string;
}

/**
 * Represents a Particle Effect from the Team Fortress 2 game files.
 */
export interface IParticleEffect extends IParticleAttribute {
    /**
     * The language code for the particle effect.
     */
    language: LanguageCode;
}

/**
 * A partial representation of a particle effect object.
 */
export type PartialParticleEffect = Partial<IParticleEffect>;

/**
 * A record of particle attribute classes indexed by Steam language codes.
 */
export type ParticleEffects = Record<LanguageCode, ParticleAttribute[]>;

/**
 * A record of particle attribute objects indexed by Steam language codes.
 */
export type IParticleEffects = Record<LanguageCode, IParticleAttribute[]>;

/**
 * Represents a JSON file containing multiple particle effects.
 */
export interface IParticleFile {
    /**
     * The name of the JSON file.
     */
    name: string;
    /**
     * The particle effects contained in the JSON file, indexed by Steam language codes.
     */
    effects: ParticleEffects;
    /**
     * A filter function to determine which attributes to include.
     */
    filter: ParticleAttributeFilter;
}

/**
 * An array of particle effects stored in JSON files.
 */
export type ParticleFileArray = IParticleFile[];

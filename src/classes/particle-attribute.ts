import type { IParticleAttribute } from "../types/particle";

/**
 * Represents a Particle Attribute from the Team Fortress 2 game files.
 */
export default class ParticleAttribute {
    private readonly id: number;
    private readonly name: string;

    /**
     * Creates a new instance of ParticleAttribute.
     * @param id The ParticleAttribute's in-game ID.
     * @param name The ParticleAttribute's in-game name.
     */
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    /**
     * Gets the ParticleAttribute's in-game ID.
     * @returns The in-game ID of the ParticleAttribute.
     */
    getId(): number {
        return this.id;
    }

    /**
     * Gets the ParticleAttribute's in-game name.
     * @returns The in-game name of the ParticleAttribute.
     */
    getName(): string {
        return this.name;
    }

    /**
     * Converts the ParticleAttribute to a JSON object.
     * @returns The JSON representation of the ParticleAttribute.
     */
    json(): IParticleAttribute {
        return {
            id: this.id,
            name: this.name
        };
    }

    /**
     * Converts the ParticleAttribute to a JSON string.
     * @returns The JSON string representation of the ParticleAttribute.
     */
    stringify(): string {
        return JSON.stringify(this);
    }

    /**
     * Converts the ParticleAttribute to a string.
     * @returns The string representation of the ParticleAttribute.
     */
    toString(): string {
        return [this.id, this.name].join(";");
    }

    /**
     * Creates a copy of the current ParticleAttribute instance.
     * @returns A new ParticleAttribute instance with the same properties as the current instance.
     */
    copy() {
        return new ParticleAttribute(this.id, this.name);
    }
}

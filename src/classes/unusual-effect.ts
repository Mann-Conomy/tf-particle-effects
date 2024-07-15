import ParticleEffect from "./particle-effect";
import type { PartialParticleEffect } from "../types/particle";
import UnusualEffects from "../resources/particles/unusuals.json";

/**
 * Represents an Unusual Effect from the Team Fortress 2 game files.
 */
export default class UnusualEffect extends ParticleEffect {
    /**
     * Creates a new instance of UnusualEffect.
     * @param effect The Unusual Effect object.
     */
    constructor(effect: PartialParticleEffect = {}) {
        super(effect, UnusualEffects);
    }
}

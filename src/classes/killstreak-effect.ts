import ParticleEffect from "./particle-effect";
import type { PartialParticleEffect } from "../types/particle";
import KillstreakEffects from "../resources/particles/killstreaks.json";

/**
 * Represents a Killstreak Effect from the Team Fortress 2 game files.
 */
export default class KillstreakEffect extends ParticleEffect {
    /**
     * Creates a new instance of KillstreakEffect.
     * @param effect The Killstreak Effect object.
     */
    constructor(effect: PartialParticleEffect = {}) {
        super(effect, KillstreakEffects);
    }
}

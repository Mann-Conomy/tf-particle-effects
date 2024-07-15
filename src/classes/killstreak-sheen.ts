import ParticleEffect from "./particle-effect";
import type { PartialParticleEffect } from "../types/particle";
import KillstreakSheens from "../resources/particles/sheens.json";

/**
 * Represents a Killstreak Sheen from the Team Fortress 2 game files.
 */
export default class KillstreakSheen extends ParticleEffect {
    /**
     * Creates a new instance of KillstreakSheen.
     * @param effect The Killstreak Sheen object.
     */
    constructor(effect: PartialParticleEffect = {}) {
        super(effect, KillstreakSheens);
    }
}

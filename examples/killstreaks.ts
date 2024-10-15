import type { IParticleEffect } from "../src/types/particle";
import KillstreakSheen from "../src/classes/killstreak-sheen";
import KillstreakEffect from "../src/classes/killstreak-effect";

(async () => {
    try {
        // Create new Killstreak effects to represent a Professional Killstreak Kit
        const sheen = new KillstreakSheen({ id: 5 });
        const effect: Partial<IParticleEffect> = { id: 2006 };

        // Evaluate the particle effects based on the provided ids
        if (sheen.eval() && KillstreakEffect.eval(effect)) {
            const killstreakSheen = sheen.find();
            const killstreakEffect = KillstreakEffect.find(effect);

            /**
             * Killstreaker: Singularity
             * Sheen: Agonizing Emerald
             * Killstreaks Active
             */
            console.log(`Killstreaker: ${killstreakEffect.name}\nSheen: ${killstreakSheen.name}\nKillstreaks Active`);
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error processing effect", error.message);
        }
    }
})();

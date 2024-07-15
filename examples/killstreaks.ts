import KillstreakSheen from "../src/classes/killstreak-sheen";
import KillstreakEffect from "../src/classes/killstreak-effect";

(async () => {
    try {
        // Create new Killstreak effects to represent a Professional Killstreak
        const sheen = new KillstreakSheen({ id: 5 });
        const effect = new KillstreakEffect({ id: 2006 });

        // Evaluate the particle effects based on the provided ids
        if (sheen.eval() && effect.eval()) {
            const killstreakSheen = sheen.find();
            const killstreakEffect = effect.find();

            /**
             * Killstreaker: Singularity
             * Sheen: Agonizing Emerald
             * Killstreaks Active
             */
            console.log(`Killstreak: ${killstreakEffect.name}\nSheen: ${killstreakSheen.name}\nKillstreaks Active`);
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error processing effect", error.message);
        }
    }
})();

import UnusualEffect from "../src/classes/unusual-effect";

try {
    // Create a new Unusual Effect to represent Burning Flames
    const effect = new UnusualEffect({ id: 13 });

    // Evaluate the particle effect based on the provided id
    if (effect.eval()) {
        // Retrieve the effect's particle name
        const { name } = effect.find();

        console.log(name, "Team Captain"); // Burning Flames Team Captain
    }
} catch (error: unknown) {
    if (error instanceof Error) {
        console.error("Error processing Unusual effect", error.message);
    }
}

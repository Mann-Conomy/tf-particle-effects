import "dotenv/config";
import { join } from "path";
import { glob } from "glob";
import { readFile, writeFile } from "fs/promises";
import { LanguageParser } from "@mann-conomy/tf-parser";
import ParticleAttribute from "../src/classes/particle-attribute";
import type { ParticleAttributeFilter, ParticleFileArray } from "../src/types/particle";

/**
 * Gets the path to the Team Fortress 2 resource folder.
 * @returns The path to the Team Fortress 2 resource folder.
 * @throws An error if the resource path is not defined.
 */
function getResourcePath() {
    const path = process.env.TF_RESOURCE_PATH;

    if (path !== undefined) {
        return path;
    }

    throw new Error("The resource path is not defined.");
}

/**
 * Extracts the particle attribute id from a given string.
 * @param attribute A particle attribute string.
 * @returns The path to the Team Fortress 2 resource folder.
 * @throws An error if no numeric id is found in the string.
 */
function getAttributeParticleId(attribute: string) {
    const matches = attribute.match(/\d+/g);

    if (Array.isArray(matches) && matches.length > 0) {
        const [attributeId] = matches;

        return parseInt(attributeId);
    }

    throw new Error("The particle effect does not contain a valid id.");
}

/**
 * Checks if the given attribute string matches the pattern for an Unusual Effect.
 * @param attribute A particle attribute string.
 * @returns True if the attribute matches the Unusual Effect pattern, otherwise false.
 */
function isUnusualEffect(attribute: string): boolean {
    return /^Attrib_Particle\d+$/.test(attribute);
}

/**
 * Checks if the given attribute string matches the pattern for an Killstreak Effect.
 * @param attribute A particle attribute string.
 * @returns True if the attribute matches the Killstreak Effect pattern, otherwise false.
 */
function isKillstreakEffect(attribute: string): boolean {
    return /^Attrib_KillStreakEffect\d+$/.test(attribute);
}

/**
 * Checks if the given attribute string matches the pattern for an Killstreak Sheen.
 * @param attribute A particle attribute string.
 * @returns True if the attribute matches the Killstreak Sheen pattern, otherwise false.
 */
function isKillstreakSheen(attribute: string): boolean {
    return /^Attrib_KillStreakIdleEffect\d+$/.test(attribute);
}

/**
 * Retrieves files that match the language pattern from the resource directory.
 * @returns A promise that resolves to an array of language file names.
 */
async function getLanguageFiles() {
    const cwd = getResourcePath();
    const files = await glob("tf_*.txt", { cwd, ignore: ["tf_korean.txt"] });

    return files.filter(file => /^tf_[a-zA-Z0-9]+\.txt$/.test(file));
}

/**
 * Reads the contents of a specified language file.
 * @param base The base name of the language file to read.
 * @returns A promise that resolves to the contents of the language file.
 */
async function readLanguageFile(base: string) {
    const root = getResourcePath();
    const path = join(root, base);

    return await readFile(path, "utf16le");
}

/**
 * Writes an array of particle files to the specified directory.
 * @param particles An array of particle files.
 * @returns A promise that resolves when all files have been saved.
 */
async function writeParticleFiles(particles: ParticleFileArray) {
    for (const particle of particles) {
        const basename = particle.name.concat(".json");
        const path = join(process.cwd(), "src/resources/particles", basename);

        await writeFile(path, JSON.stringify(particle.effects), "utf8");
    }
}

/**
 * Creates a new empty JavaScript object.
 * @returns An empty JavaScript object.
 */
function createObject() {
    return Object.create(Object.prototype);
}

/**
 * Retrieves particle attributes based on the provided tokens and filter.
 * @param tokens An object containing key-value pairs where keys are tokens and values are the corresponding translations.
 * @param filter A filter function to determine which attributes to include.
 * @returns An array of ParticleAttribute objects.
 */
function getParticleAttributes(tokens: Record<string, string>, filter: ParticleAttributeFilter) {
    const attributes = Object.entries(tokens).filter(([attribute]) => filter(attribute)).map(([attribute, name]) => {
        const id = getAttributeParticleId(attribute);

        return new ParticleAttribute(id, name);
    });

    return attributes.filter(attribute => attribute.getId() > 0 && attribute.getName().length > 0);
}

/**
 * Creates an array of configurations for each type of particle effect.
 * @returns An array of particle file configurations.
 */
function createParticleFiles(): ParticleFileArray {
    return [
        {
            name: "unusuals",
            effects: createObject(),
            filter: isUnusualEffect
        },
        {
            name: "killstreaks",
            effects: createObject(),
            filter: isKillstreakEffect
        },
        {
            name: "sheens",
            effects: createObject(),
            filter: isKillstreakSheen
        }
    ];
}

/**
 * Updates the particle files by parsing Team Fortress 2 language files using tf-parser.
 * @returns A promise that resolves when all particle files have been saved.
 */
(async () => {
    const languageFiles = await getLanguageFiles();

    const particles = createParticleFiles();

    for (const languageFile of languageFiles) {
        const file = await readLanguageFile(languageFile);

        const { lang } = LanguageParser.parse(file);

        for (const particle of particles) {
            particle.effects[lang.Language] = getParticleAttributes(lang.Tokens, particle.filter);
        }
    }

    await writeParticleFiles(particles);
})();

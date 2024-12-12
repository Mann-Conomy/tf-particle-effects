import { describe, expect, test } from "@jest/globals";
import UnusualEffect from "../src/classes/unusual-effect";
import type { LanguageCode } from "@mann-conomy/tf-parser";
import ParticleEffect from "../src/classes/particle-effect";
import NotFoundError from "../src/classes/errors/not-found";
import KillstreakSheen from "../src/classes/killstreak-sheen";
import KillstreakEffect from "../src/classes/killstreak-effect";
import unusuals from "../src/resources/particles/unusuals.json";
import TranslationError from "../src/classes/errors/translation";
import ParticleAttribute from "../src/classes/particle-attribute";

describe("ParticleEffect", () => {
    test("should return default values if the effect object is undefined", () => {
        // Arrange
        const options = undefined;
        const effect = new ParticleEffect(options, unusuals);

        // Act
        const id = effect.getId();
        const name = effect.getName();
        const language = effect.getLanguage();

        // Assert
        expect(id).toBe(0);
        expect(name).toBe("Not specified");
        expect(language).toBe("English");
    });

    test("copy should return a copy of the current ParticleEffect instance", () => {
        // Arrange
        const effect = new ParticleEffect({ id: 8, language: "dutch" }, unusuals);

        // Act
        const clone = effect.copy();
        const { id, name } = clone.find();

        // Assert
        expect(id).toBe(8);
        expect(name).toBe("Griezelige Geesten");
        expect(clone.getLanguage()).toBe("dutch");
    });

    test("toString should return the particle's id, name and language joined by a semicolon", () => {
        // Arrange
        const effect = new ParticleEffect({ id: 13, name: "Burning Flames" }, unusuals);

        // Act
        const result = effect.toString();

        // Assert
        expect(result).toBe("13;Burning Flames;English");
    });
});

describe("UnusualEffect", () => {
    test("a new effect should be an instance of UnusualEffect and ParticleEffect", () => {
        // Arrange
        const effect = new UnusualEffect();

        // Act and assert
        expect(effect).toBeInstanceOf(UnusualEffect);
        expect(effect).toBeInstanceOf(ParticleEffect);
    });

    test("should find the particle attributes by the Unusual Effect's name", () => {
        // Arrange
        const effect = new UnusualEffect({ name: "Anti-Freeze" });

        // Act
        const attributes = effect.find();

        // Assert
        expect(attributes.id).toBe(69);
        expect(attributes.name).toBe("Anti-Freeze");
    });

    test("should throw if searching with only one paramter and strict mode is enabled", () => {
        // Arrange
        const effect = new UnusualEffect({ id: 69 });

        // Act and assert
        expect(() => effect.find(true)).toThrow(NotFoundError);
        expect(() => UnusualEffect.find(effect.json(), true)).toThrow(NotFoundError);
    });

    test("should find the particle attributes with strict mode enabled", () => {
        // Arrange
        const effect = new UnusualEffect({ id: 69, name: "Anti-Freeze" });

        // Act
        const first = effect.find(true);
        const second = UnusualEffect.find(effect.json(), true);

        // Assert
        expect([first.id, second.id]).toAllBe(69);
        expect([first.name, second.name]).toAllBe("Anti-Freeze");
    });

    test("should throw when find is called without any constructor parameters", () => {
        // Arrange
        const effect = new UnusualEffect();
        const empty = Object.create(Object.prototype);

        // Act and assert
        expect(() => effect.find()).toThrow(NotFoundError);
        expect(() => UnusualEffect.find(empty)).toThrow(NotFoundError);
    });

    test("eval should return true if the name matches a known Unusual Effect", () => {
        // Arrange
        const effect = new UnusualEffect({ name: "Burning Flames" });

        // Act
        const first = effect.eval();
        const second = UnusualEffect.eval(effect.json());

        // Assert
        expect([first, second]).toAllBe(true);
    });

    test("should translate Flaming Lantern to Dutch", () => {
        // Arrange
        const effect = new UnusualEffect({ name: "Flaming Lantern" });

        // Act
        const first = effect.translate("dutch");
        const second = UnusualEffect.translate(effect.json(), "dutch");

        // Assert
        expect([first.name, second.name]).toAllBe("Vlammende Lantaarn");
    });

    test("translate should throw if no constructor parameters is given", () => {
        // Arrange
        const effect = new UnusualEffect();

        // Act and assert
        expect(() => effect.translate("dutch")).toThrow(NotFoundError);
        expect(() => UnusualEffect.translate(effect.json(), "dutch")).toThrow(NotFoundError);
    });

    test("all should return all the Unusual effects", () => {
        // Arrange
        const effect = new UnusualEffect();

        // Act
        const first = effect.all();
        const second = UnusualEffect.all(effect.getLanguage());

        // Assert
        expect([first.length, second.length]).toAllBe(545);
    });
});

describe("KillstreakEffect", () => {
    test("a new effect should be an instance of KillstreakEffect and ParticleEffect", () => {
        // Arrange
        const effect = new KillstreakEffect();

        // Act and assert
        expect(effect).toBeInstanceOf(KillstreakEffect);
        expect(effect).toBeInstanceOf(ParticleEffect);
    });

    test("should throw if the id results in an invalid Killstreak Effect", () => {
        // Arrange
        const effect = new KillstreakEffect({ id: 11 });

        // Assert and act
        expect(() => effect.find()).toThrow(NotFoundError);
        expect(() => KillstreakEffect.find(effect.json())).toThrow(NotFoundError);
    });

    test("should return all the Killstreak effects", () => {
        // Arrange
        const effect = new KillstreakEffect();

        // Act
        const first = effect.all();
        const second = KillstreakEffect.all("English");

        // Assert
        expect([first.length, second.length]).toAllBe(7);
    });

    test("eval should return true if the name matches a known Killstreak Effect", () => {
        // Arrange
        const effect = new KillstreakEffect({ name: "Tornado" });

        // Act
        const first = effect.eval();
        const second = KillstreakEffect.eval(effect.json());

        // Assert
        expect([first, second]).toAllBe(true);
    });

    test("translate should throw an error if no translation exists", () => {
        // Arrange
        const effect = new KillstreakEffect({ id: 2004 });

        // Act and assert
        expect(() => effect.translate("pirate")).toThrow(TranslationError);
        expect(() => KillstreakEffect.translate(effect.json(), "pirate")).toThrow(TranslationError);
    });

    test("should throw if the language code is ", () => {
        // Arrange
        const language = "indonesian" as LanguageCode;

        // Act and assert
        expect(() => new KillstreakEffect({ language })).toThrow(NotFoundError);
    });
});

describe("KillstreakSheen", () => {
    test("getters should return the Killstreak Sheen's id, name and associated language", () => {
        // Arrange
        const sheen = new KillstreakSheen({ id: 3, name: "Manndarin" });

        // Act
        const id = sheen.getId();
        const name = sheen.getName();
        const language = sheen.getLanguage();

        // Assert
        expect(id).toBe(3);
        expect(name).toBe("Manndarin");
        expect(language).toBe("English");
    });

    test("json should return the Killstreak Sheen's id, name and associated language", () => {
        // Arrange
        const sheen = new KillstreakSheen({ id: 1, name: "Team Shine" });

        // Act
        const result = sheen.json();

        // Assert
        expect(result.id).toBe(1);
        expect(result.name).toBe("Team Shine");
        expect(result.language).toBe("English");
    });

    test("stringify should return the Killstreak Sheen as a JSON string", () => {
        // Arrange
        const sheen = new KillstreakSheen({ id: 7, name: "Hot Rod" });

        // Act
        const result = sheen.stringify();

        // Assert
        expect(result).toBe(JSON.stringify(sheen.json()));
    });

    test("eval should return false without any constructor parameters", () => {
        // Arrange
        const sheen = new KillstreakSheen();

        // Act
        const result = sheen.eval();

        // Assert
        expect(result).toBe(false);
    });

    test("eval should return true if the name matches a known Killstreak Sheen", () => {
        // Arrange
        const sheen = new KillstreakSheen({ name: "Deadly Daffodil" });

        // Act
        const first = sheen.eval();
        const second = KillstreakSheen.eval(sheen.json());

        // Assert
        expect([first, second]).toAllBe(true);
    });

    test("eval should return true if the id and name matches a known Killstreak Sheen", () => {
        // Arrange
        const sheen = new KillstreakSheen({ id: 7, name: "Hot Rod" });

        // Act
        const first = sheen.eval(true);
        const second = KillstreakSheen.eval(sheen.json(), true);

        // Assert
        expect([first, second]).toAllBe(true);
    });

    test("eval should return false if only one constructor parameter is given in strict mode", () => {
        // Arrange
        const sheen = new KillstreakSheen({ id: 3 });

        // Act
        const first = sheen.eval(true);
        const second = KillstreakSheen.eval(sheen.json(), true);

        // Assert
        expect([first, second]).toAllBe(false);
    });

    test("find should throw if the id results in an invalid Killstreak Sheen", () => {
        // Arrange
        const sheen = new KillstreakSheen({ id: 17 });

        // Assert and act
        expect(() => sheen.find()).toThrow(NotFoundError);
        expect(() => KillstreakSheen.find(sheen.json())).toThrow(NotFoundError);
    });

    test("should translate Team Shine to Dutch", () => {
        // Arrange
        const sheen = new KillstreakSheen({ name: "Team Shine" });

        // Act
        const first = sheen.translate("dutch");
        const second = KillstreakSheen.translate(sheen.json(), "dutch");

        // Assert
        expect([first.name, second.name]).toAllBe("Teamglans");
    });

    test("translate should throw if no constructor parameters is given", () => {
        // Arrange
        const sheen = new KillstreakSheen();

        // Act and assert
        expect(() => sheen.translate("dutch")).toThrow(NotFoundError);
        expect(() => KillstreakSheen.translate(sheen.json(), "dutch")).toThrow(NotFoundError);
    });

    test("translate should throw if only one constructor parameter is given in strict mode", () => {
        // Arrange
        const sheen = new KillstreakSheen({ name: "Team Shine" });

        // Act and assert
        expect(() => sheen.translate("dutch", true)).toThrow(NotFoundError);
        expect(() => KillstreakSheen.translate(sheen.json(), "dutch", true)).toThrow(NotFoundError);
    });

    test("should translate Team Shine to Danish in strict mode", () => {
        // Arrange
        const sheen = new KillstreakSheen({ id: 1, name: "Team Shine" });

        // Act
        const first = sheen.translate("danish", true);
        const second = KillstreakSheen.translate(sheen.json(), "danish", true);

        expect([first.id, second.id]).toAllBe(1);
        expect([first.name, second.name]).toAllBe("Holdglans");
    });

    test("should return all the Killstreak sheens", () => {
        // Arrange
        const effect = new KillstreakSheen();

        // Act
        const first = effect.all();
        const second = KillstreakSheen.all(effect.getLanguage());

        // Assert
        expect([first.length, second.length]).toAllBe(7);
    });

    test("should find the particle attributes with strict mode enabled", () => {
        // Arrange
        const sheen = new KillstreakSheen({ id: 3, name: "Manndarin" });

        // Act
        const first = sheen.find(true);
        const second = KillstreakSheen.find(sheen.json(), true);

        // Assert
        expect([first.id, second.id]).toAllBe(3);
        expect([first.name, second.name]).toAllBe("Manndarin");
    });
});

describe("ParticleAttribute", () => {
    test("getters should the return the id and name", () => {
        // Arrange
        const particle = new ParticleAttribute(5, "Agonizing Emerald");

        // Act
        const id = particle.getId();
        const name = particle.getName();

        // Assert
        expect(id).toBe(5);
        expect(name).toBe("Agonizing Emerald");
    });

    test("json should return a JSON object representation of the particle", () => {
        // Arrange
        const particle = new ParticleAttribute(703, "Cool");

        // Act
        const result = particle.json();

        // Assert
        expect(result.id).toBe(703);
        expect(result.name).toBe("Cool");
    });

    test("stringify should return a JSON string representation of the particle", () => {
        // Arrange
        const particle = new ParticleAttribute(2006, "Singularity");

        // Act
        const result = particle.stringify();

        // Assert
        expect(result).toBe(JSON.stringify(particle));
    });

    test("toString should return the particle's id and name joined by a semicolon", () => {
        // Arrange
        const particle = new ParticleAttribute(14, "Scorching Flames");

        // Act
        const result = particle.toString();

        // Assert
        expect(result).toBe("14;Scorching Flames");
    });

    test("copy should return a copy of the current ParticleAttribute instance", () => {
        // Arrange
        const particle = new ParticleAttribute(14, "Scorching Flames");

        // Act
        const result = particle.copy();

        // Assert
        expect(result.getId()).toBe(14);
        expect(result.getName()).toBe("Scorching Flames");
    });
});

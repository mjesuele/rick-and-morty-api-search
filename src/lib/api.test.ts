import { getAllCharacters, getCharacterById, getCharactersByIds, getCharactersByName } from "./api";

describe.skip("API client", () => {
  it("fetches all characters", async done => {
    const { results } = await getAllCharacters();
    expect(results[0].name).toBe("Rick Sanchez");
    expect(results[1].name).toBe("Morty Smith");
    expect(results[2].name).toBe("Summer Smith");
    done();
  });

  it("fetches a single character by ID", async done => {
    const morty = await getCharacterById(2);
    expect(morty.name).toBe("Morty Smith");
    done();
  });

  it("fetches multiple characters by ID", async done => {
    const [rick, morty] = await getCharactersByIds([1, 2]);
    expect(rick.name).toBe("Rick Sanchez");
    expect(morty.name).toBe("Morty Smith");
    done();
  });

  it("finds characters by name", async done => {
    const [bethSmith, bethSanchez] = (await getCharactersByName("Beth")).results;
    expect(bethSmith.name).toBe("Beth Smith");
    expect(bethSanchez.name).toBe("Beth Sanchez");
    done();
  });

  it("throws an error when a nonexistent name is entered", () => {
    expect(getCharactersByName("NoNameLikeThisName")).rejects.toMatch("error");
  });
});

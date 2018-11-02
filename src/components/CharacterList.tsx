import React from "react";
import { Character } from "../lib/api";
import CharacterCard from "./CharacterCard";

type CharacterListProps = {
  characters: Character[],
  searchValue: string,
};

export default ({ characters, searchValue }: CharacterListProps) => (
  <div className="character-list">
    {!!characters.length && (
      <>
        <h2>Results for {searchValue}</h2>
        {characters.map(character => (
          <CharacterCard character={character} key={character.id} />
        ))}
      </>
    )}
  </div>
);

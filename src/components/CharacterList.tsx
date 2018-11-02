import React from "react";
import styled from "styled-components";

import { Character } from "../lib/api";
import CharacterCard from "./CharacterCard";

type CharacterListProps = {
  characters: Character[],
  searchValue: string,
};

const CharacterListHeading = styled.h2`
  font-size: 2rem;
`;

const CharacterListBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: auto;
  max-width: 1260px;
  min-height: 40vh;
`;

export default ({ characters, searchValue }: CharacterListProps) => (
  <div>
    {!!characters.length && (
      <>
        <CharacterListHeading>Results for {searchValue}</CharacterListHeading>
        <CharacterListBody>
          {characters.map(character => (
            <CharacterCard character={character} key={character.id} />
          ))}
        </CharacterListBody>
      </>
    )}
  </div>
);

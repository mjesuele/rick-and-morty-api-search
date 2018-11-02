import React from "react";
import styled from "styled-components";

import { Character } from "../lib/api";

type CharacterCardProps = {
  character: Character,
};

const CharacterCard = styled.div`
  background-color: gainsboro;
  border-radius: 10px;
  box-shadow: 3px 3px 25px -5px rgba(0,0,0,0.47);
  color: #1A1A1A;
  display: inline-block;
  margin: 20px 15px;
  max-width: 300px;
  overflow: hidden;
`;

const CharacterName = styled.h3`
  font-size: 1.66rem;
`;

const CharacterData = styled.div`
  padding: 0 15px 10px;
`;

export default ({ character }: CharacterCardProps) => (
  <CharacterCard>
    <img src={character.image} alt={character.name} />
    <CharacterData>
      <CharacterName>{character.name}</CharacterName>
      <p><b>Species</b><br />{character.species}</p>
      <p><b>Gender</b><br />{character.gender}</p>
      <p><b>Status</b><br />{character.status}</p>
      <p><b>From</b><br />{character.origin.name}</p>
      <p><b>Last Location</b><br />{character.location.name}</p>
    </CharacterData>
  </CharacterCard>
);

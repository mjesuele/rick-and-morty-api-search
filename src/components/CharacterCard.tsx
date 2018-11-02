import React from "react";
import { Character } from "../lib/api";

type CharacterCardProps = {
  character: Character,
};

export default ({ character }: CharacterCardProps) => (
  <div className="character">
    <h3>{character.name}</h3>
    <img src={character.image} alt={character.name} />
    <p><b>Species:</b> {character.species}</p>
    <p><b>Gender:</b> {character.gender}</p>
    <p><b>Status:</b> {character.status}</p>
    <p><b>From:</b> {character.origin.name}</p>
    <p><b>Last Location:</b> {character.location.name}</p>
  </div>
);

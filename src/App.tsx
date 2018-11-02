import React, { Component } from "react";
import Loader from "react-loader";

import "./App.css";
import { Character, getCharactersByName } from "./lib/api";
import logger from "./lib/logger";

type AppState = {
  isLoading: boolean,
  results: Character[],
  searchValue: string,
};

class App extends Component<{}, AppState> {
  public state: AppState = {
    isLoading: false,
    results: [],
    searchValue: "",
  };

  public handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({
      searchValue: e.target.value,
    })

  public handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    logger.debug(`submitted with query: ${this.state.searchValue}`);
    const { results } = await getCharactersByName(this.state.searchValue);
    this.setState({ results, isLoading: false });
  }

  public renderResultsSection = () => (
    <div className="results">
      <Loader loaded={!this.state.isLoading}>
        {!!this.state.results.length && <h2>Results</h2>}
        {this.renderCharacters()}
      </Loader>
    </div>
  )

  public renderCharacters = () => this.state.results.map(character => (
    <div className="character" key={character.id}>
      <h3>{character.name}</h3>
      <img src={character.image} alt={character.name} />
      <p><b>Species:</b> {character.species}</p>
      <p><b>Gender:</b> {character.gender}</p>
      <p><b>Status:</b> {character.status}</p>
      <p><b>From:</b> {character.origin.name}</p>
      <p><b>Last Location:</b> {character.location.name}</p>
    </div>
  ))

  public render() {
    return (
      <div className="App">
        <div className="search">
          <h1>Rick and Morty Character Search</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              onChange={this.handleSearchValueChange}
              type="text"
              placeholder="Character Name"
              value={this.state.searchValue}
            />
            <input type="submit" value="Search!" />
          </form>
        </div>
        {this.renderResultsSection()}
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import Loader from "react-loader";

import "./App.css";
import CharacterList from "./components/CharacterList";
import { Character, getCharactersByName } from "./lib/api";
import logger from "./lib/logger";

type AppState = {
  notFound: boolean,
  isLoading: boolean,
  lastSearchValue: string,
  results: Character[],
  searchValue: string,
};

class App extends Component<{}, AppState> {
  public state: AppState = {
    isLoading: false,
    lastSearchValue: "",
    notFound: false,
    results: [],
    searchValue: "",
  };

  public handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({
      searchValue: e.target.value,
    })

  public handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.setState(state => ({ isLoading: true, lastSearchValue: state.searchValue }));
    logger.debug(`submitted with query: ${this.state.searchValue}`);
    getCharactersByName(this.state.searchValue)
      .then(({ results }) => this.setState({ results, notFound: false, isLoading: false }))
      .catch(() => this.setState({ notFound: true, results: [], isLoading: false }));
  }

  public render() {
    const { isLoading, lastSearchValue, notFound, results, searchValue } = this.state;
    return (
      <div className="App">
        <div className="search">
          <h1>Rick and Morty Character Search</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              onChange={this.handleSearchValueChange}
              type="text"
              placeholder="Character Name"
              value={searchValue}
            />
            <input type="submit" value="Search!" />
          </form>
        </div>
        <div className="results">
          <Loader loaded={!isLoading}>
            {notFound
              ? <p className="not-found">No results found for {lastSearchValue}</p>
              : <CharacterList characters={results} searchValue={lastSearchValue} />
            }
          </Loader>
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import Loader from "react-loader";
import styled from "styled-components";

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

const AppContainer = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  color: #19EDE5;
  font-family: GetSchwifty, sans-serif;
  font-size: 3rem;
  text-shadow:
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000,
    0 0 5px #67B60C,
    0 0 10px #67B60C,
    0 0 20px #67B60C;
`;

const SearchSection = styled.div`
  background-color: black;
  color: rgb(245, 245, 245);
  padding: 100px 0;

  h1 {
    margin-bottom: 50px;
    margin-top: 0;
  }
`;

const SearchInput = styled.input`
  border: 0;
  font-size: 1.5rem;
  padding: 10px 25px;
`;

const SearchSubmit = styled(SearchInput)`
  background-color: #00C5BE;
  color: #fff;
  padding-left: 50px;
  padding-right: 50px;
`;

const ResultsSection = styled.div`
  padding: 33px 0 50px;
`;

export default class App extends Component<{}, AppState> {
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
      <AppContainer>
        <SearchSection>
          <Title>Rick and Morty Character Search</Title>
          <form onSubmit={this.handleSubmit}>
            <SearchInput
              onChange={this.handleSearchValueChange}
              type="text"
              placeholder="Character Name"
              value={searchValue}
            />
            <SearchSubmit type="submit" value="Search!" />
          </form>
        </SearchSection>
        <ResultsSection className="results">
          <Loader loaded={!isLoading}>
            {notFound
              ? <p className="not-found">No results found for {lastSearchValue}</p>
              : <CharacterList characters={results} searchValue={lastSearchValue} />
            }
          </Loader>
        </ResultsSection>
      </AppContainer>
    );
  }
}

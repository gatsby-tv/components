import React, { useReducer, useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import "../config/styles.css";

const Container = styled.div.attrs((props) => ({
  className: "gz-search",
}))`
  position: relative;
  max-width: 58rem;
  width: 100%;
  height: 3.6rem;
  z-index: 610;
`;

const SearchBox = styled.div.attrs((props) => ({
  className: "gz-search-content",
  style: {
    boxShadow: props.highlight ? "0 1px 6px 0 black" : "none",
  },
}))`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;

  position: relative;
  min-height: 3.6rem;

  background-color: var(--dark-grey-3);
  border-radius: 1.8rem;

  transition: all 100ms ease;

  &:hover {
    box-shadow: 0 1px 6px 0 black;
  }
`;

const InputBox = styled.div.attrs((props) => ({
  className: "gz-search-input-wrapper",
}))`
  display: flex;
  justify-content: stretch;
  align-items: center;

  height: 3.6rem;
`;

const SearchIcon = styled.div.attrs((props) => ({
  className: "gz-search-icon",
}))`
  display: inline-flex;
  justify-content: center;
  flex-grow: 0;
  flex-shrink: 0;

  width: 4rem;
  font-size: 1.5rem;
  padding: 0;

  color: var(--light-grey-9);
`;

const SearchButton = styled(SearchIcon).attrs((props) => ({
  className: "gz-search-button",
}))`
  cursor: pointer;
  background: transparent;
  border: none;
  outline: none;

  transition: all 100ms ease;

  &:hover {
    color: var(--light-grey-2);
  }
`;

const Input = styled.input.attrs((props) => ({
  className: "gz-search-input",
}))`
  flex-grow: 1;

  padding: 0;
  font-size: 1.5rem;

  color: var(--font-color);
  font-family: sans-serif;
  background: transparent;
  border: none;
  outline: none;
`;

const SuggestionContainer = styled.ul.attrs((props) => ({
  className: "gz-search-suggestion-container",
}))`
  margin: 0;
  padding: 0;

  font-family: sans-serif;
  list-style-type: none;
  border-bottom-left-radius: 1.8rem;
  border-bottom-right-radius: 1.8rem;

  li {
    margin: 0;
    padding: 0.6rem 0 0.6rem 4rem;

    cursor: default;
  }

  li:hover {
    background-color: var(--dark-grey-4);
  }

  a:first-child li:first-child {
    &:before {
      content: "";

      position: absolute;
      top: calc(3.6rem - 1px);
      right: 1.4rem;
      left: 1.4rem;

      border-color: var(--dark-grey-5);
      border-top-width: 1px;
      border-top-style: solid;
    }
  }

  a:last-child li:last-child {
    border-bottom-left-radius: 1.8rem;
    border-bottom-right-radius: 1.8rem;
  }
`;

const Link = styled.a.attrs((props) => ({
  className: "gz-search-link",
}))`
  color: inherit;
  text-decoration: none;
`;

const Suggestion = styled.li.attrs((props) => ({
  className: "gz-search-suggestion",
}))`
  font-size: 1.5rem;
  font-weight: 600;

  b {
    font-weight: 500;
  }
`;

interface FetchAction {
  type: "fetch";
  query: string;
}

interface SyncAction {
  type: "sync";
  suggestions: SuggestionType[];
}

type SearchAction = FetchAction | SyncAction;

type SuggestionType = {
  href: string;
  match: string;
};

type SearchProps = {
  generator: (query: string) => SuggestionType[];
};

const Search: React.FC<SearchProps> = (props) => {
  const [highlight, setHighlight] = useState(false);

  const [state, setState] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "fetch":
          return { ...state, query: action.query, loading: true };

        case "sync":
          return {
            ...state,
            suggestions: Object.assign(state.suggestions, {
              [state.query]: action.suggestions,
            }),
            loading: false,
          };

        default:
          return state;
      }
    },
    { query: "", suggestions: { "": [] }, loading: false }
  );

  useEffect(() => {
    if (!state.loading || state.suggestions[state.query]) {
      return;
    }

    const result = props.generator(state.query);
    setState({ type: "sync", suggestions: result });
  }, [state.loading, state.query, state.suggestions]);

  const suggestions = (state.suggestions[state.query] || []).map(
    (suggestion, index) => (
      <Link key={`${state.query}/${index}`}>
        <Suggestion
          dangerouslySetInnerHTML={{ __html: `${suggestion.match}` }}
        />
      </Link>
    )
  );

  return (
    <Container>
      <SearchBox highlight={highlight}>
        <InputBox>
          <SearchIcon>
            <FontAwesomeIcon icon={faSearch} />
          </SearchIcon>
          <Input
            type="text"
            name="query"
            placeholder="Search"
            aria-label="Search Videos"
            maxLength="2048"
            spellCheck="false"
            autoCorrect="false"
            autoComplete="false"
            onKeyDown={(event) => event.stopPropagation()}
            onChange={(event) =>
              setState({ type: "fetch", query: event.target.value })
            }
            onFocus={() => setHighlight(true)}
            onBlur={() => setHighlight(false)}
          />
          <SearchButton as="button">
            <FontAwesomeIcon icon={faArrowRight} />
          </SearchButton>
        </InputBox>
        <SuggestionContainer>{suggestions}</SuggestionContainer>
      </SearchBox>
    </Container>
  );
};

export { SearchProps };
export default Search;

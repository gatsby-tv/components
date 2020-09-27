import React, { useReducer, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import {
  Container,
  SearchBox,
  InputBox,
  SearchIcon,
  SearchButton,
  Input,
  SuggestionContainer,
  Link,
  Suggestion,
} from "./Styles";

interface FetchAction {
  type: "fetch";
  query: string;
}

interface SyncAction {
  type: "sync";
  suggestions: SuggestionType[];
}

type SearchAction = FetchAction | SyncAction;

interface SuggestionType {
  href: string;
  match: string;
}

interface SearchState {
  query: string;
  suggestions: { [key: string]: SuggestionType[] };
  loading: boolean;
}

export interface SearchProps {
  generator(query: string): SuggestionType[];
}

export const Search: React.FC<SearchProps> = (props) => {
  const [focused, setFocused] = useState<boolean>(false);

  const [state, setState] = useReducer(
    (state: SearchState, action: SearchAction) => {
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
    (suggestion: SuggestionType, index: number) => (
      <Link key={`${state.query}/${index}`}>
        <Suggestion
          dangerouslySetInnerHTML={{ __html: `${suggestion.match}` }}
        />
      </Link>
    )
  );

  return (
    <Container>
      <SearchBox highlight={focused}>
        <InputBox>
          <SearchIcon>
            <FontAwesomeIcon icon={faSearch} />
          </SearchIcon>
          <Input
            type="text"
            name="query"
            placeholder="Search"
            aria-label="Search Videos"
            maxLength={2048}
            spellCheck="false"
            autoCorrect="false"
            autoComplete="false"
            onKeyDown={(event) => event.stopPropagation()}
            onChange={(event) =>
              setState({ type: "fetch", query: event.target.value })
            }
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          <SearchButton>
            <FontAwesomeIcon icon={faArrowRight} />
          </SearchButton>
        </InputBox>
        {focused && <SuggestionContainer>{suggestions}</SuggestionContainer>}
      </SearchBox>
    </Container>
  );
};

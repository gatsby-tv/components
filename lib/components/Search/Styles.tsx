import styled from "styled-components";

export const Container = styled.div.attrs((props) => ({
  className: "gz-search",
}))`
  position: relative;
  max-width: 58rem;
  width: 100%;
  height: 3.6rem;
  z-index: 610;
`;

interface SearchBoxProps {
  highlight?: boolean;
}

export const SearchBox = styled.div.attrs<SearchBoxProps>((props) => ({
  className: "gz-search-content",
}))<SearchBoxProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;

  position: relative;
  min-height: 3.6rem;

  background-color: var(--dark-grey-3);
  border-radius: 1.8rem;
  box-shadow: ${(props) => (props.highlight ? "0 1px 6px 0 black" : "none")};

  transition: all 100ms ease;

  &:hover {
    box-shadow: 0 1px 6px 0 black;
  }
`;

export const InputBox = styled.div.attrs((props) => ({
  className: "gz-search-input-wrapper",
}))`
  display: flex;
  justify-content: stretch;
  align-items: center;

  height: 3.6rem;
`;

export const SearchIcon = styled.div.attrs<{}>((props) => ({
  className: "gz-search-icon",
}))<{}>`
  display: inline-flex;
  justify-content: center;
  flex-grow: 0;
  flex-shrink: 0;

  width: 4rem;
  font-size: 1.5rem;
  padding: 0;

  color: var(--light-grey-9);
`;

export const SearchButton = styled(SearchIcon).attrs((props) => ({
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

export const Input = styled.input.attrs((props) => ({
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

export const SuggestionContainer = styled.ul.attrs((props) => ({
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

export const Link = styled.a.attrs((props) => ({
  className: "gz-search-link",
}))`
  color: inherit;
  text-decoration: none;
`;

export const Suggestion = styled.li.attrs((props) => ({
  className: "gz-search-suggestion",
}))`
  font-size: 1.5rem;
  font-weight: 600;

  b {
    font-weight: 500;
  }
`;

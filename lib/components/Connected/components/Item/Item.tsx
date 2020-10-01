import styled, { css } from "styled-components";

const cssConnection = (column?: boolean) => css`
  &:first-child * {
    ${column
      ? "border-bottom-left-radius"
      : "border-top-right-radius"}: 0 !important;
    border-bottom-right-radius: 0 !important;

    &:after {
      ${column
        ? "border-bottom-left-radius"
        : "border-top-right-radius"}: 0 !important;
      border-bottom-right-radius: 0 !important;
    }
  }

  &:last-child * {
    border-top-left-radius: 0 !important;
    ${column
      ? "border-top-right-radius"
      : "border-bottom-left-radius"}: 0 !important;

    &:after {
      border-top-left-radius: 0 !important;
      ${column
        ? "border-top-right-radius"
        : "border-bottom-left-radius"}: 0 !important;
    }
  }
`;

const cssConnected = (column?: boolean) => css`
  &:not(:first-child) * {
    border-top-left-radius: 0 !important;
    ${column
      ? "border-top-right-radius"
      : "border-bottom-left-radius"}: 0 !important;

    &:after {
      border-top-left-radius: 0 !important;
      ${column
        ? "border-top-right-radius"
        : "border-bottom-left-radius"}: 0 !important;
    }
  }

  &:not(:last-child) * {
    ${column
      ? "border-bottom-left-radius"
      : "border-top-right-radius"}: 0 !important;
    border-bottom-right-radius: 0 !important;

    &:after {
      ${column
        ? "border-bottom-left-radius"
        : "border-top-right-radius"}: 0 !important;
      border-bottom-right-radius: 0 !important;
    }
  }
`;

export interface ItemProps {
  column?: boolean;
  connection?: boolean;
}

export const Item = styled.div<ItemProps>`
  position: relative;
  ${(props) => (props.connection ? "flex: 0 0 auto;" : "flex: 1 1 auto;")}
  ${(props) =>
    props.connection
      ? cssConnection(props.column)
      : cssConnected(props.column)}

  &:not(:first-child) {
    ${(props) => (props.column ? "margin-top" : "margin-left")}: -1px;
  }
`;

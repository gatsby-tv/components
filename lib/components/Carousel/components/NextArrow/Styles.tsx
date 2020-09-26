import styled from "styled-components"

import { Arrow } from "../Arrow";

export const Container = styled(Arrow).attrs((props) => ({
  className: "gz-carousel-next-arrow",
}))`
  right: -7.5rem;
  padding: 0 1rem 0 1.25rem;
`;


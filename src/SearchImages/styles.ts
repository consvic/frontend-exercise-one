import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 8px;
  row-gap: 8px;
`;

export const Img = styled.img`
  max-width: 100%;
  grid-column: span 1;
`;

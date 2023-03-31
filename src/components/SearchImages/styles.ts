import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  column-gap: 8px;
  row-gap: 8px;
  margin-top: 1em;
  margin-bottom: 1em;
  padding: 0 0.75em;

  @media (min-width: 566px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1025px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const Img = styled.img`
  max-width: 100%;
  grid-column: span 1;
`;

export const ErrorMessage = styled.p`
  color: red;
`;

export const Button = styled.button`
  padding: 4px 12px;
  border: none;
  background-color: white;
  border-radius: 6px;
  border: 1px solid black;
  letter-spacing: 0.01em;
  font-size: 14px;
`;

export const Input = styled.input`
  padding: 4px 12px;
  margin-right: 1em;
`;

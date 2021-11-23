import styled from "styled-components";
import { Line } from "../../../Line";

const Column = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 300px;
  overflow-y: scroll;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 200px 200px;
  grid-template-rows: repeat(auto-fit);
  max-height: 300px;
  overflow-y: scroll;
`;

export const FoundWords = () => {
  const foundWords = localStorage.getItem("found");
  const parsed = foundWords ? JSON.parse(foundWords) : {};

  return (
    <GridContainer>
      {foundWords ? (
        <>
          <div>TOTAL FOUND: {Object.keys(parsed).length}</div>
          <div />
          <div>word</div>
          <div>nonce</div>
          <Line />
          <Line />
          {Object.keys(parsed)
            .sort((a, b) => b.length - a.length)
            .map((word) => (
              <>
                <div>{word}</div>
                <div>{parsed[word]}</div>
              </>
            ))}
        </>
      ) : (
        <div>No mwords found. Use command "mine" to find them.</div>
      )}
    </GridContainer>
  );
};

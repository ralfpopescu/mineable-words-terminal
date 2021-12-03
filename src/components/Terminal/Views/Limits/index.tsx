import styled from "styled-components";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 150px 200px;
  grid-template-rows: repeat(auto-fit);
`;

export const Limits = () => (
  <GridContainer>
    <div>1-6 letters:</div> <div>2500 total</div>
    <div>7-10 letters: </div>
    <div>1500 total</div>
    <div>11 letters: </div>
    <div>350 total</div>
    <div>12 letters: </div>
    <div>250 total</div>
    <div>13 letters: </div>
    <div>200 total</div>
    <div>14 letters: </div>
    <div>200 total</div>
    <div>15 letters: </div>
    <div>200 total</div>
    <div>16 letters: </div>
    <div>200 total</div>
  </GridContainer>
);

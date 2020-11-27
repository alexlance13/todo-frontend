import { CardDeck } from 'react-bootstrap';
import styled from 'styled-components';

export const StyledCardDeck = styled(CardDeck)`
  width: 95%;
  margin: 20px auto;
  display: grid;
  grid-template: repeat(${(props: PropsType) => `${props.itemsperpage / 3}`}, 1fr) / repeat(3, 33%);
  @media (max-width: 1130px) {
    grid-template: repeat(${(props: PropsType) => `${props.itemsperpage / 2}`}, 1fr) / repeat(2, 50%);
  }
  @media (max-width: 720px) {
    grid-template: 1fr / 1fr;
  }
`;

interface PropsType {
  itemsperpage: number;
  isOpened: boolean;
}

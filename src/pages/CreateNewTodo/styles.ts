import { Alert, Form } from 'react-bootstrap';
import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  h2 {
    text-align: center;
    margin: 40px;
    @media (max-width: 600px) {
      font-size: 1.5rem;
      margin: 30px auto;
    }
  }
`;

export const StyledForm = styled(Form)`
  width: 50%;
  margin: 0 auto;
  button {
    float: right;
  }
  @media (max-width: 600px) {
    width: 80%;
  }
`;

export const StyledAlert = styled(Alert)`
  position: fixed;
  right: 20px;
  top: 70px;
  -webkit-transition: opacity 1s ease;
  -moz-transition: opacity 1s ease;
  -o-transition: opacity 1s ease;
  transition: opacity 1s ease;
  opacity: ${(props: PropsType) => +props.show};
`;

interface PropsType {
  show: boolean;
}

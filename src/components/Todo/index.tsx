import React, { useMemo, useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { ITodo } from 'types';
import { StyledCardBody, StyledCard, StyledButton } from './styles';
import { ImBin } from 'react-icons/im';
import { AiOutlineClose } from 'react-icons/ai';

const Todo: React.FC<PropsType> = ({ todo, removeTodo }) => {
  const { title, text, imageName, _id } = todo;
  const [isOpened, setIsOpened] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const imageUrl = useMemo(() => `${process.env.REACT_APP_API_URL}/tmp/images/${imageName}`, [imageName]);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setWidth(img.width);
      setHeight(img.height);
    };
  }, [imageUrl]);

  const onCloseHandler = (event: any) => {
    event.stopPropagation();
    setIsOpened(false);
  };
  const onDeleteHandler = (event: any) => {
    event.stopPropagation();
    removeTodo(_id);
  };

  return (
    <>
      <StyledCard isOpened={isOpened} border={isOpened ? 'primary' : 'light'} onClick={() => setIsOpened(true)}>
        <Card.Header>
          {isOpened ? (
            <StyledButton onClick={onCloseHandler} variant='danger'>
              <AiOutlineClose />
            </StyledButton>
          ) : (
            <StyledButton onClick={onDeleteHandler} variant='danger'>
              <ImBin />
            </StyledButton>
          )}
        </Card.Header>
        <StyledCardBody isOpened={isOpened} imgWidth={width} imgHeight={height}>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{text}</Card.Text>
          {imageName && <Card.Img src={imageUrl} />}
        </StyledCardBody>
      </StyledCard>
    </>
  );
};

export default Todo;

interface PropsType {
  todo: ITodo;
  removeTodo: (id: string) => void;
}

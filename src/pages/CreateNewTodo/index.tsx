import React from 'react';
import { Form, Button } from 'react-bootstrap';
import NavBar from 'components/NavBar';
import { Wrapper, StyledForm, StyledAlert } from './styles';
import { connect } from 'react-redux';
import { createTodo } from 'store/actions/todos';
import { AlertType, ITodoFormState } from 'types';
import { useForm } from 'react-hook-form';
import getErrorMessage from 'helpers/getValidationMessage';
import { IMAGE_REGEXP } from 'global-constants';

const CreateNewTodo: React.FC<PropsType> = ({ createTodo, alert }) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data: ITodoFormState) => createTodo(data);

  return (
    <Wrapper>
      <NavBar />
      <h2>Here you can create new todo</h2>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>Just write the title for your todo here</Form.Label>
          <Form.Control
            ref={register({ required: true, maxLength: 40, minLength: 3 })}
            type='text'
            placeholder='Title'
            name='title'
            id='title'
          />
          {getErrorMessage(errors, 'title')}
        </Form.Group>
        <Form.Group>
          <Form.Label>And the text here</Form.Label>
          <Form.Control
            ref={register({ required: true, maxLength: 200, minLength: 3 })}
            placeholder='Text'
            as='textarea'
            rows={3}
            name='text'
            id='text'
          />
          {getErrorMessage(errors, 'text')}
        </Form.Group>
        <Form.Group>
          <Form.File
            ref={register({ pattern: IMAGE_REGEXP })}
            id='image'
            name='image'
            label='And if you want - you can also add the image'
          />
          {getErrorMessage(errors, 'image')}
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </StyledForm>
      <StyledAlert show={alert.show} variant={alert.variant}>
        {alert.text}
      </StyledAlert>
    </Wrapper>
  );
};

function mapStateToProps(state: any) {
  return {
    alert: state.todos.alert,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
    createTodo: (todoFormState: ITodoFormState) => dispatch(createTodo(todoFormState)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewTodo);

interface PropsType {
  createTodo: (todoFormState: ITodoFormState) => void;
  alert: AlertType;
}

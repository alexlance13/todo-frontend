import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import NavBar from 'components/NavBar';
import { StyledCardDeck } from './styles';
import { getTodos, removeTodo } from 'store/actions/todos';
import { ITodo } from 'types';
import Todo from 'components/Todo';
import { NavLink } from 'react-router-dom';
import Pagination from 'components/Pagination';

const Home: React.FC<PropsType> = ({ getTodos, todos, removeTodo }) => {
  const itemsPerPage = 6;

  const [todosForDisplay, setTodosForDisplay] = useState(todos);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <>
      <NavBar />
      <Pagination itemsPerPage={itemsPerPage} data={todos} setChunkOfData={setTodosForDisplay} />
      <StyledCardDeck itemsperpage={6}>
        {todos.length ? (
          todosForDisplay.map((todo: ITodo, i: number) => <Todo removeTodo={removeTodo} todo={todo} key={i} />)
        ) : (
          <p>
            You haven't any todos yet. Add new todo <NavLink to='/create-new-todo'>here</NavLink>
          </p>
        )}
      </StyledCardDeck>
    </>
  );
};

function mapStateToProps(state: any) {
  return {
    todos: state.todos.todos,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getTodos: () => dispatch(getTodos()),
    removeTodo: (id: string) => dispatch(removeTodo(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

interface PropsType {
  getTodos: () => void;
  removeTodo: (id: string) => void;
  todos: ITodo[];
}

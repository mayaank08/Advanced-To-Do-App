import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './redux/actions/authActions';
import Login from './components/Login';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { Container, Navbar, Button } from 'react-bootstrap';

const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Advanced To-Do App</Navbar.Brand>
          {isAuthenticated && (
            <Button variant="outline-light" onClick={() => dispatch(logout())}>
              Logout
            </Button>
          )}
        </Container>
      </Navbar>
      <Container className="mt-4">
        {isAuthenticated ? (
          <>
            <TaskInput />
            <TaskList />
          </>
        ) : (
          <Login />
        )}
      </Container>
    </div>
  );
};

export default App;
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask } from '../redux/actions/taskActions';
import { ListGroup, Button, Badge, Spinner } from 'react-bootstrap';

const TaskList = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const dispatch = useDispatch();

  // Sort tasks by priority (High > Medium > Low)
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <ListGroup>
      {sortedTasks.length === 0 && <ListGroup.Item>No tasks yet.</ListGroup.Item>}
      {sortedTasks.map(task => (
        <ListGroup.Item
          key={task.id}
          className="d-flex justify-content-between align-items-center flex-wrap"
        >
          <div>
            <span>{task.text} </span>
            <Badge
              bg={
                task.priority === 'High'
                  ? 'danger'
                  : task.priority === 'Medium'
                  ? 'warning'
                  : 'success'
              }
            >
              {task.priority}
            </Badge>
            {task.location && (
              <div className="mt-1">
                {task.weather ? (
                  task.weather.error ? (
                    <span className="text-muted">{task.weather.error}</span>
                  ) : (
                    <span>
                      Weather: {task.weather.description}, {task.weather.temp}°C{' '}
                      <img src={task.weather.icon} alt="weather icon" style={{ width: '20px' }} />
                    </span>
                  )
                ) : (
                  <span>
                    <Spinner animation="border" size="sm" /> Fetching weather...
                  </span>
                )}
              </div>
            )}
          </div>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => dispatch(deleteTask(task.id))}
          >
            Delete
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default TaskList;
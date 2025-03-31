import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/actions/taskActions';
import { Form, Button, Row, Col } from 'react-bootstrap';

const TaskInput = () => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [location, setLocation] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(addTask(text, priority, location));
    setText('');
    setLocation('');
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Row className="g-2">
        <Col xs={12} md={6}>
          <Form.Control
            type="text"
            placeholder="Enter a new task"
            value={text}
            onChange={e => setText(e.target.value)}
            required
          />
        </Col>
        <Col xs={6} md={2}>
          <Form.Select value={priority} onChange={e => setPriority(e.target.value)}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Form.Select>
        </Col>
        <Col xs={6} md={2}>
          <Form.Control
            type="text"
            placeholder="Location (optional)"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
        </Col>
        <Col xs={12} md={2}>
          <Button variant="primary" type="submit" className="w-100">
            Add
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default TaskInput;
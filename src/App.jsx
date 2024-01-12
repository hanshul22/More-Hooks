// App.js
import React, { useReducer, useRef } from 'react';
import './App.css';

const initialState = {
  tasks: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        tasks: [...state.tasks, { content: action.payload, isVisible: true }],
      };
    case 'TOGGLE_TASK':
      return {
        tasks: state.tasks.map((task, index) => {
          if (index === action.payload) {
            return {
              ...task,
              isVisible: !task.isVisible,
            };
          }
          return task;
        }),
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const taskInputRef = useRef(null);

  const addTask = () => {
    const newTask = taskInputRef.current.value;
    if (newTask.trim() !== '') {
      dispatch({ type: 'ADD_TASK', payload: newTask });
      taskInputRef.current.value = '';
    }
  };

  const toggleTask = (index) => {
    dispatch({ type: 'TOGGLE_TASK', payload: index });
  };

  const scrollToBottom = () => {
    taskInputRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="App">
      <h1>Daily Tasks</h1>
      <div className="task-list">
        {state.tasks.map((task, index) => (
          <div key={index} className="task-item">
            <span>{task.isVisible ? task.content : 'Task Completed'}</span>
            <button onClick={() => toggleTask(index)}>Toggle</button>
          </div>
        ))}
      </div>
      <input ref={taskInputRef} type="text" placeholder="Add a task..." />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
};

export default App;

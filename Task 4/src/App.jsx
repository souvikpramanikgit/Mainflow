import React, { useState, useEffect } from 'react';
import './App.css';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState(-1);
  const [currentEditedItem, setCurrentEditedItem] = useState("");

  const handleAddTodo = () => {
    if (!task.trim()) return;

    let newTodoItem = { task: task };
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
    setTask('');
  };

  const handleDeleteTodo = index => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const handleComplete = index => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

    let filteredItem = { ...allTodos[index], completedOn: completedOn };
    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
  };

  const handleDeleteCompletedTodo = index => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
    if (savedTodo) setTodos(savedTodo);
    if (savedCompletedTodo) setCompletedTodos(savedCompletedTodo);
  }, []);

  const handleEdit = (index, item) => {
    setCurrentEdit(index);
    setCurrentEditedItem(item);
  };

  const handleUpdateTask = (value) => {
    setCurrentEditedItem(prev => ({ ...prev, task: value }));
  };

  const handleUpdateToDo = () => {
    let newToDo = [...allTodos];
    newToDo[currentEdit] = currentEditedItem;
    setTodos(newToDo);
    setCurrentEdit("");
  };

  return (
    <div className="App">
      <h1>To Do List</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <input
            type="text"
            value={task}
            onChange={e => setTask(e.target.value)}
            placeholder="What's the task?"
          />
          <button type="button" onClick={handleAddTodo} className="primaryBtn">
            Add
          </button>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${!isCompleteScreen && 'active'}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen && 'active'}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          {!isCompleteScreen && allTodos.map((item, index) => (
            currentEdit === index ? (
              <div className='edit__wrapper' key={index}>
                <input
                  placeholder='Updated Task'
                  onChange={e => handleUpdateTask(e.target.value)}
                  value={currentEditedItem.task}
                />
                <button type="button" onClick={handleUpdateToDo} className="primaryBtn">
                  Update
                </button>
              </div>
            ) : (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.task}</h3>
                </div>
                <div>
                  <BsCheckLg
                    className="check-icon"
                    onClick={() => handleComplete(index)}
                    title="Complete?"
                  />
                  <AiOutlineEdit
                    className="check-icon"
                    onClick={() => handleEdit(index, item)}
                    title="Edit?"
                  />
                  <AiOutlineDelete
                    className="icon"
                    onClick={() => handleDeleteTodo(index)}
                    title="Delete?"
                  />
                </div>
              </div>
            )
          ))}

          {isCompleteScreen && completedTodos.map((item, index) => (
            <div className="todo-list-item" key={index}>
              <div>
                <h3>{item.task}</h3>
                <p><small>Completed on: {item.completedOn}</small></p>
              </div>
              <div>
                <AiOutlineDelete
                  className="icon"
                  onClick={() => handleDeleteCompletedTodo(index)}
                  title="Delete?"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default App;
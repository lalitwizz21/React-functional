import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from "react-modal";
import { v4 as uuidv4 } from 'uuid';
import './Todo.css'

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "lightsteelblue",
    width: 500,
    height: 341,
    borderRadius: 5,
  },
};

const TodoHome = () => {
  const [currentFilter, setFilter] = useState("All")
  const [status, changeStatus] = useState("Incomplete")
  const [title, setTitle] = useState("")
  const [todoAction, setAction] = useState("")
  const [todoData, setTodoData] = useState([])
  const [openModal, setModal] = useState(false)
  const [currentId, setId] = useState("")

  useEffect(() => {
    let storedData = JSON.parse(localStorage.getItem("list"))
    if (storedData) {
      setTodoData(storedData)
    }
    if (!storedData) {
      localStorage.setItem("list", JSON.stringify([]))
    }

    return () => {
      Modal.setAppElement('body');
    };
  }, [])

  const changeFilter = (e) => {
    setFilter(e.target.value)
  }

  const changeStatusVal = (e) => {
    changeStatus(e.target.value)
  }

  const changeTitle = (e) => {
    setTitle(e.target.value)
  }

  const openAddTodoModal = (item) => {
    console.log("item", item)
    if (item) {
      console.log("if");
      setTitle(item.title)
      changeStatus(item.status)
      setId(item.id)
      setAction('edit')
    } else {
      console.log("else");
      setAction('')
      setTitle("")
      setId("")
    }
    setModal(true)
  }

  const addNewTodo = () => {
    let storedData = JSON.parse(localStorage.getItem("list"))
    if (currentId) {
      storedData = storedData.map(obj =>
        obj.id === currentId ? { ...obj, status: status, title: title, } : obj
      );
    } else {
      let data = {
        id: uuidv4(),
        status: status,
        title: title,
      }
      if (title) {
        storedData.push(data);
      } else {
        alert("Please fill the title input")
      }
    }
    localStorage.setItem("list", JSON.stringify(storedData))
    setTitle("")
    setTodoData(storedData)
    setModal(false)
  }

  const handleTodoDelete = (e) => {
    let storedData = JSON.parse(localStorage.getItem("list"))
    storedData = storedData.filter((item) => item.id !== e.id)
    localStorage.setItem("list", JSON.stringify(storedData))
    setTodoData(storedData)
  }

  return (
    <div className='todo-outer'>
      <h1>TODO LIST</h1>
      <Modal
        isOpen={openModal}
        onRequestClose={() => setModal(false)}
        style={customStyles}
      >
        <h2>Add TODO</h2>
        <label>
          Title
          <br />
          <input value={title} onChange={changeTitle} type="text" />
        </label>
        <br /><br />
        <label>
          Status
          <br />
          <select onChange={changeStatusVal} value={status}>
            <option value="Incomplete">Incomplete</option>
            <option value='Completed'>Completed</option>
          </select>
        </label>
        <br /><br />
        <button onClick={addNewTodo} style={{ marginRight: "5px" }} >{todoAction === 'edit' ? 'Update Task' : 'Add Task'}</button>
        <button onClick={() => setModal(false)}>Cancel</button>
      </Modal>
      <div>
        <div className='todo-action'>
          <button onClick={() => openAddTodoModal()}>Add Task</button>
          <select onChange={changeFilter} value={currentFilter}>
            <option value="all">All</option>
            <option value="Incomplete">Incomplete</option>
            <option value='Completed'>Completed</option>
          </select>
        </div>
        <div className='todo-data'>
          {todoData && todoData.length ?
            todoData.map((item) =>
              <div key={item.id} style={item.status.toLowerCase() === "incomplete" ? { backgroundColor: "orange" } : { backgroundColor: "green" }} className="single-todo">
                <span>Title: {item.title}</span>
                <span>Status: {item.status}</span>
                <div>
                  <button style={{ marginRight: "5px" }} onClick={() => handleTodoDelete(item)}>Delete</button>
                  <button onClick={() => openAddTodoModal(item)}>Edit</button>
                </div>
              </div>
            )
            :
            <div className="single-todo" style={{ alignItems: "center" }}>
              <span className='noTodo'>No Todos</span>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default TodoHome
import React, {useState, useEffect} from 'react'
import {isEmpty, size} from 'lodash'
import shortid from "shortid"
import { getCollection } from './actions'

function App() {

  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [idTask, setIdTask] = useState("")
  const [error, setError] = useState(null)

  useEffect(() => {
    (async () =>{
      const resultCollection = await getCollection("tasks")
      console.log(resultCollection)
    })()
  }, [])

  const validForm = () => {
    let isValid = true
    setError(null)
    if(isEmpty(task)){
      setError("Debes ingresar una tarea")
      isValid = false
    }
    return isValid
  }

  const addTask = (e) =>{
    e.preventDefault()
    if(!validForm()){
      return
    }
    const newTask = {
      id: shortid.generate(),
      name: task

    }

    setTasks([...tasks, newTask])
    
    setTask("")
    return
  }

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter(task => task.id !==id)
    setTasks(filteredTasks)
  }

  const editTask = (theTask) => {
    setTask(theTask.name)
    setEditMode(true)
    setIdTask(theTask.id)
  }

  const saveTask = (e) =>{
    e.preventDefault()
    if(!validForm()){
      return
    }
    const editedTasks = tasks.map(item => item.id == idTask ? { idTask, name: task} : item)
    setTasks(editedTasks)
    setEditMode(false)
    setTask("")
    setIdTask("")
    return
  }

  return (
    <div className="container mt-5">
     <h1>Tareas</h1>
     <hr/>

     <div className="row">
       <div className="col-8">
         <h4 className="text-center">Lista de tareas</h4>

          {       
          size(tasks) == 0 ?(
            <h5 className="list-group-item">Aún no hay tareas programadas</h5>
          ) : (
            <ul className="list-group">
            {
              tasks.map((task) => (
                <li className="list-group-item" >
              <span className="lead">{task.name}</span>
              <button 
                className="btn btn-danger btn-sn float-right mx-2"   
                onClick = { () => deleteTask(task.id)}
              >
                Eliminar
              </button>
              <button 
                className="btn btn-warning btn-sn float-right"
                onClick = {() => editTask(task)}
              > 
              Editar
              </button>
            </li>
              ))
            
            }
            </ul>
          )
           
          }

        </div>
        <div className="col-4">
          <h4 className="text-center">
            { editMode ? "Modificar tarea" : "Agregar tarea"}
          </h4>
            <form onSubmit={ editMode ? saveTask : addTask}>
            {
              error && <span className="text-danger">{error}</span>
            }
              <input 
                 type="text" 
                 className="form-control mb-2"
                 placeholder="Ingrese la tarea" 
                 onChange = {(text) => setTask(text.target.value)}
                 value={task}
              />

              <button className={editMode ? "btn btn-dark btn-block" : "btn btn-warning btn-block"} type="submit">
                {editMode ? "Guardar" : "Agregar"}
              </button>
            </form>
        </div>  
     </div>
    </div>
  );
  }
export default App;

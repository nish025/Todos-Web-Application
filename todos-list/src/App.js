import './App.css';
import Header from"./myComponents/Header";
import {Todos} from "./myComponents/Todos";
import {Footer} from "./myComponents/Footer"
import {AddTodo} from "./myComponents/AddTodo";
import { About } from "./myComponents/About";
import React, { useState,useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {
let initTodo;
if(localStorage.getItem("todos")===null){
  initTodo = [];
}
else{
  initTodo = JSON.parse(localStorage.getItem("todos"));
}
const onDelete = (todo)=>{
console.log("I am onDelete of todo",todo);
//deleting this way in react does not work
//let index = todos.indexOf(todo);
//todos.splice(index,1);

setTodos(todos.filter((e)=>{
return e!==todo;
}));
localStorage.setItem("todos", JSON.stringify(todos));
}
const addTodo = (title,desc) =>{
console.log("I am adding this todo", title, desc);
let sno;
if(todos.length===0){
  sno = 0;
}
else{
  sno = todos[todos.length-1].sno + 1;
}
const myTodo ={
  sno:sno,
  title: title,
  desc: desc,
}
setTodos([...todos,myTodo]);
console.log(myTodo);
}

//  localStorage.setItem("todos", JSON.stringify(todos));
const [todos, setTodos] = useState(initTodo);
useEffect(()=>{
  localStorage.setItem("todos", JSON.stringify(todos));
},[todos])

  return (
    <>
    <Router>
    <Header title="My Todos List" SearchBar={false}/>
    <Routes>
          <Route exact path="/" element={
           
              <>
            <AddTodo addTodo={addTodo}/>
    <Todos todos={todos} onDelete={onDelete}/>
    </>
          }>
          </Route>
          <Route path="/about" element={<About/>}>
        </Route>
        </Routes>
    <Footer/>
    </Router>
    </>
  );
}

export default App;

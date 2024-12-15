import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState("");

  // Save data to localStorage
  function persistData(newList) {
    localStorage.setItem("todos", JSON.stringify({ todos: newList }));
  }

  // Add new todo
  function handleAddTodos(newTodo) {
    const newTodoList = [...todos, newTodo];
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  // Delete a todo
  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((_, todoIndex) => todoIndex !== index);
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  // Edit a todo
  function handleEditTodo(index) {
    const valueToBeEdited = todos[index];
    setTodoValue(valueToBeEdited);
    handleDeleteTodo(index);
  }

  // Load todos from localStorage on component mount
  useEffect(() => {
    if (!localStorage) return;

    let localTodos = localStorage.getItem("todos");
    if (!localTodos) return;

    localTodos = JSON.parse(localTodos).todos;
    setTodos(localTodos);
  }, []);

  return (
    // Add motion.div for fade-in animation on page load
    <motion.div
      initial={{ opacity: 0, y: -20 }} // Start with 0 opacity and slight upward shift
      animate={{ opacity: 1, y: 0 }}   // Fade in and move back to original position
      transition={{ duration: 0.8, ease: "easeOut" }} // Animation duration and easing
      style={{ textAlign: "left", marginTop: "2rem" }}
    >
      <h1 style={{ fontFamily: "sans-serif", color: "#333" }}></h1>
      <TodoInput
        todoValue={todoValue}
        setTodoValue={setTodoValue}
        handleAddTodos={handleAddTodos}
      />
      <TodoList
        handleEditTodo={handleEditTodo}
        handleDeleteTodo={handleDeleteTodo}
        todos={todos}
      />
    </motion.div>
  );
}

export default App;

import { useEffect, useState } from "react";
import "./App.css";
import { TodoProvider } from "./context";
import { TodoForm, TodoItem } from "./components";

function App() {
  const [todos, setTodos] = useState([]); //in todos ,we have alll value .. not individual value

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo},...prev] )

    // setTodos((prev) => {
    //   // Create a new todo item with a unique ID
    //   const newTodo = { id: Date.now(), ...todo };

    //   // Return a new array with the new todo at the beginning
    //   return [newTodo, ...prev];
    // });
  };

  const updateTodo = (id, todo) => {
    //setTodos((prev) => prev.map((prevIndividualTodo) => prevIndividualTodo.id === id ? todo : prevIndividualTodo))

    setTodos((prev) => {
      // Create a new array to hold the updated todos
      const updatedTodos = [];

      // Iterate over each todo in the previous state
      for (let i = 0; i < prev.length; i++) {
        const prevIndividualTodo = prev[i];

        // Check if the current todo's id matches the id we want to update
        if (prevIndividualTodo.id === id) {
          // If it matches, push the updated todo to the new array
          updatedTodos.push(todo);
        } else {
          // If it doesn't match, push the original todo to the new array
          updatedTodos.push(prevIndividualTodo);
        }
      }

      // Return the new array of todos
      return updatedTodos;
    });
  };

  const deleteTodo = (id) => {
    setTodos((prev) =>
      prev.filter((prevIndividualTodo) => prevIndividualTodo.id !== id)
    );
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevIndividualTodo) =>
        prevIndividualTodo.id === id
          ? { ...prevIndividualTodo, completed: !prevIndividualTodo.completed }
          : prevIndividualTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, toggleComplete, deleteTodo }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm/>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) =>(
              <div key={todo.id}
              className="w-full">
                 <TodoItem todo={todo}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;

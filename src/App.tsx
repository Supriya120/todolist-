import { useState, FormEvent } from "react";

interface Todo  {
  id: number;
  text: string;
  completed: boolean;
  deadline: number;
}

function App() {

  const [todoList, setTodoList] = useState<Todo[]>([]);

  const [inputValue, setInputValue] = useState<string>("");

  const [editingId, setEditingId] = useState<number | null>(null);

  const [editingText, setEditingText] = useState<string>("");

  const [inputDeadline, setInputDeadline] = useState<number>(0);

  const [editingDeadline, setEditingDeadline] = useState<number>(0);

  const handleAddTodo = (e: FormEvent) => {
    e.preventDefault(); // stop the page from refreshing on submit

    const trimmed = inputValue.trim();
    if (trimmed === "") return;
    if (inputDeadline === 0) return; 

    const newTodo: Todo = {
      id: Date.now(), 
      text: trimmed,
      completed: false,
      deadline: inputDeadline,
    };
console.log(newTodo);
    // Add the new todo to the existing list (never mutate state directly,
    // always create a new array).
    setTodoList([...todoList, newTodo]);

    setInputValue("");
    setInputDeadline(0);
  };



  //  UPDATE (toggle complete) 
    const handleToggleComplete = (id: number) => {
       setTodoList(     
           todoList.map((todo) =>     
         todo.id === id ? { ...todo, completed: !todo.completed } : todo  
       )    
       );  
       };

  const handleStartEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
    setEditingDeadline(todo.deadline);
  };

  const handleSaveEdit = (id: number) => {
    const trimmed = editingText.trim();
    if (trimmed === "") return; // don't save an empty task
    if (editingDeadline === 0) return; // deadline is now required, so don't skip it

    setTodoList(
      todoList.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              text: trimmed,
              deadline: editingDeadline,
            }
          : todo
      )
    );

    setEditingId(null);
    setEditingText("");
    setEditingDeadline(0);
  };

 
  const handleDeleteTodo = (id: number) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  return (
    <div className="app">
      <h1>Todo App</h1>

      <form onSubmit={handleAddTodo} className="todo-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What tasks need to be done?"
        />
        <input
          type="number"
          value={inputDeadline}
          onChange={(e) => setInputDeadline(e.target.value=== "" ? 0 : Number(e.target.value))}
          placeholder="Deadline (days)"
          required
        />
        <button type="submit">Add</button>
      </form>

      {/* READ: list of todos */}
      <ul className="todo-list">
        {todoList.length === 0 && <p className="empty">No todos yet. Add one!</p>}

        {todoList.map((todo) => (
          <li key={todo.id} className="todo-item">
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <input
                  type="number"
                  value={editingDeadline}
                  onChange={(e) => setEditingDeadline(e.target.value === "" ? 0 : Number(e.target.value))}
                  placeholder="Deadline (days)"
                  required
                />
                <button onClick={() => handleSaveEdit(todo.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id)}
                />
                <span className={todo.completed ? "completed" : ""}>
                  {todo.text}
                </span>
                <span className="deadline">Due: {todo.deadline} days</span>
                <button onClick={() => handleStartEdit(todo)}>Edit</button>
                <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;


const numb:string[]=["Hello", "World", "This", "is", "a", "test"]

let num=["hello","world"]
for(let i=0;i<numb.length;i++){
  console.log(i,numb[i]);
}
  
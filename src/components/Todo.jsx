import AddTaskForm from "./AddTaskForm";
import SearchTaskForm from "./SearchTaskForm";
import TodoInfo from "./TodoInfo";
import TodoList from "./TodoList";
import { useEffect, useState } from "react";

const Todo = () => {
  const [tasks, setTasks] = useState([
    { id: "task-1", title: "Купить молоко", isDone: false },
    { id: "task-2", title: "Погладить кота", isDone: true },
    { id: "task-3", title: "Пососаfть хуй", isDone: false },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState("");

  const deleteAllTasks = () => {
    const isConfirned = confirm("Are you sure you want to delete all tasks?");
    if (isConfirned) {
      setTasks([]);
    }
  };

  const deleteTask = (taskId) => {
    setTasks(
      tasks.filter((task) => task.id !== taskId)
    )
  };

  const toggleTaskComplete = (taskId, isDone) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return {...task, isDone}
        }

        return task
      })
    )
    };

  const filterTasks = (query) => {
    console.log(`Поиск ${query}`);
  };

  const addTask = () => {
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id: crypto?.randomUUID() ?? Date.now().toString(),
        title: newTaskTitle,
        isDone: false,
      };

      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
    }
  };

  useEffect( () => {
    console.log('компонент туду смонтирован. Загружаем в таскс данные из хранилища')
    const savedTasks = localStorage.getItem("tasks")

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])


  useEffect( () => {
    console.log("Сохраняем данные в хранилище. Т.к изменился tasks:", tasks)
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])


  

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm
        addTask={addTask}
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
      />
      <SearchTaskForm onSearchInput={filterTasks} />
      <TodoInfo
        total={tasks.length}
        done={tasks.filter(({ isDone }) => isDone).length}
        onDeleteAllButtonClick={deleteAllTasks}
      />
      <TodoList
        tasks={tasks}
        onDeleteTaskButtonClick={deleteTask}
        onTaskCompleteChange={toggleTaskComplete}
      />
    </div>
  );
};

export default Todo;

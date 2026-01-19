const { readTasks, writeTasks } = require("../utils/fileHandler");

const addTask = (title, description) => {
  const tasks = readTasks();

  const newTask = {
    id: Date.now(),
    title,
    description,
    status: "pending",
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  writeTasks(tasks);

  console.log("Task added successfully");
};

const viewTasks = () => {
  const tasks = readTasks();

  if (tasks.length === 0) {
    console.log("No tasks found");
    return;
  }

  tasks.forEach(task => {
    console.log(`
ID: ${task.id}
Title: ${task.title}
Description: ${task.description}
Status: ${task.status}
Created At: ${task.createdAt}
-------------------------
`);
  });
};

const updateTask = (id, newTitle) => {
  const tasks = readTasks();
  const task = tasks.find(t => t.id == id);

  if (!task) {
    console.log("Task not found");
    return;
  }

  task.title = newTitle;
  writeTasks(tasks);
  console.log("Task updated");
};

const deleteTask = (id) => {
  const tasks = readTasks();
  const filteredTasks = tasks.filter(t => t.id != id);

  writeTasks(filteredTasks);
  console.log("Task deleted");
};

const markCompleted = (id) => {
  const tasks = readTasks();
  const task = tasks.find(t => t.id == id);

  if (!task) {
    console.log("Task not found");
    return;
  }

  task.status = "completed";
  writeTasks(tasks);
  console.log("Task marked as completed");
};

module.exports = {
  addTask,
  viewTasks,
  updateTask,
  deleteTask,
  markCompleted
};

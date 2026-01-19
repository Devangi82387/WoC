require("dotenv").config();

const {
  addTask,
  viewTasks,
  updateTask,
  deleteTask,
  markCompleted
} = require("./controllers/taskController");

const args = process.argv.slice(2);
const command = args[0];

console.log(`\n ${process.env.APP_NAME}\n`);

switch (command) {
  case "add":
    addTask(args[1], args[2]);
    break;

  case "view":
    viewTasks();
    break;

  case "update":
    updateTask(args[1], args[2]);
    break;

  case "delete":
    deleteTask(args[1]);
    break;

  case "complete":
    markCompleted(args[1]);
    break;

  default:
    console.log(`
Commands:
  node app.js add "title" "description"
  node app.js view
  node app.js update <id> "new title"
  node app.js delete <id>
  node app.js complete <id>
`);
}

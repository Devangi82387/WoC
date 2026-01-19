const express = require("express");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// In-memory notes array
let notes = [
  {
    id: 1,
    title: "Express Basics",
    content: "Learn routes and middleware."
  }
];

// GET all notes
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// GET note by ID
app.get("/api/notes/:id", (req, res) => {
  const note = notes.find(n => n.id == req.params.id);
  note ? res.json(note) : res.status(404).json({ message: "Note not found" });
});

// CREATE note
app.post("/api/notes", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content || title.trim() === "" || content.trim() === "") {
    return res.status(400).json({ message: "Title and content are required" });
  }

  const newNote = {
    id: Date.now(),
    title,
    content
  };

  notes.push(newNote);
  res.status(201).json(newNote);
});

// UPDATE note
app.put("/api/notes/:id", (req, res) => {
  const note = notes.find(n => n.id == req.params.id);

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  note.title = req.body.title;
  note.content = req.body.content;
  res.json(note);
});

// DELETE note
app.delete("/api/notes/:id", (req, res) => {
  notes = notes.filter(n => n.id != req.params.id);
  res.json({ message: "Note deleted" });
});

// Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

const API_URL = "/api/notes";

const fetchNotes = async () => {
  const res = await fetch(API_URL);
  const notes = await res.json();

  const notesDiv = document.getElementById("notes");
  notesDiv.innerHTML = "";

  notes.forEach(note => {
    notesDiv.innerHTML += `
      <div class="note">
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <button onclick="deleteNote(${note.id})">Delete</button>
      </div>
    `;
  });
};

const addNote = async () => {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  if (title === "" || content === "") {
    alert("Title and Content cannot be empty!");
    return;
  }

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content })
  });

  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
  fetchNotes();
};

const deleteNote = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchNotes();
};

// Load notes on page load
fetchNotes();

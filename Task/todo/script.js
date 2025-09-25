// To-Do app with localStorage, editing, toggling and deletion
document.addEventListener('DOMContentLoaded', function () {
  const STORAGE_KEY = 'mc_todo_tasks_v1';
  const addForm = document.getElementById('addForm');
  const taskText = document.getElementById('taskText');
  const taskList = document.getElementById('taskList');
  const searchInput = document.getElementById('search');
  const filterDone = document.getElementById('filterDone');

  let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  function render() {
    const q = (searchInput.value || '').toLowerCase();
    const filter = filterDone.value;
    taskList.innerHTML = '';
    const filtered = tasks.filter(t => {
      if(filter === 'active' && t.done) return false;
      if(filter === 'done' && !t.done) return false;
      if(q && !t.text.toLowerCase().includes(q)) return false;
      return true;
    });

    if(filtered.length === 0){
      taskList.innerHTML = '<li class="task muted">No tasks found</li>';
      return;
    }

    filtered.forEach(task => {
      const li = document.createElement('li');
      li.className = 'task';
      li.innerHTML = `
        <div class="left">
          <input type="checkbox" class="chk" ${task.done ? 'checked' : ''} data-id="${task.id}">
          <div class="text ${task.done ? 'done' : ''}" data-id="${task.id}">${escapeHtml(task.text)}</div>
        </div>
        <div class="actions">
          <button class="edit" data-id="${task.id}" title="Edit">✎</button>
          <button class="delete" data-id="${task.id}" title="Delete">🗑</button>
        </div>`;
      taskList.appendChild(li);
    });
  }

  function escapeHtml(str){
    return str.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
  }

  addForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const text = taskText.value.trim();
    if(!text) return;
    tasks.unshift({ id: Date.now(), text, done: false });
    taskText.value = '';
    save();
    render();
  });

  // event delegation for checkbox, edit, delete, and click-to-toggle-complete
  taskList.addEventListener('click', function (e) {
    const id = Number(e.target.dataset.id);
    if(!id) return;
    if(e.target.classList.contains('chk')){
      const t = tasks.find(x => x.id === id);
      if(t){ t.done = e.target.checked; save(); render(); }
    } else if(e.target.classList.contains('delete')){
      tasks = tasks.filter(x => x.id !== id);
      save(); render();
    } else if(e.target.classList.contains('edit')){
      const t = tasks.find(x => x.id === id);
      if(!t) return;
      const newText = prompt('Edit task text', t.text);
      if(newText !== null){
        t.text = newText.trim();
        save(); render();
      }
    } else if(e.target.classList.contains('text')){
      // toggle by clicking text
      const t = tasks.find(x => x.id === id);
      if(t){ t.done = !t.done; save(); render(); }
    }
  });

  searchInput.addEventListener('input', render);
  filterDone.addEventListener('change', render);

  render();
});

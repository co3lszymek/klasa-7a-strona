const backendUrl = 'https://twoj-backend.onrender.com';

async function loadCategory(cat) {
  const res = await fetch(`${backendUrl}/posts/${cat}`);
  const posts = await res.json();
  const content = document.getElementById('content');
  content.innerHTML = posts.map(p => `<h3>${p.title}</h3><p>${p.content}</p>`).join('');
}

async function addPost() {
  const token = localStorage.getItem('token');
  const category = document.getElementById('category').value;
  const title = document.getElementById('title').value;
  const content = document.getElementById('contentText').value;
  await fetch(`${backendUrl}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ category, title, content })
  });
  alert("Dodano!");
  loadPostsForDelete();
}

async function loadPostsForDelete() {
  const categories = ['lektury', 'sprawdziany', 'przygotowania', 'notatki', 'plan'];
  const list = document.getElementById('postList');
  list.innerHTML = '';
  for (let cat of categories) {
    const res = await fetch(`${backendUrl}/posts/${cat}`);
    const posts = await res.json();
    posts.forEach((post, i) => {
      const li = document.createElement('li');
      li.textContent = `[${cat}] ${post.title}`;
      const btn = document.createElement('button');
      btn.textContent = '🗑️';
      btn.onclick = async () => {
        const token = localStorage.getItem('token');
        await fetch(`${backendUrl}/posts/${cat}/${i}`, {
          method: 'DELETE',
          headers: { 'Authorization': 'Bearer ' + token }
        });
        loadPostsForDelete();
      };
      li.appendChild(btn);
      list.appendChild(li);
    });
  }
}

if (document.getElementById('postList')) {
  loadPostsForDelete();
}

const backendUrl = 'https://klasa7a-api.onrender.com/';

if (!localStorage.getItem("token")) location.href = "login.html";

document.getElementById("postForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  await fetch(`${backendUrl}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify({
      category: document.getElementById("category").value,
      title: document.getElementById("title").value,
      text: document.getElementById("text").value,
    }),
  });
  loadPosts();
});

async function loadPosts() {
  const res = await fetch(`${backendUrl}/posts`);
  const posts = await res.json();
  const list = document.getElementById("postList");
  list.innerHTML = "";
  posts.forEach(post => {
    const li = document.createElement("li");
    li.innerHTML = `<b>${post.title}</b> (${post.category}) <button onclick="deletePost('${post.id}')">🗑️</button>`;
    list.appendChild(li);
  });
}

window.deletePost = async (id) => {
  await fetch(`${backendUrl}/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token"),
    },
  });
  loadPosts();
};

window.logout = () => {
  localStorage.removeItem("token");
  location.href = "login.html";
};

loadPosts();

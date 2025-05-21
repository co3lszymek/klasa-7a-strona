const backendUrl = 'https://klasa7a-api.onrender.com/'; // <--- Twój backend

async function loadCategory(cat) {
  const res = await fetch(`${backendUrl}/posts?category=${cat}`);
  const posts = await res.json();
  const content = document.getElementById("content");
  content.innerHTML = `<h2>${cat}</h2>` + posts.map(p =>
    `<h3>${p.title}</h3><p>${p.text}</p>`
  ).join("");
}

const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const articleList = document.getElementById('articleList');
const articleDisplay = document.getElementById('articleDisplay');
const search = document.getElementById('search');

let articles = [];

menuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('show');
});

// Load article list
fetchArticles();

function fetchArticles() {
  const files = ['article1.json', 'article2.json', 'article3.json'];

  files.forEach(file => {
    fetch(`./articles/${file}`)
      .then(res => res.json())
      .then(data => {
        articles.push(data);
        const li = document.createElement('li');
        li.textContent = data.title;
        li.addEventListener('click', () => displayArticle(data));
        articleList.appendChild(li);
      });
  });
}

function displayArticle(data) {
  sidebar.classList.remove('show');
  articleDisplay.innerHTML = `
    <h2>${data.title}</h2>
    <p><em>${data.date}</em></p>
    ${data.content.map(p => `<p>${p}</p>`).join('')}
  `;
}

search.addEventListener('input', () => {
  const term = search.value.toLowerCase();
  articleList.innerHTML = '';
  articles
    .filter(a => a.title.toLowerCase().includes(term))
    .forEach(data => {
      const li = document.createElement('li');
      li.textContent = data.title;
      li.addEventListener('click', () => displayArticle(data));
      articleList.appendChild(li);
    });
});

let page = 1;
const APILINK = (pageNum) => `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&page=${pageNum}`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&query=';

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(APILINK(page));

function returnMovies(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      data.results.forEach(element => {
        const div_card = document.createElement('div');
        div_card.setAttribute('class', 'card');

        const div_row = document.createElement('div');
        div_row.setAttribute('class', 'row');

        const div_column = document.createElement('div');
        div_column.setAttribute('class', 'column');

        const image = document.createElement('img');
        image.setAttribute('class', 'thumbnail');
        image.setAttribute('id', 'image');

        const title = document.createElement('h3');
        title.setAttribute('id', 'title');

        const center = document.createElement('center');

        title.innerHTML = `${element.title}<br><a href="movie.html?id=${element.id}&title=${element.title}"></a>`;
        image.src = element.poster_path
          ? IMG_PATH + element.poster_path
          : 'https://via.placeholder.com/300x450?text=No+Image';

        center.appendChild(image);
        div_card.appendChild(center);
        div_card.appendChild(title);
        div_column.appendChild(div_card);
        div_row.appendChild(div_column);

        main.appendChild(div_row);
      });
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  main.innerHTML = '';

  const searchItem = search.value;

  if (searchItem) {
    fetch(SEARCHAPI + searchItem)
      .then(res => res.json())
      .then(data => {
        data.results.forEach(element => {
          const div_card = document.createElement('div');
          div_card.setAttribute('class', 'card');

          const div_row = document.createElement('div');
          div_row.setAttribute('class', 'row');

          const div_column = document.createElement('div');
          div_column.setAttribute('class', 'column');

          const image = document.createElement('img');
          image.setAttribute('class', 'thumbnail');
          image.setAttribute('id', 'image');

          const title = document.createElement('h3');
          title.setAttribute('id', 'title');

          const center = document.createElement('center');

          title.innerHTML = `${element.title}<br><a href="movie.html?id=${element.id}&title=${element.title}"></a>`;
          image.src = element.poster_path
            ? IMG_PATH + element.poster_path
            : 'https://via.placeholder.com/300x450?text=No+Image';

          center.appendChild(image);
          div_card.appendChild(center);
          div_card.appendChild(title);
          div_column.appendChild(div_card);
          div_row.appendChild(div_column);

          main.appendChild(div_row);
        });
      });

    search.value = "";
  }
});

document.getElementById("suggestBtn").addEventListener("click", () => {
  fetch(APILINK(page))
    .then(res => res.json())
    .then(data => {
      const movie = data.results[Math.floor(Math.random() * data.results.length)];
      showPopupCard(movie);
    });
});

function showPopupCard(movie) {
  const popup = document.getElementById("popupCard");
  const popupBg = document.querySelector(".popupBg");

  popup.innerHTML = `
    <div class="popupContent">
      <img src="${movie.poster_path ? IMG_PATH + movie.poster_path : 'https://via.placeholder.com/300x450?text=No+Image'}" />
     <h3 class="popup-title">${movie.title}</h3>
    </div>
  `;

  popupBg.style.display = "block";

  setTimeout(() => {
    popupBg.style.display = "none";
  }, 3000);
}


document.getElementById("load-more").addEventListener("click", () => {
  page++;
  returnMovies(APILINK(page));
});

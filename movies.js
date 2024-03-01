// Author: Alex Brown
// ISU Netid : albrown3@iastate.edu
// Date : Feb 26, 2024

class Movie{
    constructor(title, year, description, format, genre, url){
        this.title = title;
        this.year = year;
        this.description = description;
        this.format = format;
        this.genre = genre;
        this.url = url;
    }
}

var information = [];
fetch("./itemsComplete.json")
.then(response => response.json())
.then(myMovies => loadMovies(myMovies));

function loadMovies(myMovies){
    var cards = [];
    var CardMovie = document.getElementById("col");
    for(var i = 0; i<myMovies.movies.length; i++){
        var card = "card" + i.toString();
        let title = myMovies.movies[i].title;
        let year = myMovies.movies[i].year;
        let url = myMovies.movies[i].img_url;
        let genre = myMovies.movies[i].genre;
        let description = myMovies.movies[i].description;
        let format = myMovies.movies[i].format;
        let movie = new Movie(title,year,description,format,genre,url);
        information.push(movie);

        let AddCardMovie = document.createElement("div");
        AddCardMovie.classList.add("col");
        AddCardMovie.innerHTML = `
        <div id="${card}" class="card shadow-sm">
        <img src=${url} class="card-img-top" alt="${title}'s poster."></img>
         <div class="card-body">
          <p class="card-text"><strong>${title}</strong>(${year})</p>
          <div class="d-flex justify-content-between align-items-center">
            
          </div>
        </div>
      </div>`;
      CardMovie.appendChild(AddCardMovie);
      let ccard = document.getElementById(card);
      cards.push(ccard);
    }
    cards.forEach((cardParam, index) => {
        cardParam.addEventListener("click", acknowledge);
        cardParam.myParam = index;
        cardParam.CardMovie = CardMovie;
    });
}
function acknowledge(evt){
    console.log("Clicked " + information[evt.currentTarget.myParam].title);
    let location = document.getElementById("rightBar");
    let pannels = document.getElementById("pannels");
    let index = evt.currentTarget.myParam;
    location.innerHTML = "";
    let addSelected = document.createElement("div");
    addSelected.innerHTML = `<img src="${information[index].url}" alt="${information[index].title}'s poster." style="width: 100%"><h1>${information[index].title} (${information[index].year})</h1>
    <p><strong>${information[index].genre}</strong> - <strong>${information[index].format}</strong></p>
    <p>${information[index].description}</p>
    `;
    pannels.style.width = "65%";
    location.style.width = "35%";
    location.style.display = "block";
    location.appendChild(addSelected);

}
// cardParam.addEventListener("click", () => {
//     let location = document.getElementById("rightBar");
//     location.innerHTML = "";
//     let addSelected = document.createElement("h1");
//     addSelected.innerHTML = `${information[index].title}`;
// });


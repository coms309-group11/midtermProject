// Author: Alex Brown
// ISU Netid : albrown3@iastate.edu
// Date : Feb 26, 2024

class Song{
    constructor(title,runtime,side){
        this.title = title;
        this.runtime = runtime;
        this.side = side;
    }
}

class Album{
    constructor(title, artist, year, description, format, songs, genre, url){
        this.title = title;
        this.artist = artist;
        this.year = year;
        this.description = description;
        this.format = format;
        this.songs = songs;
        this.genre = genre;
        this.url = url;
    }
}

var information = [];
fetch("./itemsComplete.json")
.then(response => response.json())
.then(myMusic => loadMovies(myMusic));

function loadMovies(myMusic){
    var cards = [];
    
    var CardMusic = document.getElementById("col");
    for(var i = 0; i<myMusic.music.length; i++){
        var songs = [];
        var card = "card" + i.toString();
        let title = myMusic.music[i].title;
        let artist = myMusic.music[i].artist;
        let year = myMusic.music[i].year;
        let url = myMusic.music[i].img_url;
        let genre = myMusic.music[i].genre;
        let description = myMusic.music[i].description;
        let format = myMusic.music[i].format;
        for(var j = 0; j<myMusic.music[i].songs.length; j++){
            let song = new Song(myMusic.music[i].songs[j].title,myMusic.music[i].songs[j].runtime,myMusic.music[i].songs[j].side);
            songs.push(song);
        }
        let album = new Album(title,artist,year,description,format,songs,genre,url);
        information.push(album);

        let AddCardMusic = document.createElement("div");
        AddCardMusic.classList.add("col");
        AddCardMusic.innerHTML = `
        <div id="${card}" class="card shadow-sm">
        <img src=${url} class="card-img-top" alt="${title}'s poster." style="height: 100%; width: 100%;"></img>
         <div class="card-body">
          <p class="card-text"><strong>${title}</strong>(${year})</p>
          <div class="d-flex justify-content-between align-items-center">
            
          </div>
        </div>
      </div>`;
      CardMusic.appendChild(AddCardMusic);
      let ccard = document.getElementById(card);
      cards.push(ccard);
    }
    cards.forEach((cardParam, index) => {
        cardParam.addEventListener("click", acknowledge);
        cardParam.myParam = index;
        cardParam.CardMusic = CardMusic;
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
    <table id="tracklist"><tr><th>Track Name</th><th>Side</th><th>Runtime</th></tr><table>
    `;
    pannels.style.width = "65%";
    location.style.width = "35%";
    location.style.display = "block";
    location.appendChild(addSelected);
    let list = document.getElementById("tracklist");
    information[index].songs.forEach((songParam,indexNew) => {
        console.log(information[index].songs[indexNew].title);
        let addTrack = document.createElement("tr");
        addTrack.innerHTML = `
        <th>${information[index].songs[indexNew].title}</th>
        <th>${information[index].songs[indexNew].side}</th>
        <th>${information[index].songs[indexNew].runtime}</th>
        `;
        list.appendChild(addTrack);
    });

}
// cardParam.addEventListener("click", () => {
//     let location = document.getElementById("rightBar");
//     location.innerHTML = "";
//     let addSelected = document.createElement("h1");
//     addSelected.innerHTML = `${information[index].title}`;
// });


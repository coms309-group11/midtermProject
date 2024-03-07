

class Item{
    constructor(title,description,url){
        this.title = title;
        this.description = description;
        this.url = url;
    }
}

var information = [];
fetch("./itemsComplete.json")
.then(response => response.json())
.then(myMisc => loadMovies(myMisc));

function loadMovies(myMusic){
    var cards = [];
    
    var CardMisc = document.getElementById("col");
    for(var i = 0; i<myMisc.misc.length; i++){
        var card = "card" + i.toString();
        let title = myMisc.misc[i].title;
        let url = myMisc.misc[i].img_url;
        let description = myMisc.misc[i].description;
        let format = myMisc.misc[i].format;
        let miscItem = new Item(title,description,url);
        information.push(miscItem);

        let AddCardMisc = document.createElement("div");
        AddCardMisc.classList.add("col");
        AddCardMisc.innerHTML = `
        <div id="${card}" class="card shadow-sm">
        <img src=${url} class="card-img-top" alt="${title}'s poster." style="height: 100%; width: 100%;"></img>
         <div class="card-body">
          <p class="card-text"><strong>${title}</strong></p>
          <div class="d-flex justify-content-between align-items-center">
            
          </div>
        </div>
      </div>`;
      CardMisc.appendChild(AddCardMisc);
      let ccard = document.getElementById(card);
      cards.push(ccard);
    }
    cards.forEach((cardParam, index) => {
        cardParam.addEventListener("click", acknowledge);
        cardParam.myParam = index;
        cardParam.CardMusic = CardMisc;
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
    <table id="tracklist"><tr><th>Track Name              </th><th>Side                </th><th>Runtime</th></tr><table>
    `;
    pannels.style.width = "65%";
    location.style.width = "35%";
    location.style.display = "block";
    location.appendChild(addSelected);
    let list = document.getElementById("items");
    // information[index].songs.forEach((songParam,indexNew) => {
    //     console.log(information[index].songs[indexNew].title);
    //     let addTrack = document.createElement("tr");
    //     addTrack.innerHTML = `
    //     <th>${information[index].songs[indexNew].title}</th>
    //     <th>${information[index].songs[indexNew].side}</th>
    //     <th>${information[index].songs[indexNew].runtime}</th>
    //     `;
    //     list.appendChild(addTrack);
    // });

}
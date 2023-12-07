let mountains = []
const apiMountainsUrl = "http://localhost:3000/Mountains"

document.addEventListener("DOMContentLoaded", ()=>{
    const selectMountain = document.getElementById("selectMountain");
    selectMountain.onchange = filterMountain;


    fetch(apiMountainsUrl).then(response => response.json())
                          .then(mountains => {
                            loadSelectList(mountains);   
                         })
})

function loadSelectList(mountainsArray) {
    const selectMountain = document.getElementById("selectMountain");

    const length = mountainsArray.length;
    for (let i = 0; i < length; i++) {
        let option = document.createElement("option");
        option.textContent = mountainsArray[i].Name; 
        selectMountain.appendChild(option);
    }
}

function filterMountain() {
    let selected = document.getElementById("selectMountain").value;
    let mountain = {};
    let queryString = `?Name=${selected}`
    fetch(apiMountainsUrl + queryString).then(response => response.json())
                                        .then(mountains => {
                                            displayMountain(mountains[0]);   
                                        })
  
    displayMountain(mountain)
}

function displayMountain(mountain) {
    const parentDiv = document.getElementById("displayMountainInfo");
    parentDiv.innerText = "";

    // create a div for each product
    const mountainDiv = document.createElement("div");
    mountainDiv.classList.add("mountain") ;

    // add product to the container
    parentDiv.appendChild(mountainDiv);

   // create the product info div 
    const mountainInfoDiv = document.createElement("div");
    mountainDiv.appendChild(mountainInfoDiv);

    getMountainName(mountain, mountainInfoDiv)
    getMountainImage(mountain, mountainInfoDiv)
    getMountainDescription(mountain, mountainInfoDiv)
    getMountainEffort(mountain, mountainInfoDiv)
    getMountainEleveation(mountain, mountainInfoDiv)
    //getSunsetForMountain(mountain, mountainInfoDiv)    
} 

function getMountainName(mountain, mountainInfoDiv) {
    const mountainName = document.createElement("h1");
    mountainName.innerText = mountain.Name;
    mountainInfoDiv.appendChild(mountainName);
}

function getMountainImage(mountain, mountainInfoDiv) {
    const img = document.createElement("img");
    img.src = "images/" + mountain.Img;
    img.id = "mountainImage"
    mountainInfoDiv.appendChild(img);
}

function getMountainDescription(mountain, mountainInfoDiv) {
    const mountainDescription = document.createElement("p");
    mountainDescription.innerText = mountain.Desc;
    mountainDescription.id = "mountainDescription"
    mountainInfoDiv.appendChild(mountainDescription);
}

function getMountainEffort(mountain, mountainInfoDiv) {
    const mountainEffort = document.createElement("p");
    mountainEffort.innerHTML = `Effort: <span class ="mountainDetails"> ${mountain.Effort} </span>`;
    mountainEffort.id = "info"
    mountainInfoDiv.appendChild(mountainEffort);
}

function getMountainEleveation(mountain, mountainInfoDiv) {
    const mountainElevation = document.createElement("p");
    mountainElevation.innerHTML = `Elevation: <span class ="mountainDetails"> ${mountain.Elevation} ft. </span>`;
    mountainElevation.id = "info"
    mountainInfoDiv.appendChild(mountainElevation);
}

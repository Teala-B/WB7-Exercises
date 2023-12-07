   const locationsArray = [
    "Alabama",
    "Alaska",
    "American Samoa",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "DC",
    "Florida",
    "Georgia",
    "Guam",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Puerto Rico",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virgin Islands",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming"
]
let parks = []
const apiNationalParksUrl = "http://localhost:3000/NationalParks"

document.addEventListener("DOMContentLoaded", ()=>{
    const selectLocation = document.getElementById("selectLocation");
    const selectType = document.getElementById("selectType")
    selectLocation.onchange = filterByState;
    selectType.onchange = filterByState;

     fetch(apiNationalParksUrl).then(response => response.json())
                          .then(parks => {
                            getSelectList(parks);   
                         })

    //displayParks(nationalParksArray)
})

function getSelectList() {
    const length = locationsArray.length;
    for (let i = 0; i < length; i++) {
        let option = document.createElement("option");
        option.textContent = locationsArray[i];
        selectLocation.appendChild(option);
    }

    const lengthTwo = parkTypesArray.length;
    for (let i = 0; i < lengthTwo; i++) {
        let option = document.createElement("option");
        option.textContent = parkTypesArray[i];
        selectType.appendChild(option);
    }

}

function filterByState() {
    //this code fires everytime they make a change
                
    let selected = document.getElementById("selectLocation").value;
    const parks = [];
    for(i=0; i< nationalParksArray.length; i++){
        if(nationalParksArray[i].State == selected || selected == "All Locations"){
            parks.push(nationalParksArray[i]);
        }
    }

    //let park = {};
    let queryString = `?State=${selected}`
    fetch(apiNationalParksUrl + queryString).then(response => response.json())
                                        .then(parks => {
                                            displayMountain(parks);   
                                        })
  
    //displayMountain(mountain)


    filterByType(parks)
}

function filterByType(parks) {
    let selected = document.getElementById("selectType").value;
    let filteredParks = parks;
    if(selected != "All Park Types"){
        filteredParks = filteredParks.filter(n => n.LocationName.indexOf(selected) >= 0)
    }
    
    displayParks(filteredParks) 
}

function displayParks(filteredParks) {
    const parentDiv = document.getElementById("displayParks");
    parentDiv.innerText = "";

    filteredParks.forEach(park => {
        individulPark(park, parentDiv)
    });
        
} 

function individulPark(park, parentDiv) {
    // create a div for each product
    const parkDiv = document.createElement("div");
    parkDiv.classList.add("park") ;
    // add product to the container
    parentDiv.appendChild(parkDiv);
 // create the product info div 
    const parkInfoDiv = document.createElement("div");
    parkDiv.appendChild(parkInfoDiv);

    addName(park, parkInfoDiv);
    addAddress(park, parkInfoDiv);
    addContact(park, parkInfoDiv);
    addSite(park, parkInfoDiv);
}

function addName(park, parkInfoDiv) {
    // add product header
    const parkName = document.createElement("h4");
    parkName.innerText = park.LocationName;
    parkInfoDiv.appendChild(parkName);
}

function addAddress(park, parkInfoDiv) {
    const parkAddress = document.createElement("p");

    parkAddress.innerText = "Address: ";
    for (const key in park) {
        if (key == "Address" || key == "City" || key == "Zip") {
            if(park[key] != 0) parkAddress.innerText +=` ${park[key]}`;
        }
        else if (key == "State")parkAddress.innerText +=`, ${park[key]}`;
    }
    
    parkInfoDiv.appendChild(parkAddress);
    
}

function addContact(park, parkInfoDiv) {
    const contactInfo = document.createElement("p");
    for (const key in park) {
        if (key == "Phone") {
            if(park[key] != 0) contactInfo.innerText +=`Phone: ${park[key]}`;
        }
        else if (key == "Fax") {
            if(park[key] != 0) contactInfo.innerText +=` Fax: ${park[key]}`;
        }
    }
    
    parkInfoDiv.appendChild(contactInfo);
}

function addSite(park, parkInfoDiv) {
    const site = document.createElement("a");
    for (const key in park) {
        if(key == "Visit") {
            if (park[key] != undefined) {
                site.href = park[key];
                site.target = "_blank";
                site.innerText += `Visit: ${park[key]}`;
            }
        }
    }

    parkInfoDiv.appendChild(site)

}
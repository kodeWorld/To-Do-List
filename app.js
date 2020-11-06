// Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Classes name
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST = [],
    id = 0;
// Get Items from local storage
let data = localStorage.getItem("TODO");

// Check if data is not empty
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length; // Sets id to the last on the list
    loadList(LIST); // Loads the list to the UI
} else {
    // if data isn't empty
    LIST = [];
    id = 0;
}

// Load items to UI
function loadList(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// Add items to local storage
localStorage.setItem("TODO", JSON.stringify(LIST));

// Clear local storage

clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

// Show today's date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-us", options);

// Add to do function
function addToDo(toDo, id, done, thrash) {
    if (thrash) { return; }
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";


    const item = `
                <li class="item">
                <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                <p class="text ${LINE}">${toDo}</p>
                <i class="fa fa-trash-o de" job="delete" id=${id}></i>
                </li>  
                `;
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

// Add item to list using enter key
document.addEventListener("keyup", function(even) {
    if (event.keyCode == 13) {
        const toDo = input.value;

        // if the input isn't empty    
        if (toDo) {
            addToDo(toDo);
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            // Add items to local storage
            localStorage.setItem("TODO", JSON.stringify(LIST));

        }
        input.value = "";
    }
});

// Complete to do
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;

}

// Remove to do
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// Target the items created dynamically

list.addEventListener("click", function(event) {
    const element = event.target; // Return clicked element inside list
    const elementJob = element.attributes.job.value; // Complete or delete

    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
    }
    // Add items to local storage
    localStorage.setItem("TODO", JSON.stringify(LIST));

});
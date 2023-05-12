console.log("main.js is working");

// set limit on number of cards that can be created
const MAX_CARDS = 6;
let numCards = 0;



function init() {
    fetch("http://localhost:3000/Fruits")
    .then(res => res.json())
    .then(fruits => { 
        createSelectionOptions(fruits);
        handleSelectFruit(fruits);
        showFruitForm();
    });
}    
init();


// create selection dropdown list and sets a placeholder
function createSelectionOptions(fruits) {
    // this is the select buttonsId
    const fruitList = document.getElementById('fruitList');
        
    // create a placeholder option in select dropdown list
    const placeholderOption = document.createElement('option');
    // makes placeholder unselectable
    placeholderOption.disabled = true;
    // sets as default
    placeholderOption.selected = true;
    // sets text and append
    placeholderOption.text = "Fruit";
    fruitList.appendChild(placeholderOption);

    fruits.forEach(fruit => {
        // create an option for each individual fruit
        const option = document.createElement('option');
        // set the option's value and text to the fruit's name
        option.value = fruit.name;
        option.text = fruit.name;
        // apend each fruit name to option value and text
        fruitList.appendChild(option);
    })     
}


// handle selections from selectFruitDiv including dropdown list fruit selection and clear button 
function handleSelectFruit(fruits) {
    const fruitSelectButton = document.getElementById('fruitSelectButton');
    fruitSelectButton.addEventListener('click', () => {
        // retrieve selected fruit from dropdown list
        const fruitListValue = document.getElementById('fruitList').value;
        // search through fruits object and find fruit name that matches the selected dropdown list fruit
        // set fruit variable to matching dropdown selection
        const fruit = fruits.find(fruit => fruit.name === fruitListValue);
        

        // set max on fruit comparison selections
        if(numCards >= MAX_CARDS) {
            alert('You have selected the maximum number of fruit comparisons');
        } else {
            createCard(fruit);
            numCards ++;
        }

        // grab clear button and attach eventListener to clear selections and addFruitsForm
        const clearButton = document.getElementById('clearButton');
        clearButton.addEventListener('click', clearSelections);
        clearButton.addEventListener('click', () => document.getElementById('addFruitsForm').style.display = 'none')

        // set the selected index of fruitList to 0 so placeholder shows and clear divs
        const fruitList = document.getElementById('fruitList');
        fruitList.selectedIndex = 0; 

    });
}


function createCardElement() {
    // create card div elements in js and assign classList
    const cards = document.createElement('div');
    cards.classList = 'cards';
    return cards;
}


// create heading for card
function createFruitHeading(fruit, isDropDownSelected){
    const fruitHeading = document.createElement('h2');
    // populate headings
    if(isDropDownSelected = false) {
        fruitHeading.innerText = document.getElementById('fruitName').value;
    } else {
        fruitHeading.innerText = fruit.name
    }
    return fruitHeading;
}


// create nutritional values
function createNutritionalValues(fruit) {
    const properties = Object.keys(fruit.nutrition).map((key) => {
        const p = document.createElement("p");
        p.innerText = `${key.toUpperCase()}: `;
        const span = document.createElement("span");
        span.innerText = fruit.nutrition[key];
        p.appendChild(span);
        return p;
    });
    return properties;
}


// create delete button on cards
function createDeleteButton() {
    // create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = ' x ';

    // add eventListener to delete button
    deleteBtn.addEventListener('click', deleteCard);
    return deleteBtn;
}


// create the card 
function createCard(fruit, isDropDownSelected) {
    const cards = createCardElement();
    const fruitHeading = createFruitHeading(fruit, isDropDownSelected);
    cards.appendChild(fruitHeading);
    const properties = createNutritionalValues(fruit);
    properties.forEach((property) => {
        cards.appendChild(property);
    });
    const deleteBtn = createDeleteButton();
    cards.appendChild(deleteBtn);
    const fruitsPickedDiv = document.getElementById("fruitsPickedDiv");
    fruitsPickedDiv.appendChild(cards);
}


// create function to delete card
function deleteCard(e) {
    e.target.parentNode.remove();
    numCards --;
}

// create function to clear all selections and start over
function clearSelections() {   
    // set the selected index of fruitList to 0 so placeholder shows and clear divs
    fruitList.selectedIndex = 0;
    fruitsPickedDiv.innerHTML = '';
    // reset counter  
    numCards = 0;  
    document.getElementById('addFruitsForm').style.display = 'none';
    // clear form
    document.forms['addFruitsForm'].reset()
}

// shows form when clicking add new fruit
function showFruitForm() {
    // get add fruit button and add fruit form and assign variables
    const addNewFruitButton = document.getElementById('addNewFruit');
    const addNewFruitForm = document.getElementById('addFruitsForm')
 
    // add eventListener to display form
    addNewFruitButton.addEventListener('click', () => {
        addNewFruitForm.style.display = 'block';
    })
    addNewFruitForm.addEventListener('submit', handleSubmit);
    // hide form after submitting
    addNewFruitForm.addEventListener('submit', () => document.getElementById('addFruitsForm').style.display = 'none');
}




// need to clear form after adding fruit to add back to back fruits
// adds fruit to dropdown list but page needs refreshed first
function addAfruit(fruitObj) {
    fetch("http://localhost:3000/Fruits", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(fruitObj)
    })
    .then(res => res.json())
    .then(fruit => console.log(fruit))
}



// handle submit on 'add new fruit' form
function handleSubmit(e) {
    e.preventDefault();
    // set argument to false for create card function fruit heading name
    let isDropDownSelected = false;
    // create an object to pass to the 'add a fruit' function and POST
    let fruitObj = {
        'name':e.target.fruitName.value,
        'nutrition': {
            calories:e.target.calories.value,
            fat:e.target.fat.value,
            sugar:e.target.sugar.value,
            carbs:e.target.carbs.value,
            protein:e.target.protein.value
        }   
    };


    // set max on fruit comparison selections
    if(numCards >= MAX_CARDS) {
        alert('You have selected the maximum number of fruit comparisons');
    } else {
        createCard(fruitObj);
        numCards ++;
    }
  
    // pass add a fruit the fruit obj
    addAfruit(fruitObj)
    // clear form
    document.forms['addFruitsForm'].reset()
}
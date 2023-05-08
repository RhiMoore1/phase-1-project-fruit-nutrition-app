console.log("main.js is working");

// set limit on number of cards that can be created
const MAX_CARDS = 6;
let numCards = 0;

fetch("http://localhost:3000/Fruits")
    .then(res => res.json())
    .then(fruits => {
        // this is the select buttonsId
        const fruitList = document.getElementById('fruitList');
        
        // create a placeholder option in select dropdown list
        const placeholderOption = document.createElement('option');
        // makes placeholder unselectable
        placeholderOption.disabled = true;
        // sets as default
        placeholderOption.selected = true;
        // sets text and append
        placeholderOption.text = "Select a fruit";
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

        // add submit button event listener to the form
        const form = document.querySelector('form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // set max on fruit comparison selections
            if(numCards >= MAX_CARDS) {
                alert('You have selected the maximum number of fruit comparisons');
                return;
            }

            // retrieve selected fruit from dropdown list
            const fruitListValue = document.getElementById('fruitList').value;
            // search through fruits object and find fruit name that matches the selected dropdown list fruit
            // set fruit variable to matching dropdown selection
            const fruit = fruits.find(fruit => fruit.name === fruitListValue);
            
            createCard(fruit);
            numCards ++;
        });
    });

// create each fruit card function
function createCard(fruit) {
    // create card div elements in js and assign classList
    const cards = document.createElement('div');
    cards.classList = 'cards';

    // create heading for card
    const fruitHeading = document.createElement('h2');
    // populate headings
    fruitHeading.innerText = fruit.name;
    // apend heading to card
    cards.appendChild(fruitHeading);

    // iterate through the nutrition properties and create the corresponding DOM elements
    Object.keys(fruit.nutrition).forEach((key) => {
    const p = document.createElement("p");
    p.innerText = `${key}: ${fruit.nutrition[key]}`;
    cards.appendChild(p);
    });

    // append the new card to the fruitsPickedDiv
    const fruitsPickedDiv = document.getElementById("fruitsPickedDiv");
    fruitsPickedDiv.appendChild(cards);

    // create delete button
    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete-btn')
    deleteBtn.textContent = ' x ';
    cards.appendChild(deleteBtn);

    // add eventListener to delete button
    deleteBtn.addEventListener('click', deleteCard)
}


// create function to delete card
function deleteCard(e) {
    e.target.parentNode.remove();
    numCards --;
}
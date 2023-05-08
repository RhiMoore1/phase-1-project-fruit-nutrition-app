console.log("main.js is working");


fetch("http://localhost:3000/Fruits")
    .then(res => res.json())
    .then(fruits => {
        // this is the select buttonsId
        const fruitList = document.getElementById('fruitList');
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

            // retrieve selected fruit from dropdown list
            const fruitListValue = document.getElementById('fruitList').value;
            // search through fruits object and find fruit name that matches the selected dropdown list fruit
            // set fruit variable to matching dropdown selection
            const fruit = fruits.find(fruit => fruit.name === fruitListValue);
            
            console.log(fruit)
            
        });

    });


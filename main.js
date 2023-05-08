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
    });



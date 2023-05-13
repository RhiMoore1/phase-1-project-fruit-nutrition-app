# phase-1-project-fruit-nutrition-app
The Fruit Nutrition App allows users to pick different fruit and view nutritional information of the fruit.
A user is also able to customize the app by adding new fruit and nutritional profiles to the fruit app
database.

All fruit information used in the Fruit Nutrition App was gathered from the Fruityvice api database and
is based off 100 grams of fruit which is just under half a cup.


To get started select a fruit from the 'Fruit' dropdown list and then click the 'Select Fruit' button.
A card is then displayed on the screen containing the name of the choosen fruit and the coresponding
nutritional information including fat, calories, carbs and protein.  By clicking on the 'Fruit' dropdown 
list again, the user is able to choose another fruit, click the 'Select Fruit' button, and add another 
fruit card to the screen.  Comparisons can now be made between fruits and help the user make informed 
decisions based off personal health goals.  


The Fruit Nutrition App currently has 23 of the most common fruits in it's database.  Some users will 
prefer to add new fruits to customize their database.  In order to achieve this, click on the 'Add New
Fruit' button.  A form then populates for the user to fill in the fruit name and nutritional values. All
of the form values are set to 'required' in order to submit the form.  After filling in the form data and
clicking the 'Submit' button, a newly added fruit is added to the database and a new fruit card is added
to the screen.  


There is a 'Max Card' limit of 6 cards allowed for comparisons at one time.  The 'Max Card' count was 
implemented to keep screen clutter down and improve user experience via ease of visual comparison between 
fruits.  


If there are already 6 cards displayed on the screen, choosing a fruit from the dropdown list and 
clicking the 'Select Fruit' button will display an alert 'You have selected the maximum number of fruit 
comparisons' and no new cards are added to the screen.  The same alert is displayed if the 'Add New Fruit'
button is clicked and the form is not displayed. 


In order to reduce the number of cards displayed on the screen, the user has two options.  

1. By clicking on the small 'x' in the upper right hand corner of the fruit card, the card is removed from 
the screen and the current card count is lowered by one.  The database is not effected by this card removal.  

2. If all of the cards need to be removed from the screen to start over with the comparisons, the 'Clear 
Selections' button is the best option. This button will remove all displayed fruit cards from the screen, 
as well as the 'Add New Fruit' form, if currently displayed.  Again, the database is not effected by these
removals.  The card count is then set to 0.

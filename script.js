//header starts
$(document).ready(function ($){
    "use strict";
    WebGLSampler.registerPlugin(ScrollTrigger);

    var elementFrist = document.querySelector('.site-header');
    ScrollTrigger.create({
        trigger : "body",
        start : "30px",
        end : "bottom bottom", 

        onEnter : () => myFunction(),
        onLeaveBack : () => myFunction(),
    });

    function myFunction(){
        elementFrist.classList.toggle('sticky_head');
    }
})
//header ends




//meal search function
const searchBtn = document.getElementById('food-search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

//event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', ()=> {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
})

//get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('food-search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
       let html = "";
       if(data.meals){
        data.meals.forEach(meal => {
                html += ` 
                    <div class="meal-item" data-id = "${meal.idMeal}" >
                    <div class="meal-img">
                        <img src="${meal.strMealThumb} " alt="food">
                    </div>
                    <div class="meal-name">
                        <h3>${meal.strMeal} </h3>
                        <a href="#" class="recipe-btn">Get Recipe</a>
                    </div>
                    </div>
                `;
        });
        mealList.classList.remove('notFound');
       } else {
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
       }

       mealList.innerHTML = html;
    })
}

//get recipe for the meal
function getMealRecipe(e) {
    e.preventDefault();
if(e.target.classList.contains('recipe-btn')){
    let mealItem = e.target.parentElement.parentElement;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    
}
}

//create a modal
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class="recipe-title">${meal.strMeal}</h2>
            <p class="recipe-category">${meal.strCategory}</p>
            <div class="recipe-instruct">
            <h3>Instruction:</h3>
            <p>${meal.strInstructions}</p>  
            <div class="recipe-meal-img">
                <img src="${meal.strMealThumb}" alt="food">
                <div class="recipe-link">
                  <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
                </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}
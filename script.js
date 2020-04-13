const main =  document.getElementById('main');
const addUserBtn =  document.getElementById('add-user');
const doubleBtn =  document.getElementById('double');
const showMillionariesBtn =  document.getElementById('show-millionaires');
const sortBtn =  document.getElementById('sort');
const calculateWealthBtn =  document.getElementById('calculate-wealth');

let data = [];

getRamdomUser();
getRamdomUser();
getRamdomUser();

//fetch random user and add money
// function getRamdomUser() {
//     fetch('https://randomuser.me/api')
//         .then(res => res.json())
//             .then(data => console.log(data))
// }
//Above code can be written using asyn kewword before fun

async function getRamdomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    // console.log(data);
    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };
    // console.log(newUser);
    addData(newUser);
}

//marking the function as asynch by writting the keyword async 
//before fun. and result from the fetch request we can put into
//a variable. fetch is synchronous means we need to wait till 
//it returns promise once its finished. So we put wait in front.
//with fetch Api we have to get data by calling res.json so we
//can create another vriable called data.

function updateDOM(providedData = data) {
    //Clear the main div
    main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`;

    //Basically we used to do like this
    // for(i = 0; i< providedData.length; i++) {
    //     providedData[i].name = '';
    // }

    //forEach
    // providedData.forEach(function(item) => {
        
    // });

    //forEach more shotcut
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong>${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

//1. Add new obj to data arr
function addData(obj) {
    data.push(obj);

    updateDOM();
}

//Format number as money
function formatMoney(number) {
    return '$' + (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//2. Doble every user money 
function doubleMoney() {
    data = data.map(user => {
        return {...user, money: user.money * 2};
        //returning in an object, using spread operator to copy what we have in the user object
    });

    updateDOM();
}

//3. Sort user by richest
function sortByRichest() {
    data.sort((a, b) => b.money - a.money);

    updateDOM();
}

//4. Filter only millionaires
function showMillionaries() {
    data = data.filter(user => user.money > 1000000);

    updateDOM();
}

//5. Calculate the total wealth
function calculateWealth() {
    const wealth  = data.reduce((acc, user) => (acc += user.money), 0);

    // console.log(formatMoney(wealth));
    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthElement);
}

//Event Listener
addUserBtn.addEventListener('click', getRamdomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionariesBtn.addEventListener('click', showMillionaries);
calculateWealthBtn.addEventListener('click', calculateWealth);
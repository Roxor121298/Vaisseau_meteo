import { fetchData } from "./meteo-api"

// Pour changer de niveau (primtemps, automne ou hiver)
import { chooseLvl } from "./util"

// Pour la class EvilBug qui poursuit la souris ()
import {Evilbug} from './sprites/bugs_basic'

import {Ship} from './sprites/ship'

// menu pour la temperature ou revenir a la page d'index

let menu
// pour la meteo specifiquement
let menuMeteo

// Vaisseau du jouet et variable buffer lui étant attribué (je l'ai jamais utilisé peut être mais elle est là au cas ou)
let bufferXY
let mainShip 

export let bulletsList = []


//liste des bugs qui chase le joueurs
export let allBugs = []


// valeur string du niveau de jeu (pas == a la classe mais aun nom (Primtemps, Hivers, Automne))
let lvlVal

// fnl jai mit weatherData comme un varaible globale 
let weatherData1
let weatherData2
let weatherData3

let currentWeather

export let xChase
export let yChase 


// "prendre" l'async et le fetchData "pour du cash"
window.addEventListener("load", async () => {
    weatherData1 = await fetchData(13.7563, 100.5018) //C'est mtn Bangok (thème printemps)
    weatherData2 = await fetchData(79.2709,96.5621) // Ile de la révolution d'octobre (Gulag) (thème hivers)
    weatherData3 = await fetchData(-41.2865,174.7762) // Wellington Nouvelle zélande (thème automne)
    //console.log(weatherData)
    creerNiveau()
    creerMenu()
})

//Reminder comment utiliser weatherData

        // Printemps
        // {time: Tue Jan 23 2024 15:30:00 GMT-0500 (heure normale de l’Est nord-américain), temperature: -13, apparentTemperature: -17, isDay: 0, precipitation: 0, …}
        // apparentTemperature: -17
        // isDay: 0
        // precipitation: 0
        // rain: 0
        // showers: 0
        // snowfall: 0
        // temperature: -13
        // time: Tue Jan 23 2024 15:30:00 GMT-0500 (heure normale de l’Est nord-américain)
        // windSpeed10m: 2
        // [[Prototype]]: Object


const creerMenu = () => {
    menu = document.querySelector("#menu_container")
    let meteo = currentWeather

    menuMeteo = document.createElement("div")
    menuMeteo.classList.add("meteo")

    menuMeteo.textContent += "La meteo temperature en celsius est de : " + meteo.temperature 

    menu.appendChild(menuMeteo)
}

// Ici création initiale du niveau puis lancement du premier tick
const creerNiveau = () => {
    lvlVal = localStorage.getItem("lvlnumb")
    let bgVal = getNiveau(lvlVal)
    let background = document.createElement("img")
    background.classList.add(bgVal)

    document.body.appendChild(background)

    mainShip = new Ship(60,60)
    spawnBug()
    tick()
    gameOn()
}


// pour get le bon niveau (séparer pour s on voudrait changer in game plus tard)
const getNiveau = (lvlVal) => {
    //console.log(lvlVal)
    let rep = "background1"
    currentWeather = weatherData1
    if(lvlVal == "Hivers"){
        rep = "background2"
        currentWeather = weatherData2
    }
    else if (lvlVal == "Automne") {
        rep = "background3"
        currentWeather = weatherData3
    }
    return rep
}

//Reminder comment utiliser weatherData

        // Printemps
        // {time: Tue Jan 23 2024 15:30:00 GMT-0500 (heure normale de l’Est nord-américain), temperature: -13, apparentTemperature: -17, isDay: 0, precipitation: 0, …}
        // apparentTemperature: -17
        // isDay: 0
        // precipitation: 0
        // rain: 0
        // showers: 0
        // snowfall: 0
        // temperature: -13
        // time: Tue Jan 23 2024 15:30:00 GMT-0500 (heure normale de l’Est nord-américain)
        // windSpeed10m: 2
        // [[Prototype]]: Object


//tick de jeu ("main" tick)

const spawnBug = () => {

    let x = Math.floor((Math.random() * 70) + 10)
    let y = Math.floor(Math.random() * 100)

    //console.log("Positions x et y : " + x + " , " + y)


    let skin = weatherMinion()

    allBugs.push(new Evilbug(x,y,skin))

    setTimeout(spawnBug, 3000)
}

const tick = () => {

    for(let i = 0 ; i < allBugs.length; i++){
        const onebug = allBugs[i]
        onebug.tick()
    }

    for(let i = 0 ; i < bulletsList.length; i++){
        const onebullet = bulletsList[i]
        onebullet.tick()
    }

    mainShip.tick()

    window.requestAnimationFrame(tick)
}

const weatherMinion = () => {

    let weatherbug = "./img/bugs/SwoopingBat.gif";

    if(currentWeather.apparentTemperature > 15){
        weatherbug = "./img/bugs/BloodshotEyeIdleSide.gif";
    }

    if(currentWeather.apparentTemperature < 0){
        weatherbug ="./img/bugs/PlagueBat.gif"
    }
    return weatherbug
}

const gameOn = () => {

    // Pour la souris 
    document.onmousemove = (e) => {
        xChase = e.x
        yChase = e.y

        //console.log(xChase)
        //console.log(yChase)
    }

    // Pour les event clavier pour la température
    document.onkeydown = (event) => {
        if (event.code === "ArrowUp") {
            currentWeather.apparentTemperature +=5
            menuMeteo.textContent = "La meteo temperature en celsius est de : " + currentWeather.apparentTemperature
            console.log("La température monte!! : " + currentWeather.apparentTemperature);
            
        }
        if (event.code === "ArrowDown") {
            currentWeather.apparentTemperature -=5
            menuMeteo.textContent = "La meteo temperature en celsius est de : " + currentWeather.apparentTemperature
            console.log("La température descend!! : " + currentWeather.apparentTemperature);
        }
    }
    

}






    
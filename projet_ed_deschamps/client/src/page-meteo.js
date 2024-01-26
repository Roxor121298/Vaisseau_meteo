import { fetchData } from "./meteo-api"

// Pour changer de niveau (primtemps, automne ou hiver)
import { chooseLvl } from "./util"

// Pour la class EvilBug qui poursuit la souris ()
import {Evilbug, BigBeaver} from './sprites/bugs_basic'

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
let beaver = 0
export const setBeaver = (e) => {
    beaver = e
}


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

const creerMenu = () => {
    menu = document.querySelector("#menu_container")
    let meteo = currentWeather

    menuMeteo = document.createElement("div")
    menuMeteo.classList.add("meteo")

    menuMeteo.textContent += "La meteo temperature en celsius est de : " + currentWeather.apparentTemperature 

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


// pour get la bonne images de background
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

// J'ai fait cette fonction vendredi 10h30 pour ajouté un autre événement de température
const spawBeaver = () => {
    let y = Math.floor(Math.random() * 100)
    beaver = new BigBeaver(0,45)
}


// fonction ajoute périodiquement des bug a la list allBugs
const spawnBug = () => {

    if((currentWeather.snowfall ==  1) && (beaver == 0)){
        spawBeaver()
    }

    let x = Math.floor((Math.random() * 70) + 10)
    let y = Math.floor(Math.random() * 100)

    let skin = weatherMinion()

    allBugs.push(new Evilbug(x,y,skin))

    setTimeout(spawnBug, 2000)
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

// dépendament de la tempéreature a ace moment du jeu on change le skin des insecte qui apparaissent

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

    // Pour avoir les x et y de la souris pour que les missile et le vaisseau pointe au bon endroit
    document.onmousemove = (e) => {
        xChase = e.x
        yChase = e.y
    }

    // Les event clavier pour la température
    // fleche en haut on monte la temperature de 5 degres et on 
    document.onkeydown = (event) => {
        console.log(currentWeather.apparentTemperature)
        if (event.code === "ArrowUp") {
            currentWeather.apparentTemperature +=5
            menuMeteo.textContent = "La meteo temperature en celsius est de : " + currentWeather.apparentTemperature
            // console.log("La température monte!! : " + currentWeather.apparentTemperature)
            console.log(currentWeather)
            
        }
        if (event.code === "ArrowDown") {
            currentWeather.apparentTemperature -=5
            menuMeteo.textContent = "La meteo temperature en celsius est de : " + currentWeather.apparentTemperature
            // console.log("La température descend!! : " + currentWeather.apparentTemperature)
        }

        // Pour quitter le jeu si le Quitter est désactivé (il est désactivé par default)

        if(event.code === "Escape"){
            window.location.href = "index.html";
        }

        // pour faire neiger et spawn 1 mawingBeaver
        if(event.key.toLowerCase() === "b"){
            if(currentWeather.snowfall == 0){
                currentWeather.snowfall = 1
            }
            else{
                currentWeather.snowfall = 0
            }
            // console.log(currentWeather.snowfall)
        }
    }

    
    
}


// Fonction appelé par la mort d'un missile_chaud ou une boule_de_froid qui change la temperature
export const modificatioTemperenture = (value) => {
    currentWeather.apparentTemperature += value
    menuMeteo.textContent = "La meteo temperature en celsius est de : " + currentWeather.apparentTemperature
}






    
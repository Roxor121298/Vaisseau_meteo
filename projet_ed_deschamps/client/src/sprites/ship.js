

import {rotateElement, getElementAngle} from "../util"

import { xChase,yChase } from "../page-meteo"

import { bulletsList} from "../page-meteo"

import {Bullet} from "./bullet"

//Les attributs globaux de déplacement du vaisseau
export let shipPosX
export let shipPosY

export class Ship {
    constructor(x,y){

        //Les attributs de déplacement du vaisseau

        this.moveStep = 12

        this.leftArrowOn = false
        this.rightArrowOn = false

        this.upArrowOn = false
        this.downArrowOn = false

        shipPosX = x
        shipPosY = y

        //peut etre mettre une velocité au ship aussi demain serait cool

        // this.velocityX = 0
		// this.velocityY = 0

		// this.velocityBoost = 0.2

		// this.maxVelocityX = 8
		// this.maxVelocityY = 8

        // Les attribut de display du vaisseau

        this.node = document.createElement('img')
        
        this.node.style.width = '100px'
        this.node.style.height = '100px'
        this.node.src = "./img/ship/ship_fullHealth.png"

        this.node.style.position = 'absolute'
        this.node.style.top = x + 'px'       
        this.node.style.left = y + 'px'

        document.body.appendChild(this.node)

        // document.addEventListener('keydown', (event) => this.moveShip(event));

        // Pour bouger de droite a gauche ici

        document.addEventListener("keydown", e => {
            if (event.key.toLowerCase() == "a") {
                this.leftArrowOn = true;
            }
            else if (event.key.toLowerCase() == "d") {
                this.rightArrowOn = true;
            }
        })
        
        document.addEventListener("keyup", e => {
            if (event.key.toLowerCase() == "a"){
                this.leftArrowOn = false;
            }
            else if (event.key.toLowerCase() == "d") {
                this.rightArrowOn = false;
            }
        })
        
        
        //Pour bouger en haut et bas ici
        
        document.addEventListener("keydown", e => {
            if (event.key.toLowerCase() == "w") {
                this.upArrowOn = true;
            }
            else if (event.key.toLowerCase() == "s") {
                this.downArrowOn = true;
            }
        })
        
        document.addEventListener("keyup", e => {
            if (event.key.toLowerCase() == "w"){
                this.upArrowOn = false;
            }
            else if (event.key.toLowerCase() == "s"){
                this.downArrowOn = false;
            }
        })

        // pour tirer ici
        // pour que ca arrete de selectionner jai donenr l'option d"utiliser le e ou le click gauche de la souris

        // document.addEventListener("click", e => {
        //     this.bambam()
        // })

        document.addEventListener("keyup", e => {
            if (e.key.toLowerCase() == "e"){
                this.bambam()
            }
        })

    }

    // bouger(){
    //     //on va chercher la taille du background

    //     //On calcule la taille totale de l'image à ce moment (dépendament du resize)
    //     let width = window.innerWidth
    //     let height = window.innerHeight

    //     //console.log("nodeWidth et nodeHeight : " + nodeWidth + " , " + nodeHeight)
    //     console.log("innerWidth et innerHeight : " + width + " , " + height )

    //     console.log("shipPosX : " + shipPosX)

    //     // Si la fleche gauche est activé (correspondant a la touche a)  
    //         //Et que que la position x du vaisseau est plus grande que la taille d'un pas (moveStep)
    //     if(this.leftArrowOn && (shipPosX > this.moveStep)){
    //         shipPosX = (shipPosX - this.moveStep) 
	// 	}
    //     // Si la fleche gauche est activé (correspondant a la touche a)  
    //         // Et que la position x de la fenetre moins la taille d'un step est plus grande que la position x du vaisseau
	// 	if(this.rightArrowOn && ((width - this.moveStep) > shipPosX)){
    //         shipPosX = (shipPosX + this.moveStep)
	// 	}

    //     if(this.upArrowOn){
    //         shipPosY = (shipPosY - this.moveStep)
            
	// 	}
	// 	if(this.downArrowOn){
    //         shipPosY = (shipPosY + this.moveStep)
	// 	}

    //     this.node.style.left = shipPosX + "px"
    //     this.node.style.top = shipPosY + "px"

    // }


    // VERSION AMÉLIORER DE BOUGER()

    brrbrr() {
        const shipWidth = this.node.offsetWidth;
        const shipHeight = this.node.offsetHeight;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
    
        if(this.leftArrowOn && shipPosX > 0) {
            shipPosX = Math.max(0, shipPosX - this.moveStep);
        }
        if(this.rightArrowOn && shipPosX < windowWidth - shipWidth) {
            shipPosX = Math.min(windowWidth - shipWidth, shipPosX + this.moveStep);
        }
    
        if(this.upArrowOn && shipPosY > 0) {
            shipPosY = Math.max(0, shipPosY - this.moveStep);
        }
        if(this.downArrowOn && shipPosY < windowHeight - shipHeight) {
            shipPosY = Math.min(windowHeight - shipHeight, shipPosY + this.moveStep);
        }
    
        this.node.style.left = shipPosX + "px";
        this.node.style.top = shipPosY + "px";
    }
    

    tick() {
        this.brrbrr()

		//this.node.style.left = this.currentPosX + "px";
		//this.node.style.top = this.currentPosY + "px";

		let angle = getElementAngle(shipPosX, shipPosY, xChase, yChase);
		rotateElement(this.node, (angle));
	}

    bambam() {
        let tirX = xChase
        let tirY = yChase

        bulletsList.push(new Bullet(xChase,yChase))

    }

}


    //Autre algorithmne que javais fait avant pour bouger le vaisseau

    // Je le gardde pour les note de supdate Position

    // moveShip(event) {
    //     const moveStep = 3; // valeur de vitesse du vaisseau (en attendant d'ajotuer la vélocité)
    //     switch (event.key.toLowerCase()) { // switch toLowerCase permet de ne pas avori a considérer les maj
    //         case 'w':
    //             this.currentPosY = this.currentPosY - moveStep;
    //             break;
    //         case 'a':
    //             this.currentPosX = this.currentPosX - moveStep;
    //             break;
    //         case 's':
    //             this.currentPosY = this.currentPosY + moveStep;
    //             break;
    //         case 'd':
    //             this.currentPosX = this.currentPosX + moveStep;
    //             break;
    //     }
    //     this.updatePosition();
    // }

    // updatePosition() {
    //     this.node.style.top = `${this.currentPosY}px`; // les $ ici n'ont pas rapport avec Jquery mais sont ici pour spécifié le passage de string vers % 
    //     this.node.style.left = `${this.currentPosX}px`; // Il ne sont pas nécessaire mais je les est laissé puisque je trouvais ca cool 
    // }

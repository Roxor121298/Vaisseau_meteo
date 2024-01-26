

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

        // Les attributs d'affichage

        this.node = document.createElement('img')
        
        this.node.style.width = '100px'
        this.node.style.height = '100px'
        // je voulais faire des collision avec le vaisseau mais fnl je ne l'ai pas fait
        this.node.src = "./img/ship/ship_fullHealth.png"

        this.node.style.position = 'absolute'
        this.node.style.top = x + 'px'       
        this.node.style.left = y + 'px'

        document.body.appendChild(this.node)

        // Pour bouger de droite a gauche ici

        document.addEventListener("keydown", e => {
            if (event.key.toLowerCase() == "a") {
                this.leftArrowOn = true
            }
            else if (event.key.toLowerCase() == "d") {
                this.rightArrowOn = true
            }
        })
        
        document.addEventListener("keyup", e => {
            if (event.key.toLowerCase() == "a"){
                this.leftArrowOn = false
            }
            else if (event.key.toLowerCase() == "d") {
                this.rightArrowOn = false
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

        // document.addEventListener("click", e => {
        //     e.preventDefault()
        //     this.tire_Missile_chaud()
        // })

        // document.addEventListener("contextmenu", e => {
        //     e.preventDefault()
        //     this.tire_Boule_de_froid()
        // })

        // Si tu veut mettre "q" et "e" a la place des clic de souris pour tirer tes missilechaud ou tes boule de froid

        document.addEventListener("keyup", e => {
            if (e.key.toLowerCase() == "e"){
                this.tire_Boule_de_froid()
            }
        })

                document.addEventListener("keyup", e => {
            if (e.key.toLowerCase() == "q"){
                this.tire_Missile_chaud()
            }
        })

    }

    // VERSION Finale de fonction pour bouger le vaisseau

    moveShip() {
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
    

    // tick du vaisseau qui le bouge puis le pointe vers ou la souris pointe a ce moment
    tick() {
        this.moveShip()
		let angle = getElementAngle(shipPosX, shipPosY, xChase, yChase);
		rotateElement(this.node, (angle));
	}

    // fonction pour créer une missile qui va chaser la position du clic, 
        // indiceChaleur pour l'incrément de chaleur quand il explose
        // colPourSpritesheet pour le bon nombre de colonne pour le spritesheet
    tire_Missile_chaud() {
        let indiceChaleur = 1
        let colPourSpritesheet = 3
        bulletsList.push(new Bullet(xChase,yChase,"./img/bullets/missile_chaud.png",indiceChaleur,colPourSpritesheet))
    }

    // Meme chose que tire_Missile_chaud() mais pour les boule_de_froid
    tire_Boule_de_froid() {
        let indiceChaleur = -1
        let colPourSpritesheet = 10
        bulletsList.push(new Bullet(xChase,yChase,"./img/bullets/boule_froid.png",indiceChaleur,colPourSpritesheet))
    }

}

// PREMIERE FONCTION POUR BOUGER LE VAISSEAU


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


// DEUXIEME FONCTIONS POUR FAIRE BOUGER VAISSEAU

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

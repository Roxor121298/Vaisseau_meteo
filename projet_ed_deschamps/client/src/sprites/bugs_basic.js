
import {rotateElement, getElementAngle} from "../util"

import { shipPosX,shipPosY } from "./ship"

import { allBugs,bulletsList,setBeaver} from "../page-meteo"


export class Evilbug {
    constructor(x,y,skin){

		// pour etre sur que le bug apparaisse dans l'écrans peut importe la largeur et hauteur
		this.currentPosX = window.innerWidth * (x / 100)
        this.currentPosY = window.innerHeight * (y / 100)

        this.node = document.createElement('img')
        
        this.node.style.width = '45px'
        this.node.style.height = '45px'
        this.node.src = skin

        // // Optional: additional styling
        this.node.style.position = 'absolute'
        this.node.style.top = x + 'px'       
        this.node.style.left = y + 'px'

        
        this.velocityX = 0
		this.velocityY = 0

		this.velocityBoost = 0.2
		this.maxVelocity = 8

        document.body.appendChild(this.node)

    }

    tick() {
		this.moveBug()
		this.collision()
		let angle = getElementAngle(this.currentPosX, this.currentPosY, shipPosX, shipPosY);
		rotateElement(this.node, (angle - 90))
	}


	// moveBug utilise une fonction presque pareil a celle des mosntres dans l'exemple "05 - Exercice - Créer un bundle"
	// jai quand meme comprs je crois (cest poru ca qu'il n'y a pas de maxVelocityY et maxVelocityX masi jsute 1 puisque je voulasi la meme val)
	moveBug(){
		if (this.currentPosX < shipPosX) {
			if (this.velocityX < this.maxVelocity) {
				this.velocityX += this.velocityBoost
			}
		}
		else if (this.currentPosX > shipPosX) {
			if (this.velocityX > -this.maxVelocity) {
				this.velocityX -= this.velocityBoost
			}
		}

		if (this.currentPosY < shipPosY) {
			if (this.velocityY < this.maxVelocity) {
				this.velocityY += this.velocityBoost
			}
		}
		else if (this.currentPosY > shipPosY) {
			if (this.velocityY > -this.maxVelocity) {
				this.velocityY -= this.velocityBoost
			}
		}

		this.currentPosX += this.velocityX
		this.currentPosY += this.velocityY

		this.node.style.left = this.currentPosX + "px"
		this.node.style.top = this.currentPosY + "px"

	}

	// fonction pour détecter la collision qui apelle les fonction pour enlever la balle et le Evilbug si il est touché
	collision() {
		for (let i = 0; i < bulletsList.length; i++) {
			const uneBalle = bulletsList[i];
			// Math.abs yay!
			// jai mit 35 mais il sagit d'une valeur arbittraire afin que la collison soit faciliter
			if (Math.abs(this.currentPosX - uneBalle.currentPosX) < 35 && Math.abs(this.currentPosY - uneBalle.currentPosY) < 35) {
				uneBalle.cible_atteinte();
				this.bug_atteint();
			}
		}
	}
	
	// Enleve le evilbug du document et de la liste allBugs
	bug_atteint(){
		this.node.remove()
        let index = allBugs.indexOf(this);
        allBugs.splice(index,1)
	}
}


export class BigBeaver {
	constructor(x,y){
		this.currentPosX = x
		this.currentPosY = y

		this.node = document.createElement('img')
        
        this.node.style.width = '100px'
        this.node.style.height = '100px'
        this.node.src = "./img/bugs/MawingBeaver.gif"

        // // Optional: additional styling
        this.node.style.position = 'absolute'
        this.node.style.top = this.currentPosY + '%'
        this.node.style.left = this.currentPosX + '%'

		document.body.appendChild(this.node)
		this.moveBeever()
	}

	moveBeever(){
		if(this.currentPosX > 101){
			this.node.remove()
			setTimeout(() => this.moveBeever(0), 5000);
		}
		else{
			this.currentPosX += 2
			this.node.style.left = this.currentPosX + '%'
			setTimeout(() => this.moveBeever(), 50);
		}
	}
}


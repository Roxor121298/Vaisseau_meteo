
import {rotateElement, getElementAngle} from "../util"

import { xChase,yChase } from "../page-meteo"

import { shipPosX,shipPosY } from "./ship"

import { allBugs,bulletsList} from "../page-meteo"

import {Bullet} from "./bullet"


export class Evilbug {
    constructor(x,y,skin){

		this.currentPosX = window.innerWidth * (x / 100)
        this.currentPosY = window.innerHeight * (y / 100)

        this.node = document.createElement('img')
        
        this.node.style.width = '25px'
        this.node.style.height = '25px'
        this.node.src = skin

        // // Optional: additional styling
        this.node.style.position = 'absolute'
        this.node.style.top = x + 'px'       
        this.node.style.left = y + 'px'

        
        this.velocityX = 0
		this.velocityY = 0

		this.velocityBoost = 0.2

		this.maxVelocityX = 8
		this.maxVelocityY = 8

        document.body.appendChild(this.node)

    }

    tick() {
        //console.log("pass")
		if (this.currentPosX < shipPosX) {
			if (this.velocityX < this.maxVelocityX) {
				this.velocityX += this.velocityBoost
			}
		}
		else if (this.currentPosX > shipPosX) {
			if (this.velocityX > -this.maxVelocityX) {
				this.velocityX -= this.velocityBoost
			}
		}

		if (this.currentPosY < shipPosY) {
			if (this.velocityY < this.maxVelocityY) {
				this.velocityY += this.velocityBoost
			}
		}
		else if (this.currentPosY > shipPosY) {
			if (this.velocityY > -this.maxVelocityY) {
				this.velocityY -= this.velocityBoost
			}
		}

		this.currentPosX += this.velocityX
		this.currentPosY += this.velocityY

		this.node.style.left = this.currentPosX + "px"
		this.node.style.top = this.currentPosY + "px"

		this.collision()

		let angle = getElementAngle(this.currentPosX, this.currentPosY, shipPosX, shipPosY);
		rotateElement(this.node, (angle - 90))
	}

	collision() {
		console.log(bulletsList);
		for (let i = 0; i < bulletsList.length; i++) {
			console.log("pass");
			const uneBalle = bulletsList[i];
			if (Math.abs(this.currentPosX - uneBalle.currentPosX) < 50 && Math.abs(this.currentPosY - uneBalle.currentPosY) < 50) {
				uneBalle.cible_atteinte();
				this.balle_atteinte();
			}
		}
	}
	
	balle_atteinte(){
		console.log("Toucher couler")
		this.node.remove()
        let index = allBugs.indexOf(this);
        allBugs.splice(index,1)
	}
}




// if(Math.abs(this.cibleX - this.currentPosX) < 20 && Math.abs(this.cibleY - this.currentPosY) < 20){
// 	this.cible_atteinte()
// }


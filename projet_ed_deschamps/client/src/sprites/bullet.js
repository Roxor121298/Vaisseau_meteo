import {rotateElement, getElementAngle} from "../util"

import { shipPosX,shipPosY } from "./ship"

import {TiledImage} from '../tiledImage'

import { bulletsList} from "../page-meteo"

import {modificatioTemperenture} from "../page-meteo"


export class Bullet{
    constructor(x,y,skin,indiceChaleur,colPourSpritesheet){

        this.tempVal = indiceChaleur

        this.alive = true

        // x et y de la cible atteindre (lendroit ou l'on clic)
        this.cibleX = x
        this.cibleY = y

        this.currentPosX = shipPosX + 25
        this.currentPosY = shipPosY + 25

        this.minVelocity = 1
        this.maxVelocity = 5

        this.velocityBoost = 0.3

        this.velocityY = 0
        this.velocityX = 0

        this.moveStep = 2

        this.node = document.createElement('div')

        // // Optional: additional styling
        this.node.style.position = 'absolute'
        this.node.style.top = this.currentPosX + 'px'       
        this.node.style.left = this.currentPosY + 'px'

        document.body.appendChild(this.node)


        //les variable pour la TiledImage 

        let colCount = colPourSpritesheet
		let rowCount = 1
		let refreshDelay = 5 // pour faire ub call back a l'animation selon une variable (un peu comme speed)
		let loopColummn = true // Savoir quand on veut bouger horizontalement ou verticalement (dans le sprite sheet)
		let scale = 2.0

        this.tiledImage = new TiledImage(skin,colCount,rowCount,refreshDelay,loopColummn,scale, this.node)

        this.tiledImage.changeRow(0)
		this.tiledImage.changeMinMaxInterval(0,(colPourSpritesheet-1)) 

    }

    tick(){


        if (this.currentPosX < this.cibleX) {
            if(this.velocityX < this.maxVelocity){
                this.velocityX += this.velocityBoost
            }
		}
		else if (this.currentPosX > this.cibleX) {
            if(this.velocityX > -this.maxVelocity){
                this.velocityX -= this.velocityBoost
            }
		}

        if (this.currentPosY < this.cibleY) {
            if(this.velocityY < this.maxVelocity){
                this.velocityY += this.velocityBoost
            }
		}
		else if (this.currentPosY > this.cibleY) {
            if(this.velocityY > -this.maxVelocity){
                this.velocityY -= this.velocityBoost
            }
		}

        this.currentPosX += this.velocityX
        this.currentPosY += this.velocityY

        this.tiledImage.tick(this.currentPosX, this.currentPosY)

        let angle = getElementAngle(this.currentPosX, this.currentPosY, this.cibleX, this.cibleY)
		rotateElement(this.node, (angle))

        // jai mit 25 mais il sagit d'une valeur arbittraire afin que la collison soit faciliter
        if(Math.abs(this.cibleX - this.currentPosX) < 15 && Math.abs(this.cibleY - this.currentPosY) < 15){
            this.cible_atteinte()
        }
    }

    cible_atteinte() {
        this.node.remove()
        let index = bulletsList.indexOf(this);
        bulletsList.splice(index,1)
        modificatioTemperenture(this.tempVal)
    }
    
}
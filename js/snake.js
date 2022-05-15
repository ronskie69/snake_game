import { ctx, scale, canvasH, canvasW } from './main.js'


export default class Snake { 
    constructor(x =0 , y= 0){
        this.x = x
        this.y = y
        this.speedX = scale * 1
        this.speedY = 0
        this.score = 0
        this.tail = []
        this.highestScore = localStorage.getItem('highest-score') ? localStorage.getItem('highest-score') : 0
    }

    draw(){
        
        for(let i = 0; i < this.tail.length; i++){
            ctx.fillStyle = "#116530"
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale)
        }

        ctx.fillStyle = "#18a558"
        ctx.fillRect(this.x, this.y, scale, scale)
    }

    updateMovement(){

       // console.log(this.x, canvasW)
        for(let i = 0; i < this.tail.length - 1; i++){
            this.tail[i] = this.tail[i+1]
        }

        this.tail[this.score-1] = { x: this.x, y: this.y}
      
        //console.log(this.tail)

        this.x += this.speedX
        this.y += this.speedY

        if(this.x > canvasW){
            this.x = 0
        }

        if(this.x < 0){
            this.x = canvasW
        }

        if(this.y > canvasH){
            this.y = 0
        }

        if(this.y < 0){
            this.y = canvasH
        }
    }
    getScore(){
        return this.score
    }

    getHighestScore(){
        return this.highestScore
    }
    controls(moves){
        switch (moves) {
            //up
            case 'KeyW':
            case 'ArrowUp':
                this.speedX = 0
                this.speedY = (-scale * 1)
            break;
            //left
            case 'KeyA':
            case 'ArrowLeft':
                this.speedX = (-scale * 1)
                this.speedY = 0
            break;
            //down
            case 'KeyS':
            case 'ArrowDown':
                this.speedX = 0
                this.speedY = (scale * 1)
            break;
            //right
            case 'KeyD':
            case 'ArrowRight':
                this.speedX = scale * 1
                this.speedY = 0
            break;
        }
    }

    isEaten(foodPosition){
        if(this.x === foodPosition.x && this.y === foodPosition.y){
            //console.log("eaten!")
            this.score++
            

            if(this.score > this.highestScore){
                localStorage.setItem('highest-score', this.score)
            }
            return true
        }
        return false
    }
    
    collide(){
        for(let i = 0; i < this.tail.length; i++){
            if(this.x === this.tail[i].x && this.y === this.tail[i].y){
                this.score = 0
                this.tail = []
                return true
            }
        }
        return false
    }
}


import { ctx, row, col, scale } from './main.js'

export default class Food {
    constructor(x =0, y=0){
        this.x = x
        this.y = y
    }

    draw(){
        ctx.fillStyle = '#ff2323'
        ctx.fillRect(this.x, this.y, scale, scale)
    }

    randomPosition(){
        this.x = (Math.floor(Math.random() * row - 1) + 1) * scale
        this.y = (Math.floor(Math.random() * col - 1) + 1) * scale
    }
}
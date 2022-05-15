import Snake from './snake.js'
import Food from './food.js'

const canvas = document.getElementById('main')
const controllers = document.querySelectorAll('.controller')

controllers.forEach(controller => {
    controller.addEventListener('click', e => mobileController(e.target.textContent))
})
export const ctx = canvas.getContext('2d')
export const scale = 20
export const canvasW = canvas.width
export const canvasH = canvas.height
export const row = canvas.height / scale
export const col = canvas.width / scale

const gameSpeed = 1
let lastTime = 0
let loopId
let snake = new Snake(50, 50)
let food = new Food()

function fillScores(){
    ctx.fillStyle = "white"
    ctx.textBaseline ="bottom"
    ctx.font = "14px Arial"

    ctx.fillText(`Score: ${snake.getScore()}`, 100, 20)

    ctx.fillStyle = "white"
    ctx.textBaseline ="bottom"
    ctx.font = "14px Arial"

    ctx.fillText(`Highest Score: ${snake.getHighestScore()}`, 250, 20)
}
function game(timestamp){
    let seconds = timestamp / 100


    if(seconds - lastTime >= gameSpeed){
        lastTime = seconds
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        snake.updateMovement()
        snake.draw()
        
        if(snake.collide()){
            canvas.classList.add('collides')
            fillScores()
            setTimeout(() => canvas.classList.remove('collides'), 1000)
        }

        if(snake.isEaten(food)){
            food.randomPosition()
            food.draw()
        }

        food.draw()
    }

    fillScores()


    loopId = requestAnimationFrame(game)
}


game()

window.addEventListener('keydown', e => snake.controls(e.code))

function mobileController(key){
    //console.log(key)
    switch (key) {
        case 'W':
            snake.speedX = 0
            snake.speedY = (-scale * 1)
        break;
        case 'A':
            snake.speedX = (-scale * 1)
            snake.speedY = 0
        break;
        case 'S':
            snake.speedX = 0
            snake.speedY = (scale * 1)
        break;
        case 'D':
            snake.speedX = scale * 1
            snake.speedY = 0
        break;

    }
}
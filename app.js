/**
 * Free code camp - Basis Tetris Game code along
 * Framework courtesy of Ania Kudow
 * 2020.05.28
 */

document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid')
    //width of each div on the screen.
    const width = 10

    const scoreDisplay = document.querySelector('#score');

    const startBtn = document.querySelector("#start-button")

    let squares = Array.from(document.querySelectorAll('.grid div'))

    let nextRandom = 0;

    let timerId;

    let score = 0;
    const colors = [
        'orange',
        'red',
        'purple',
        'green',
        'blue'
    ]

    // the tetrominos
// each array represents a different rotation of the tetromino
    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]

    ]

    const zTetromino = [
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1]
    ]
    
    
    
      const tTetromino = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
      ]
    
      const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
      ]
    
      const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
      ]
    
      const theTetrominoes = [lTetromino,zTetromino,tTetromino,oTetromino,iTetromino];

    // positioning the items on the grid

    console.log(theTetrominoes);
    

    let currentPosition = 4;
    let currentRotation = 0; // default to selecting the first rotation of each tetromino

    

    let random = Math.floor(Math.random()*theTetrominoes.length)
   

    let current = theTetrominoes[random][currentRotation]

    

    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino');
            squares[currentPosition + index].style.backgroundColor = colors[random]
        })
    }

    // undraw the current tetromino 

    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino');
            squares[currentPosition + index].style.backgroundColor = ''
        })
    }


    // this function moves the tetromino down the grid

    function moveDown() {
        undraw()
        currentPosition+=width
        draw();
        freeze()
    }

    
    // assign functions to key codes to move the tetromino around.
    /**
     * 
     * Left arrow moves left
     * Right arrow moves right
     */

    function control(event) {
        if (event.keyCode === 37) { 
            moveLeft()
        } else if (event.keyCode === 38) {
            rotate()
        } else if (event.keyCode === 39) {
            moveRight()
        } else if (event.keyCode === 40) {
            moveDown()
        }
    }

    // the event listener is attached to the whole html document
    document.addEventListener('keyup', control)

    // freeze function - stops the teromino when it gets to the bottom of the grid.

    function freeze() {
        if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {

            current.forEach(index => squares[currentPosition+index].classList.add('taken'))


            // start the next tetromino to falling
            random = nextRandom
            nextRandom = Math.floor(Math.random() * theTetrominoes.length)
        
            current = theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
            displayShape()
            addScore()
            gameOver()
        }
    }


    /**
     * moves the tetromino to the left UNLESS
     * 1. already at the left edge of the grid OR
     * 2. the destination space is already occupied by another tetromino
     */
function moveLeft() {

    // disappear the tetromino from its current position.
    undraw()

    // if at left edge, stay in prior position.
    const isAtLeftEdge = current.some( index => (currentPosition + index) % width === 0)

    if ( !isAtLeftEdge) {
        currentPosition -=1;
    }

    // if current position is already occupied, move just to the right.
    if (current.some(index => squares[currentPosition+ index].classList.contains('taken'))) {
        currentPosition +=1
    }

    // now draw the tetromino in its new spot

    draw();
}


function moveRight() {

    // disappear the tetromino from its current position.
    undraw()

    // if at left edge, stay in prior position.
    const isAtRightEdge = current.some( index => (currentPosition + index) % width === width -1)

    if ( !isAtRightEdge) {
        currentPosition +=1;
    }

    // if current position is already occupied, move just to the right.
    if (current.some(index => squares[currentPosition+ index].classList.contains('taken'))) {
        currentPosition -=1
    }

    // now draw the tetromino in its new spot

    draw();
}

// rotates the tetromino e.g, pulling the next rotation from the tetromino array

function rotate() {
    undraw()

    currentRotation++

    if (currentRotation === current.length) {
        // go back to the first rotation
        currentRotation = 0
    }

    current = theTetrominoes[random][currentRotation]

    draw()
}


// show the upcoming shape for the user.

const displaySquares = document.querySelectorAll('.mini-grid div');

const displayWidth = 4;
const displayIndex = 0;

// we'll only display the first rotation of each tetromino
/**
 * L-tetromino
 * Z-tetromino
 * T-tetromino
 * O-tetromino
 * I-tetromino
 * 
 */
const upNextTetrominos = [
    [1, displayWidth+1, displayWidth*2+1, 2],
    [0, displayWidth, displayWidth+1, displayWidth*2+1],
    [1, displayWidth, displayWidth+1, displayWidth+2],
    [0, 1, displayWidth, displayWidth+1],
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1]

]

// display shape preview

function displayShape() {
    displaySquares.forEach(square => {
        square.classList.remove('tetromino')
        square.style.backgroundColor = ''
    })

    upNextTetrominos[nextRandom].forEach(index => {
        displaySquares[displayIndex+index].classList.add('tetromino')
        displaySquares[displayIndex+index].style.backgroundColor = colors[nextRandom]

    })
}

startBtn.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId)
        timerId = null
    } else {
        draw()
        timerId = setInterval(moveDown, 1000)
        nextRandom = Math.floor(Math.random() * theTetrominoes.length)
        displayShape()
    }
})

/**
 * handling when a row is completed by the user
 */


function addScore() {
    for (let i = 0; i< 199; i+=width){
        const row = [ i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

        if (row.every(index => squares[index].classList.contains('taken'))) {
            score+=10;
            scoreDisplay.innerHTML = score
            row.forEach( index => {
                squares[index].classList.remove('taken')
                squares[index].classList.remove('tetromino')
                squares[index].style.backgroundColor = ''
            })
            const squaresRemoved = squares.splice(i, width)
            squares = squaresRemoved.concat(squares)
            squares.forEach(cell => grid.appendChild(cell) )


        }
    }
}

function gameOver () {
    if (current.some( index => squares[currentPosition + index].classList.contains('taken'))) {
        scoreDisplay.innerHTML = 'end'
        clearInterval(timerId)

    }
}

})
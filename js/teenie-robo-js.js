// Developed by Sergio Pacheco (June 2021)

// Initial Game States
let gameOver = true;
let moveLeft = false;
let moveRight = false;
let totalScore = 0;
let countdown = 100;

// Setting up Abbreviated Variables for easier code writing
let rH = $('.roboHeight');
let bH1 = $('.batteryHeightOne');
let bH2 = $('.batteryHeightTwo');
let bH3 = $('.batteryHeightThree');
let cH = $('.clockHeight');
let bgMusic = document.getElementById("bgMusic");
let timeUp = document.getElementById("timeUp");
let getBattery = document.getElementById("getBattery");
let getClock = document.getElementById("getClock");
let timeLeft = document.getElementById("timeLeft");
let scoreCounter = document.getElementById("scoreCounter");
let item1 = document.getElementById("item1");
let item2 = document.getElementById("item2");
let item3 = document.getElementById("item3");
let item4 = document.getElementById("item4");

// Getting the document ready
$(function () 
{
    // Sweet Alert to start the Game
    Swal.fire(
    {
        title: 'CHARGED AND READY TO GO?',
        html: "<p>You are Teenie-Robo and you love yourself some good batteries. Looking to charge up, you hope to catch all the batteries you can that are inexplicably falling from the sky above.</p> <p> Use the <strong> left </strong> and <strong> right </strong> arrow keys to catch falling batteries. You can also catch clocks, which increase the time you have left!</p> <p> If you're using a touch screen: <strong> tap </strong> on the left or right side of the screen to move.</p>",
        confirmButtonColor: '#346856',
        confirmButtonText: "START",
        allowOutsideClick: false
    }).then(function (result) 
    {
        if (result.value) 
        {
            gameOver = false;
            bgMusic.loop = true;
            bgMusic.play();
        }

        // Left & Right Movement on Keyboard
        $(document).on('keydown', function (e) 
        {
            if (gameOver === false) 
            {
                let key = e.keyCode;
                if (key === 37 && moveLeft === false) 
                {
                    moveLeft = requestAnimationFrame(left);
                } 
                else if (key === 39 && moveRight === false) 
                {
                    moveRight = requestAnimationFrame(right);
                }
            }
        });
        $(document).on('keyup', function (e) 
        {
            if (gameOver === false) 
            {
                let key = e.keyCode;
                if (key === 37) 
                {
                    cancelAnimationFrame(moveLeft);
                    moveLeft = false;
                } 
                else if (key === 39) 
                {
                    cancelAnimationFrame(moveRight);
                    moveRight = false;
                }
            }
        });

        // Left & Right Movement on Touch Devices
        $(document).on('touchstart', function (e) 
        {
            let touchWidth = screen.width;
            let touchX = e.touches[0].clientX;
            if (gameOver === false) 
            {
                if (touchX > touchWidth / 2 && moveLeft === false) 
                {
                    moveRight = requestAnimationFrame(right);
                } 
                else if (moveRight === false) 
                {
                    moveLeft = requestAnimationFrame(left);
                }
            }
        });
        $(document).on('touchend', function (e) 
        {
            let touchWidth = screen.width;
            let touchesX = e.changedTouches[0].clientX;
            if (gameOver === false) 
            {
                if (touchesX > touchWidth / 2) 
                {
                    cancelAnimationFrame(moveRight);
                    moveRight = false;
                } 
                else 
                {
                    cancelAnimationFrame(moveLeft);
                    moveLeft = false;
                }
            }
        });

        // Speed for Left & Right movement
        let left = function () 
        {
            // Sets up base Movement Speed & keeps player within Game Window
            if (gameOver === false && parseInt($(".roboArea").css("left")) > 20) 
            {
                $(".roboArea").css("left", parseInt($(".roboArea").css("left")) - 5);
                moveLeft = requestAnimationFrame(left);
            } 
            // Fixes a previous bug where the Player was able to leave the screen with repeated Left Key presses
            else if (parseInt($(".roboArea").css("left")) <= 20)
            {
                $(".roboArea").css("left", 20);
            } 
        };
        let right = function () 
        {
            // Sets up base Movement Speed & keeps player within Game Window
            if (gameOver === false && parseInt($(".roboArea").css("left")) < parseInt($(".gameArea").css("width")) - 70) 
            {
                $(".roboArea").css("left", parseInt($(".roboArea").css("left")) + 5);
                moveRight = requestAnimationFrame(right);
            } 
            // Fixes a previous bug where the Player was able to leave the screen with repeated Right Key presses
            else if (parseInt($(".roboArea").css("left")) >= 430)
            {
                $(".roboArea").css("left", 430);
            } 
        };

        // Manages and displays the Countdown
        // Countdown timer decreases by 1 every 1/2 second
        let timer = setInterval(countDown, 500);
        function countDown() 
        {
            if(countdown > 0)
            {
                countdown--;
                timeLeft.innerHTML = countdown;
            }
            else if (gameOver === true) 
            {
                clearInterval(timer);
            }
        }
        countDown();

        // This function ends all ongoing animations when the Game ends
        function gameEnds() 
        {
            gameOver = true;
            cancelAnimationFrame(keepRunning);
            cancelAnimationFrame(moveRight);
            cancelAnimationFrame(moveLeft);
        }

        // Repeats Animation, Collision Detection, and Game Over check 
        keepRunning = requestAnimationFrame(repeat);

        function repeat() 
        {
            if (gameOver === false) 
            {
                // Checks if the Player has collided with an Object
                // Player gains 1 Point when they collide with a Battery and +5 to Countdown if they collide with a Clock
                if (collision(rH, bH1))
                {
                    totalScore++;
                    scoreCounter.innerHTML = totalScore;
                    getBattery.play();
                    item1.style = "top: 501px;";
                }
                else if (collision(rH, bH2))
                {
                    totalScore++;
                    scoreCounter.innerHTML = totalScore;
                    getBattery.play();
                    item2.style = "top: 501px;";
                }
                else if (collision(rH, bH3))
                {
                    totalScore++;
                    scoreCounter.innerHTML = totalScore;
                    getBattery.play();
                    item3.style = "top: 501px;";
                }
                else if (collision(rH, cH))
                {
                    countdown += 5;
                    timeLeft.innerHTML = countdown;
                    getClock.play();
                    item4.style = "top: 501px;";
                }
                
                // Game ends when the Countdown hits 0
                if (countdown <= 0)
                {
                    bgMusic.pause();
                    timeUp.play();
                    Swal.fire(
                    {
                        title: "BZZT! TIME'S UP!",
                        text: 'You have managed to catch ' + totalScore + ' batteries. Do you want to play again?',
                        confirmButtonColor: '#346856',
                        confirmButtonText: 'PLAY AGAIN',
                        allowOutsideClick: false,
                    }).then(function (result) 
                    {
                        if (result.value) 
                        {
                            location.reload(true);
                        }
                    })
                    gameEnds();
                }
                requestAnimationFrame(repeat);
            }
            itemFalling($('.batteryAreaOne'));
            itemFalling($('.batteryAreaTwo'));
            itemFalling($('.batteryAreaThree'));
            itemFalling($('.clockArea'));
        }

        // Items Animations and Falling Handler
        function itemFalling(item) 
        {
            let topOfArea = parseInt(item.css('top'));
            if (topOfArea > parseInt($('.gameArea').css('height'))) 
            {
                // Sets an Object back after leaving the screen, so that it can fall again
                if (item.hasClass('clockArea'))
                {
                    topOfArea = -1000; 
                }
                else
                {
                    topOfArea = -150;
                }
                // Places an Object at a new, random location horizontally on screen
                let randomPosition = parseInt(Math.random() * 440) + 10;
                item.css('left', randomPosition);
            }

            // Speed at which new items fall increases as the Player's score increases
            if (totalScore >= 100) 
            {
                item.css('top', topOfArea + 7);
            } 
            else if (totalScore >= 75) 
            {
                item.css('top', topOfArea + 6);
            } 
            else if (totalScore >= 50) 
            {
                item.css('top', topOfArea + 5);
            } 
            else if (totalScore >= 25)
            {
                item.css('top', topOfArea + 4);
            } 
            else
            {
                item.css('top', topOfArea + 3);
            }
        }

        // Function that Determines if Two Objects have Collided
        // Based on the following: https://gist.github.com/jaxxreal/7527349
        function collision(obj1, obj2) 
        {
            let x1 = obj1.offset().left;
            let y1 = obj1.offset().top;
            let h1 = obj1.outerHeight(true);
            let w1 = obj1.outerWidth(true);
            let b1 = y1 + h1;
            let r1 = x1 + w1;
            let x2 = obj2.offset().left;
            let y2 = obj2.offset().top;
            let h2 = obj2.outerHeight(true);
            let w2 = obj2.outerWidth(true);
            let b2 = y2 + h2;
            let r2 = x2 + w2;
            if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) 
            {
                return false;
            }
            return true;
        }
    });
});
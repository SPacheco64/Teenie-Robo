# Teenie-Robo
A simple JavaScript game where the player tries to catch as many falling batteries as they can.

Overview:
This is a simple game built using JavaScript/jQuery that can be played on both Desktop & Mobile devices. The aim of the game is for the player to move their character
from side to side, catching falling batteries & clocks before they hit the ground in order to get their score as high as they can before they run out of time.

Tech Used: 
- HTML5
- SCSS 
- Bootstrap 4 
- JavaScript 
- jQuery

In-Depth:
- The game consists of a Game Area, a Player Object, 4 Item Objects (3 batteries, and 1 clock), a Score Counter, and a Timer.
- The Game Area contains 1 Player Object, and 4 Item Objects. This space is set up in a way to keep the the player bound within its borders.
- The Player Object (Teenie-Robo) is set up to be controlled by the player, either by using the left and right arrow keys, or by tapping/holding either
side of their screen while on a mobile/touch device. The Player Object cannot move outside of the bounds of the Game Area, and interacts with the Item
Objects upon contact. 
- When the Player Object touches a battery, the player's Score Counter goes up by 1, and the battery is reset to fall once again
from the top of the Game Area at a randomly generated horizontal position*. 
- When the Player Object touches a clock, the player's Timer goes up by 5, and the clock is reset to fall once again from the 
top of the Game Area at a randomly generated horizontal position*. The clock is set to fall from a higher position thant the batteries,
causing it to take longer to return to the visible Game Area.

*Rather than continuously generate Item Objects, the code is set up in a way to constantly re-use the same set of 4.

- When an Item Object reaches the bottom of the Game Area, it is reset similarly to how it is when it collides with the Player Object,
but the Score Counter is not increased.
- As the player earns more points, the speed at which Item Objects fall increases (at specific point intervals).
- When the Timer reaches 0, the game ends, and a message is displayed informing the player of how many batteries they were able to catch.

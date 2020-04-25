// Global Value
let WD = 168;
let damage = 50;

// Player 1
let player1_posx = 0, w = 25, d = 200;
let player1_health = 300, player1_energy = 300;
let player1_up = 0, player1_down = 0, player1_left = 0, player1_right = 0;
let player1_punch = 0, player1_kick = 0, player1_push = 0, player1_frame = 0;
let k1 = 0, p1 = 0;

// Player 2
let player2_posx = 800 - WD, player2_pos_right = 0, aside = 0;
let player2_health = 300, player2_energy = 300;
let player2_up = 0,player2_down = 0, player2_left = 0, player2_right = 0;
let player2_punch = 0, player2_kick = 0, player2_push = 0, player2_frame = 0;
let k2 = 0, p2 = 0;

var hit1 = 0, hit2 = 0, c1 = 0 , c2 = 0 , hitDamage = 15;
var hit1c1 = 0, hit1c2 = 0 , hit2c1 = 0, hit2c2 = 0, isdown1 = 0, isdown2 = 0, isup1 = 0, isup2 = 0, bup1 = 0, bup2 = 0;

// Keyboard Function On KeyDown
document.onkeydown = function(evt) {
    var key = String.fromCharCode(evt.keyCode);
    // Player 1
    if (key === 'W') player1_up = 1;
    if (key === 'S') player1_down = 1;
    if (key === 'A') player1_left = 1;
    if (key === 'D') player1_right = 1;
    if (key === 'E') player1_punch = 1;
    if (key === 'R') player1_kick = 1;
    if (key === 'F') player1_push = 1;

    // Player 2
    if (key === 'U') player2_up = 1;
    if (key === 'J') player2_down = 1;
    if (key === 'H') player2_left = 1;
    if (key === 'K') player2_right = 1;
    if (key === 'I') player2_punch = 1;
    if (key === 'O') player2_kick = 1;
    if (key === 'L') player2_push = 1;
};

// Keyboard Function On Release
document.onkeyup = function(evt) {
    var key = String.fromCharCode(evt.keyCode);
    // Player 1
    if (key === 'W') player1_up = 0; bup1 = 0;
    if (key === 'S') player1_down = 0;
    if (key === 'A') player1_left = 0;
    if (key === 'D') player1_right = 0;
    if (key === 'E') player1_punch = 0; p1 = 0;
    if (key === 'R') player1_kick = 0; k1 = 0;
    if (key === 'F') player1_push = 0;

    // Player 2
    if (key === 'U') player2_up = 0; bup2 = 0;
    if (key === 'J') player2_down = 0;
    if (key === 'H') player2_left = 0;
    if (key === 'K') player2_right = 0;
    if (key === 'I') player2_punch = 0; p2 = 0;
    if (key === 'O') player2_kick = 0; k2 = 0;
    if (key === 'L') player2_push = 0;
};

// Define Player 1 and Player 2 Move
var player01;
var player02;

player1_move = (img) => {player01.style.backgroundImage = img; };
// function player1_move(img){player01.style.backgroundImage = img; }
player2_move = (img) => {player02.style.backgroundImage = img; };

let gameover = 0;


function mulaiGame() {

    if (gameover === 1) return;
    player1_energy = player1_energy + (player1_energy + 2 > 300) ? 0 : 2;
    player2_energy = player2_energy + (player2_energy + 2 > 300) ? 0 : 2;

    // Player 1 On KeyUp
    if (hit1 === 0){
        isup1 = isdown1 = 0;
        // Kick
        if (player1_kick === 1 && player1_energy > 0) player1_frame = (player1_frame === 2 || k1 ===1) ? 0 : 2;
        // Punch
        else if (player1_punch === 1 && player1_energy > 0) player1_frame = (player1_frame === 3 || p1 === 1) ? 0 : 3;
        // Push
        else if (player1_push === 1 && aside === 1 && player1_energy > 0) {
            player1_energy = player1_energy - damage;
            player2_move("url(enemypush.png)");
            if ((player2_pos_right - d) >= 0) {
                player2_pos_right = player2_pos_right - d;
                player2_posx = player2_posx + d;
                aside = 0;
            } else {
                player2_pos_right = 0;
                player2_posx = 800 - WD;
                aside = 0;
            }
            player02.style.marginRight = player2_pos_right;
        }
        else if (player1_up === 1){
            player1_frame = (player1_frame === 4 || bup1 === 1) ? 0 : 4;
            isup1 = 1;
        }
        else if (player1_down === 1) {
            player1_frame = 5;
            isdown1 = 1;
        }
        else if (player1_right === 1) {
            if (player1_posx + w + WD <= player2_pos_right) {
                player1_posx = player1_posx + w;
            } else {
                aside = 1;
            }
            player01.style.marginLeft = player1_posx;
            player1_frame = (player1_frame === 1) ? 0 : 1;
        }
        else if (player1_left === 1){
            if ((player1_posx - w) >= 0) {
                player1_posx = player1_posx - w;
                aside = 0;
            }
            player01.style.marginLeft = player1_posx;
            player1_frame = (player1_frame === 1) ? 0 : 1;
        }
        else player1_frame = 0;
    }

    player01.style.marginTop = 200;
    c1 = (c1 + 1) % hitDamage;

    // Player 1 On KeyDown
    if (hit1 === 1){
        if (hit1c1 === 1) player1_move("url(playerhit1.png");
        else player1_move("url (playerhit2.png)");

        if (c1 === 0) {
            hit1 = hit1c1 = hit1c2 = 0;
        }
    }
    else if (player1_frame === 0) {
        player1_move("url (player.png)")
    }
    else if (player1_frame === 1) {
        player1_move("url(player1.png)");
    }
    else if (player1_frame === 2) {
        k1 = 1;
        player1_energy = player1_energy - damage;
        player1_move("url(kick.png)");
        if(aside === 1 && isup2 === 0){
            player2_life = player2_life + 20;
            hit2=1;
            hit2c2=1;
        }
    }
    else if ( player1_frame === 3){
        p1 = 1;
        player1_move("url(punch.png)");
        player1_energy = player1_energy - damage;
        if(aside===1 && isdown2===0){
            player2_life = player2_life - 20;
            hit2=1;
            hit2c1=1;
        }
    }
    else if (player1_frame === 4){
        bup1 = 1;
        player1_move("url(playerup.png)");
        player01.style.marginTop = 200 - 120;
    }
    else if (player2_frame === 5){
        player1_move("url(playerdown.png)");
        player01.style.marginTop = 200 + 20;
    }

}

window.onload = function() {
    player01 = document.getElementById("player");
    player02 = document.getElementById("enemy");
    setInterval("mulaiGame()",100);
};
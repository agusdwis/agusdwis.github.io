// Global variabel
let WD = 168;
let damage = 50;
let hitDamage = 15;
const SOUND_ON = true;

var initial_life = 300;
var initial_energy = 300;

// Player 1
let player01_posx = 0, w = 25, d = 200;
let player01_life = initial_life, player01_energy = initial_energy;
let up1 = 0,down1 = 0, left1 = 0, right1 = 0, punch1 = 0, kick1 = 0,frame = 0;

// Action 1
let hit1 = 0, c1 = 0, hit1c1 = 0, hit1c2 = 0, isdown1 = 0, isup1 = 0;

// Player 2
let player02_posx = 800-WD, player02_pos_right = 0, aside = 0;
let player02_life = initial_life, player02_energy = initial_energy;
let up2 = 0,down2 = 0, left2 = 0, right2 = 0, punch2 = 0, kick2 = 0, player2_frame = 0;

// Action 2
let hit2 = 0, c2 = 0, hit2c1 = 0, hit2c2 = 0, isdown2 = 0, isup2 = 0;

// Setup sound effect
var punch_fx1 = new Sound("audio/punch_fx.wav");
var punch_fx2 = new Sound("audio/punch_fx2.wav");
var kick_fx = new Sound("audio/kick_sfx.wav");
var voice_over = new Sound("audio/voice_over.wav");
var game_over = new Sound("audio/game_over.wav");

function Sound(src, maxStreams = 5, vol = 1.0) {
    this.streamNum = 0;
    this.streams = [];
    for (var i = 0; i < maxStreams; i++) {
        this.streams.push(new Audio(src));
        this.streams[i].volume = vol;
    }

    this.play = function() {
        if (SOUND_ON) {
            this.streamNum = (this.streamNum + 1) % maxStreams;
            this.streams[this.streamNum].play();
        }
    };

    this.stop = function() {
        this.streams[this.streamNum].pause();
        this.streams[this.streamNum].currentTime = 0;
    }
}

// Keyboard Function on Keydown
document.onkeydown = function(event) {
    let key = String.fromCharCode(event.keyCode);
    // Player 1
    if (key === 'W') up1 = 1;
    if (key === 'S') down1 = 1;
    if (key === 'A') left1 = 1;
    if (key === 'D') right1 = 1;
    if (key === 'Q') punch1 = 1;
    if (key === 'E') kick1 = 1;

    // Player 2
    if (key === 'I') up2 = 1;
    if (key === 'K') down2 = 1;
    if (key === 'J') left2 = 1;
    if (key === 'L') right2 = 1;
    if (key === 'U') punch2 = 1;
    if (key === 'O') kick2 = 1;
};

// Keyboard Function on Keyup
document.onkeyup = function(event) {
    let key = String.fromCharCode(event.keyCode);
    // Player 1
    if (key === 'W') up1 = 0;
    if (key === 'S') down1 = 0;
    if (key === 'A') left1 = 0;
    if (key === 'D') right1 = 0;
    if (key === 'Q') punch1 = 0;
    if (key === 'E') kick1 = 0;

    // Player 2
    if (key === 'I') up2 = 0;
    if (key === 'K') down2 = 0;
    if (key === 'J') left2 = 0;
    if (key === 'L') right2 = 0;
    if (key === 'U') punch2 = 0;
    if (key === 'O') kick2 = 0;
};

// Define Player
let player01, player02;
player01_move = (img) => { player01.style.backgroundImage = img; };
player02_move = (img) => { player02.style.backgroundImage = img; };
let gameover = 0;

let player01_image = "image/player.png";
let player02_image = "image/enemy.png";

// restart Game
function restartGame() {
    voice_over.play();
    gameover = 0;
    document.getElementById('overlay').style.display = "none";

    WD = 168;
    damage = 50;
    hitDamage = 15;

    initial_life = 300;
    initial_energy = 300;

    // Player 1
    player01_posx = 0, w = 25, d = 200;
    player01_life = initial_life, player01_energy = initial_energy;
    up1 = 0,down1 = 0, left1 = 0, right1 = 0, punch1 = 0, kick1 = 0,frame = 0;

    // Action 1
    hit1 = 0, c1 = 0, hit1c1 = 0, hit1c2 = 0, isdown1 = 0, isup1 = 0;

    // Player 2
    player02_posx = 800-WD, player02_pos_right = 0, aside = 0;
    player02_life = initial_life, player02_energy = initial_energy;
    up2 = 0,down2 = 0, left2 = 0, right2 = 0, punch2 = 0, kick2 = 0, player2_frame = 0;

    // Action 2
    hit2 = 0, c2 = 0, hit2c1 = 0, hit2c2 = 0, isdown2 = 0, isup2 = 0;

    player01.style.marginLeft = player01_posx;
    player02.style.marginRight = player02_pos_right;
    startGame();
}


// Main Game
function startGame() {

    // Initial Condition
    if (gameover === 1) return;
    player01_energy = player01_energy + ((player01_energy + 2 > 300) ? 0:2);
    player02_energy = player02_energy + ((player02_energy + 2 > 300) ? 0:2);

    if(hit1 === 0){
        isup1 = isdown1= 0;
        if(kick1 === 1 && player01_energy > 0) frame = (frame === 2) ? 0:2;
        else if(punch1 === 1 && player01_energy > 0) {
            frame = (frame === 3) ? 0:3;
        }
        else if(up1 === 1) {frame = (frame === 4) ? 0:4; isup1=1;}
        else if(down1 === 1) {frame = 5; isdown1=1;}
        else if(right1 === 1) {
            if(player01_posx + w + WD <= player02_posx) player01_posx = player01_posx + w;
            else aside = 1;
            player01.style.marginLeft = player01_posx;
            frame = (frame === 1) ? 0:1;
        }
        else if(left1 === 1) {
            if(player01_posx - w >= 0){
                player01_posx = player01_posx - w;
                aside=0;}
            player01.style.marginLeft = player01_posx;
            frame = (frame === 1) ? 0:1;
        }
        else frame = 0;
    }

    player01.style.marginTop = 200;
    c1 = (c1+1) % hitDamage;

    if(hit1 === 1){
        if(hit1c1 === 1)player01_move(`url${player01_image}`);
        else player01_move(`url${player01_image}`);
        if(c1 === 0){ hit1 = hit1c1 = hit1c2 = 0;}
    }
    else if(frame === 0) {
        player01_move(`url${player01_image}`);
    }
    else if(frame === 1) {
        player01_move(`url${player01_image}`);
    }
    else if(frame === 2) {
        // k1 = 1;
        player01_energy = player01_energy - damage;
        player01_move(`url${player01_image}`);
        if(aside === 1 && isup2 === 0){
            player02_life = player02_life - 20;
            hit2 = 1;
            hit2c2 = 1;
            kick_fx.play();
        }
    }
    else if(frame === 3) {
        // p1 = 1;
        player01_move(`url${player01_image}`);
        player01_energy = player01_energy - damage;
        if( aside === 1 && isdown2 === 0){
            player02_life = player02_life - 20;
            hit2 = 1;
            hit2c1 = 1;
            punch_fx1.play();
        }
    }
    else if(frame === 4) {
        // bup1 = 1;
        player01_move(`url${player01_image}`);
        player01.style.marginTop = 200 - 120;
    }
    else if(frame === 5) {
        player01_move(`url${player01_image}`);
        player01.style.marginTop = 200 + 20;
    }

    if(hit2 === 0){
        isdown2 = isup2 =  0;
        if(kick2 === 1 && player02_energy > 0) player2_frame = (player2_frame === 2) ? 0:2;
        else if(punch2 === 1 && player02_energy > 0) {
            player2_frame = (player2_frame === 3) ? 0:3;
        }
        else if(up2 === 1) {
            player2_frame = (player2_frame === 4) ? 0:4;
            isup2 = 1;
        }
        else if(down2 === 1) {
            player2_frame = 5;
            isdown2 = 1;
        }
        else if(right2 === 1) {
            if(player02_pos_right - w >= 0) {
                player02_pos_right = player02_pos_right - w;
                player02_posx = player02_posx + w;
                aside = 0;
            }
            player02.style.marginRight = player02_pos_right;
            player2_frame = (player2_frame === 1) ? 0:1;
        }
        else if(left2 === 1) {
            if(player02_posx - w >= player01_posx + WD) {
                player02_pos_right = player02_pos_right + w;
                player02_posx = player02_posx - w;
            }
            else aside = 1;
            player02.style.marginRight = player02_pos_right;
            player2_frame = (player2_frame === 1) ? 0:1;
        }
        else player2_frame = 0;
    }

    player02.style.marginTop = 200;
    c2 = (c2 + 1) % hitDamage;

    if(hit2 === 1){
        if(hit2c1 === 1) player02_move(`url${player02_image}`);
        else player02_move(`url${player02_image}`);
        if(c2 === 0){hit2 = hit2c1 = hit2c2 = 0;}
    }
    else if(player2_frame === 0) {
        player02_move(`url${player02_image}`);
    }
    else if(player2_frame === 1) {
        player02_move(`url${player02_image}`);
    }
    else if(player2_frame === 2) {
        player02_energy = player02_energy - damage;
        player02_move(`url${player02_image}`);
        if(aside === 1 && isup1 === 0){
            player01_life = player01_life - 20;
            hit1 = 1;
            hit1c2 = 1;
            kick_fx.play();
        }
    }
    else if(player2_frame === 3) {
        player02_energy = player02_energy - damage;
        player02_move(`url${player02_image}`);
        if(aside === 1 && isdown1 === 0){
            player01_life = player01_life - 20;
            hit1 = 1;
            hit1c1 = 1;
            punch_fx2.play();
        }
    }
    else if(player2_frame === 4) {
        player02_move(`url${player02_image}`);
        player02.style.marginTop = 200-120;
    }
    else if(player2_frame === 5) {
        player02_move(`url${player02_image}`);
        player02.style.marginTop = 200 + 20;
    }

    // Set Health bar & Energy bar
    document.getElementById('player01_life').style.width = player01_life;
    document.getElementById('player02_life').style.width = player02_life;
    document.getElementById('player01_energy').style.width = (player01_energy < 0) ? 0:player01_energy;
    document.getElementById('player02_energy').style.width = (player02_energy < 0) ? 0:player02_energy;


    // End of game
    if(player01_life <= 0 || player02_life <= 0){
        document.getElementById('overlay').style.display = "block";
        document.getElementById('playgame').innerHTML = "GAME OVER!";

        if(player01_life <= 0) {
            document.getElementById('gameresult').innerHTML = "Player 2 Wins!";
        }
        else {
            document.getElementById('gameresult').innerHTML = "Player 1 Wins!";
        }
        gameover = 1;
        game_over.play();
        document.getElementById('again').innerHTML = '<span id="clickable" onClick="restartGame()">PLAY AGAIN</span>';
    }

}

// Load screen
window.onload = function() {
    document.getElementById('overlay').style.display = "none";
    player01 = document.getElementById("player1");
    player02 = document.getElementById("player2");
    voice_over.play();
    setInterval("startGame()",100);
};
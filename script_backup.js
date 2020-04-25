let WD = 168;
let damage = 50;

// Player 1
let player01_posx=0, w=25, d=200;
let player01_life=300, player01_energy=300;
let up1 = 0,down1 = 0, left1 = 0, right1 = 0, punch1 = 0, kick1 = 0, push1 = 0,frame=0;
let k1 = 0, p1 = 0;

// Player 2
let player02_posx = 800-WD, player02_pos_right = 0, aside = 0;
let player02_life=300, player02_energy=300;
let up2 = 0,down2 = 0, left2 = 0, right2 = 0, punch2 = 0, kick2 = 0, push2 = 0,player2_frame=0;
let k2 = 0, p2 = 0;


var hit1 = 0, hit2 =0, c1 = 0 , c2 = 0 ,hitDamage = 15;
var hit1c1 = 0, hit1c2 =0 , hit2c1 =0, hit2c2 =0, isdown1=0, isdown2=0, isup1=0, isup2=0, bup1=0, bup2 = 0;


// Keyboard Function on Keydown
document.onkeydown = function(event) {
    let key = String.fromCharCode(event.keyCode);
    // Player 1
    if (key === 'W') up1 = 1;
    if (key === 'S')down1 = 1;
    if (key === 'A') left1 = 1;
    if (key === 'D') right1 = 1;
    if (key === 'E') punch1 = 1;
    if (key === 'R') kick1 = 1;
    if (key === 'F') push1 = 1;

    // Player 2
    if (key === 'U') up2 = 1;
    if (key === 'J') down2 = 1;
    if (key === 'H') left2 = 1;
    if (key === 'K') right2 = 1;
    if (key === 'I') punch2 = 1;
    if (key === 'O') kick2 = 1;
    if (key === 'L') push2 = 1;
};

// Keyboard Function on Keyup
document.onkeyup = function(event) {
    let key = String.fromCharCode(event.keyCode);
    // Player 1
    if (key === 'W') up1 = 0; bup1 = 0;
    if (key === 'S') down1 = 0;
    if (key === 'A') left1 = 0;
    if (key === 'D') right1 = 0;
    if (key === 'E') punch1 = 0; p1 = 0;
    if (key === 'R') kick1 = 0; k1 = 0;
    if (key === 'F') push1 = 0;

    // Player 2
    if (key === 'U') up2 = 0; bup2 = 0;
    if (key === 'J') down2 = 0;
    if (key === 'H') left2 = 0;
    if (key === 'K') right2 = 0;
    if (key === 'I') punch2 = 0; p2 = 0;
    if (key === 'O') kick2 = 0; k2 = 0;
    if (key === 'L') push2 = 0;
};

// Define Player
let player01, player02;
player01_move = (img) => { player01.style.backgroundImage = img; };
player02_move = (img) => { player02.style.backgroundImage = img; };
let gameover = 0;

// Main Game
function startGame() {
    // Initial Condition
    if (gameover === 1) return;
    player01_energy = player01_energy + ((player01_energy + 2 > 300) ? 0:2);
    player02_energy = player02_energy + ((player02_energy + 2 > 300) ? 0:2);

    if(hit1 === 0){
        isup1 = isdown1= 0;
        if(kick1 === 1 && player01_energy > 0) frame = (frame === 2) ? 0:2;
        else if(punch1 === 1 && player01_energy > 0) frame = (frame === 3) ? 0:3;
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
    // c1 = (c1+1) % hitDamage;

    if(hit1 === 1){
        if(hit1c1 === 1)player01_move("url(playerhit1.png)");
        else player01_move("url(playerhit2.png)");
        if(c1 === 0){ hit1 = hit1c1 = hit1c2 = 0;}
    }
    else if(frame === 0) {
        player01_move("url(player.png)");
    }
    else if(frame === 1) {
        player01_move("url(player1.png)");
    }
    else if(frame === 2) {
        // k1 = 1;
        player01_energy = player01_energy - damage;
        player01_move("url(kick.png)");
        if(aside === 1 && isup2 === 0){
            player02_life = player02_life - 20;
            hit2 = 1;
            hit2c2 = 1;
        }
    }
    else if(frame === 3) {
        // p1 = 1;
        player01_move("url(punch.png)");
        player01_energy = player01_energy - damage;
        if( aside === 1 && isdown2 === 0){
            player02_life = player02_life - 20;
            hit2 = 1;
            hit2c1 = 1;}
    }
    else if(frame === 4) {
        // bup1 = 1;
        player01_move("url(playerup.png)");
        player01.style.marginTop = 200-120;
    }
    else if(frame === 5) {
        player01_move("url(playerdown.png)");
        player01.style.marginTop = 200 + 20;
    }

    if(hit2 === 0){
        isdown2 = isup2 =  0;
        if(kick2 === 1 && player02_energy>0) player2_frame = (player2_frame===2 || k2 === 1)?0:2;
        else if(punch2 === 1 && player02_energy>0) player2_frame = (player2_frame===3 || p2===1)?0:3;
        else if(push2 === 1 && aside===1 && player02_energy>0) {
            player02_energy -= damage;
            player01_move("url(playerpush.png)");
            if(player01_posx-d>=0) {player01_posx-=d;aside=0;}
            else {player01_posx=0;aside=0;}
            player01.style.marginLeft = player01_posx;
        }else if(up2 === 1) {player2_frame = (player2_frame===4 || bup2 === 1)?0:4;isup2=1;}
        else if(down2 === 1) {player2_frame = 5; isdown2 = 1;}
        else if(right2 === 1) {
            if(player02_pos_right-w>=0) { player02_pos_right-=w;player02_posx+=w; aside=0;}
            player02.style.marginRight = player02_pos_right;
            player2_frame = (player2_frame===1)?0:1;
        } else if(left2 === 1) {
            if(player02_posx-w>=player01_posx+WD) { player02_pos_right+=w;player02_posx-=w; }
            else aside=1;
            player02.style.marginRight = player02_pos_right;
            player2_frame = (player2_frame===1)?0:1;
        } else player2_frame = 0;
    }
    player02.style.marginTop = 200;
    c2 = (c2+1)%hitDamage;
    if(hit2===1){
        if(hit2c1===1) player02_move("url(enemyhit1.png)");
        else player02_move("url(enemyhit2.png)");
        if(c2===0){hit2 = hit2c1 = hit2c2 =0;}
    } else if(player2_frame === 0) {
        player02_move("url(enemy.png)");
    } else if(player2_frame === 1) {
        player02_move("url(enemy1.png)");
    } else if(player2_frame === 2) {
        k2=1;
        player02_energy -= damage;
        player02_move("url(enemykick.png)");
        if(aside===1 && isup1===0){player01_life-=20;hit1=1;hit1c2=1;}
    } else if(player2_frame === 3) {
        p2 = 1;
        player02_energy -= damage;
        player02_move("url(enemypunch.png)");
        if(aside===1 && isdown1===0){player01_life-=20;hit1=1;hit1c1=1;}
    } else if(player2_frame === 4) {
        bup2 = 1;
        player02_move("url(enemyup.png)");
        player02.style.marginTop = 200-120;
    } else if(player2_frame === 5) {
        player02_move("url(enemydown.png)");
        player02.style.marginTop = 200+20;
    }

    document.getElementById('player01_life').style.width = player01_life;
    document.getElementById('player02_life').style.width = player02_life;
    document.getElementById('player01_energy').style.width = (player01_energy<0)?0:player01_energy;
    document.getElementById('player02_energy').style.width = (player02_energy<0)?0:player02_energy;

}


window.onload = function() {
    player01 = document.getElementById("player");
    player02 = document.getElementById("enemy");
    setInterval("startGame()",100);
};
// Initial Condition
let WD = 170;
let damage = 50;
let hitDamage = 15;

// Player 1
let player1_x = 0, w = 25,  d = 200;
let player1_life = 400, player1_energy = 300;
let up1 = 0,down1 = 0, left1 = 0, right1 = 0, punch1 = 0, kick1 = 0, push1 = 0,frame1=0;
let k1 = 0, p1 = 0, bup1 = 0, hit1 = 0, c1 = 0, hit1c1 = 0, hit1c2 = 0, isdown1 = 0, isup1 = 0;

// Player 2
let player2_x = 800 - WD, player2_right = 0, aside = 0;
let player2_life = 400, player2_energy = 300;
let up2 = 0, down2 = 0, left2 = 0, right2 = 0, punch2 = 0, kick2 = 0, push2 = 0, frame2 = 0;
let k2 = 0, p2 = 0, bup2 = 0, hit2 = 0, c2 = 0, hit2c1 = 0, hit2c2 = 0, isdown2 = 0, isup2 = 0;

// Keyboard Function 1
window.addEventListener("keydown", function (event) {
    let key = String.fromCharCode(event.keyCode);

    // Player 1
    if (key === 'W'){up1 = 1}
    if (key === 'S'){down1 = 1}
    if (key === 'A'){left1 = 1}
    if (key === 'D'){right1 = 1}
    if (key === 'E'){punch1 = 1}
    if (key === 'R'){kick1 = 1}
    if (key === 'F'){push1 = 1}

    // Player 2
    if (key === 'U'){up2 = 1}
    if (key === 'J'){down2 = 1}
    if (key === 'H'){left2 = 1}
    if (key === 'K'){right2 = 1}
    if (key === 'I'){punch2 = 1}
    if (key === 'O'){kick2 = 1}
    if (key === 'L'){push2 = 1}

});

// Keyboard Function 1
window.addEventListener("keyup", function (event) {
    let key = String.fromCharCode(event.keyCode);

    // Player 1
    if (key === 'W'){up1 = 0; bup1 = 0;}
    if (key === 'S'){down1 = 0}
    if (key === 'A'){left1 = 0}
    if (key === 'D'){right1 = 0}
    if (key === 'E'){punch1 = 0; p1 = 0;}
    if (key === 'R'){kick1 = 0; k1 = 0;}
    if (key === 'F'){push1 = 0}

    // Player 2
    if (key === 'U'){up2 = 0; bup2 = 0;}
    if (key === 'J'){down2 = 0}
    if (key === 'H'){left2 = 0}
    if (key === 'K'){right2 = 0}
    if (key === 'I'){punch2 = 0; p2 = 0;}
    if (key === 'O'){kick2 = 0; k2 = 0;}
    if (key === 'L'){push2 = 0}

});

// Define Player
let player, enemy;
function player1_move(img){	player.style.backgroundImage = img; }
function player2_move(img){ enemy.style.backgroundImage = img; }
let gameover  = 0;

// Play Again
// function playagain() {
// 	let gameover = 0;
// 	document.getElementById('p1').innerHTML = "";
// 	document.getElementById('p2').innerHTML = "";
// 	document.getElementById('center').innerHTML = "";
// 	document.getElementById('again').innerHTML = "";
//     let player1_x=0; w=25; d=200;
// 	let up1 = 0,down1 = 0, left1 = 0, right1 = 0, punch1 = 0, kick1 = 0, push1 = 0,frame1=0;
// 	let up2 = 0,down2 = 0, left2 = 0, right2 = 0, punch2 = 0, kick2 = 0, push2 = 0,frame2=0;
// 	let player1_x=800-WD; player2_right=0;aside=0;
// 	player1_life=300;  player2_life=300;
//     player1_energy=300; player2_energy=300;
// 	damage = 50;
// 	k1 = 0; p1 = 0;
// 	k2 = 0; p2 = 0;
// 	bup1 = 0; bup2 = 0;
// 	hit1 = 0; hit2 =0; c1 = 0 ; c2 = 0 ;hitDamage = 15;
// 	hit1c1 = 0; hit1c2 =0 ; hit2c1 =0; hit2c2 =0;isdown1=0;isdown2=0;isup1=0;isup2=0;
// 	player.style.marginLeft = player1_x;
// 	enemy.style.marginRight = player2_right;
// 	paint();
//
// }


// Play Game
function paint() {
    if(gameover === 1) return;
    player1_energy += (player1_energy + 2 > 300) ? 0 : 2;
    player2_energy += (player2_energy + 2 > 300) ? 0 : 2;

    // Initial Condition Player 1
    if(hit1===0){
        isup1 = isdown1= 0;
        if(kick1 === 1 && player1_energy > 0) frame1 = (frame1===2 || k1===1) ? 0:2;
        else if(punch1 === 1 && player1_energy>0) frame1 = (frame1===3 || p1===1)?0:3;
        else if(push1 === 1 && aside===1 && player1_energy>0) {
            player1_energy -=damage;
            player2_move("url(enemypush.png)");
            if(player2_right-d>=0) { player2_right-=d;player2_x+=d; aside=0;}
            else { player2_right=0;player2_x=800-WD; aside=0;}
            enemy.style.marginRight = player2_right;
        }
        else if(up1 === 1) {frame1 = (frame1===4 || bup1===1)?0:4;isup1=1;}
        else if(down1 === 1) {frame1 = 5;isdown1=1;}
        else if(right1 === 1) {
            if(player1_x+w+WD<=player2_x) player1_x+=w;
            else aside=1;
            player.style.marginLeft = player1_x;
            frame1 = (frame1===1)?0:1;
        }
        else if(left1 === 1) {
            if(player1_x-w>=0) {player1_x-=w;aside=0;}
            player.style.marginLeft = player1_x;
            frame1 = (frame1===1)?0:1;
        }
        else frame1 = 0;
    }

    player.style.marginTop = 200;
    c1 = (c1+1) % hitDamage;
    if(hit1===1){
        if(hit1c1===1)player1_move("url(playerhit1.png)");
        else player1_move("url(playerhit2.png)");
        if(c1===0){ hit1 = hit1c1 = hit1c2 = 0;}
    } else if(frame1 === 0) {
        player1_move("url(player.png)");
    } else if(frame1 === 1) {
        player1_move("url(player1.png)");
    } else if(frame1 === 2) {
        k1 = 1;
        player1_energy -=damage;
        player1_move("url(kick.png)");
        if(aside===1 && isup2===0){player2_life-=20;hit2=1;hit2c2=1;document.getElementById('p1').innerHTML = "<b>Bullseye!</b>";}
        else document.getElementById('p1').innerHTML = "<b>Missed!</b>";
        document.getElementById('p2').innerHTML = "";
    } else if(frame1 === 3) {
        p1 = 1;
        player1_move("url(punch.png)");
        player1_energy -= damage;
        if(aside===1 && isdown2===0){player2_life-=20;hit2=1;hit2c1=1;document.getElementById('p1').innerHTML = "<b>Bullseye!</b>";}
        else document.getElementById('p1').innerHTML = "<b>Missed!</b>";
        document.getElementById('p2').innerHTML = "";
    } else if(frame1 === 4) {
        bup1 = 1;
        player1_move("url(playerup.png)");
        player.style.marginTop = 200-120;
    } else if(frame1 === 5) {
        player1_move("url(playerdown.png)");
        player.style.marginTop = 200+20;
    }

    if(hit2===0){
        isdown2 = isup2 =  0;
        if(kick2 === 1 && player2_energy>0) frame2 = (frame2===2 || k2 === 1)?0:2;
        else if(punch2 === 1 && player2_energy>0) frame2 = (frame2===3 || p2===1)?0:3;
        else if(push2 === 1 && aside===1 && player2_energy>0) {
            player2_energy -= damage;
            player1_move("url(playerpush.png)");
            if(player1_x-d>=0) {player1_x-=d;aside=0;}
            else {player1_x=0;aside=0;}
            player.style.marginLeft = player1_x;
        }else if(up2 === 1) {frame2 = (frame2===4 || bup2 === 1)?0:4;isup2=1;}
        else if(down2 === 1) {frame2 = 5; isdown2 = 1;}
        else if(right2 === 1) {
            if(player2_right-w>=0) { player2_right-=w;player2_x+=w; aside=0;}
            enemy.style.marginRight = player2_right;
            frame2 = (frame2===1)?0:1;
        } else if(left2 === 1) {
            if(player2_x-w>=player1_x+WD) { player2_right+=w;player2_x-=w; }
            else aside=1;
            enemy.style.marginRight = player2_right;
            frame2 = (frame2===1)?0:1;
        } else frame2 = 0;
    }
    enemy.style.marginTop = 200;
    c2 = (c2+1)%hitDamage;
    if(hit2===1){
        if(hit2c1===1) player2_move("url(enemyhit1.png)");
        else player2_move("url(enemyhit2.png)");
        if(c2===0){hit2 = hit2c1 = hit2c2 =0;}
    } else if(frame2 === 0) {
        player2_move("url(enemy.png)");
    } else if(frame2 === 1) {
        player2_move("url(enemy1.png)");
    } else if(frame2 === 2) {
        k2=1;
        player2_energy -= damage;
        player2_move("url(enemykick.png)");
        if(aside===1 && isup1===0){player1_life-=20;hit1=1;hit1c2=1;document.getElementById('p2').innerHTML = "<b>Bullseye!</b>";}
        else document.getElementById('p2').innerHTML = "<b>Missed!</b>";
        document.getElementById('p1').innerHTML = "";
    } else if(frame2 === 3) {
        p2 = 1;
        player2_energy -= damage;
        player2_move("url(enemypunch.png)");
        if(aside===1 && isdown1===0){player1_life-=20;hit1=1;hit1c1=1;document.getElementById('p2').innerHTML = "<b>Bullseye!</b>";}
        else document.getElementById('p2').innerHTML = "<b>Missed!</b>";
        document.getElementById('p1').innerHTML = "";
    } else if(frame2 === 4) {
        bup2 = 1;
        player2_move("url(enemyup.png)");
        enemy.style.marginTop = 200-120;
    } else if(frame2 === 5) {
        player2_move("url(enemydown.png)");
        enemy.style.marginTop = 200 + 20;
    }

    document.getElementById('player1_life').style.width = player1_life;
    document.getElementById('enemyslife').style.width = player2_life;
    document.getElementById('myenergy').style.width = (player1_energy <0) ? 0 : player1_energy;
    document.getElementById('player2_energy').style.width = (player2_energy<0) ? 0 : player2_energy;

    if(player1_life <= 0 || player2_life<=0){
        if(player1_life <=0) document.getElementById('center').innerHTML = "<h2>Winner is player 2!!</h2>";
        else document.getElementById('center').innerHTML = "<h2>Winner is player 1!!</h2>";
        gameover = 1;
        document.getElementById('p1').innerHTML = "";
        document.getElementById('p2').innerHTML = "";
        document.getElementById('again').innerHTML = "<input type='button' onClick='playagain();' value='Play Again?' />";
    }
}

// Select Function
window.onload = function () {
    document.getElementById("p1").innerHTML = "";
    document.getElementById('p2').innerHTML = "";
    player = document.getElementById("player");
    enemy = document.getElementById("enemy");
    setInterval("paint()",100);
};


// var WD = 170;
//
// var posx=0, w=25, d=200;
// var up1 = 0,down1 = 0, left1 = 0, right1 = 0, punch1 = 0, kick1 = 0, push1 = 0,frame=0;
// var up2 = 0,down2 = 0, left2 = 0, right2 = 0, punch2 = 0, kick2 = 0, push2 = 0,eframe=0;
// var enemyposx=800-WD,enemyright=0,aside=0;
// var mylife=300, enemyslife=300;
// var myenergy=300, enemysenergy=300;
// var damage = 50;
// var k1 = 0, p1 = 0;
// var k2 = 0, p2 = 0;
// var bup1 = 0, bup2 = 0;
// var hit1 = 0, hit2 =0, c1 = 0 , c2 = 0 ,HitD = 15;
// var hit1c1 = 0, hit1c2 =0 , hit2c1 =0, hit2c2 =0,isdown1=0,isdown2=0,isup1=0,isup2=0, bup1=0;
// document.onkeydown = function(evt) {
//     var let = String.fromCharCode(evt.keyCode);
//     if(let=='W') {up1 = 1};
//     // (let === 'W') ? up1 = 1;
//     if(let=='S') down1 = 1;
//     if(let=='A') left1 = 1;
//     if(let=='D') right1 = 1;
//     if(let=='G') punch1 = 1;
//     if(let=='H') kick1 = 1;
//     if(let=='Q') push1 = 1;
//     if(evt.keyCode==37) left2 = 1;
//     if(evt.keyCode==38) up2 = 1;
//     if(evt.keyCode==39) right2 = 1;
//     if(evt.keyCode==40) down2 = 1;
//     if(evt.keyCode==97) punch2 = 1;
//     if(evt.keyCode==98) kick2 = 1;
//     // if(evt.keyCode==99) push2 = 1;
//     if(let=='L') push2 = 1;
// };
// document.onkeyup = function(evt) {
//     var let = String.fromCharCode(evt.keyCode);
//     if(let=='W') {up1 = 0;bup1=0;}
//     if(let=='S') down1 = 0;
//     if(let=='A') left1 = 0;
//     if(let=='D') right1 = 0;
//     if(let=='G') {punch1 = 0;p1=0;}
//     if(let=='H') {kick1 = 0;k1=0;}
//     if(let=='Q') push1 = 0;
//     if(evt.keyCode==37) left2 = 0;
//     if(evt.keyCode==38) {up2 = 0;bup2=0;}
//     if(evt.keyCode==39) right2 = 0;
//     if(evt.keyCode==40) down2 = 0;
//     if(evt.keyCode==97) {punch2 = 0;p2=0;}
//     if(evt.keyCode==98) {kick2 = 0;k2=0;}
//     if(evt.keyCode==99) push2 = 0;
// };
// var player, enemy;
// function move(img){	player.style.backgroundImage = img; }
// function emove(img){ enemy.style.backgroundImage = img; }
// var gameover  = 0;
//
// function playagain() {
//     gameover = 0;
//     document.getElementById('p1').innerHTML = "";
//     document.getElementById('p2').innerHTML = "";
//     document.getElementById('center').innerHTML = "";
//     document.getElementById('again').innerHTML = "";
//     posx=0, w=25, d=200;
//     up1 = 0,down1 = 0, left1 = 0, right1 = 0, punch1 = 0, kick1 = 0, push1 = 0,frame=0;
//     up2 = 0,down2 = 0, left2 = 0, right2 = 0, punch2 = 0, kick2 = 0, push2 = 0,eframe=0;
//     enemyposx=800-WD,enemyright=0,aside=0;
//     mylife=300, enemyslife=300;
//     myenergy=300, enemysenergy=300;
//     damage = 50;
//     k1 = 0, p1 = 0;
//     k2 = 0, p2 = 0;
//     bup2 = 0, bup2 = 0;
//     hit1 = 0, hit2 =0, c1 = 0 , c2 = 0 ,HitD = 15;
//     hit1c1 = 0, hit1c2 =0 , hit2c1 =0, hit2c2 =0,isdown1=0,isdown2=0,isup1=0,isup2=0;
//     player.style.marginLeft = posx;
//     enemy.style.marginRight = enemyright;
//     paint();
//
// }
//
//
// function paint() {
//     if(gameover == 1)return;
//     myenergy += (myenergy+2>300)?0:2;
//     enemysenergy += (enemysenergy+2>300)?0:2;
//     if(hit1==0){
//         isup1 = isdown1= 0;
//         if(kick1 == 1 && myenergy>0) frame =  (frame==2 || k1==1)?0:2;
//         else if(punch1 == 1 && myenergy>0) frame = (frame==3 || p1==1)?0:3;
//         else if(push1 == 1 && aside==1 && myenergy>0) {
//             myenergy -=damage;
//             emove("url(enemypush.png)");
//             if(enemyright-d>=0) { enemyright-=d;enemyposx+=d; aside=0;}
//             else { enemyright=0;enemyposx=800-WD; aside=0;}
//             enemy.style.marginRight = enemyright;
//         }else if(up1 == 1) {frame = (frame==4 || bup1==1)?0:4;isup1=1;}
//         else if(down1 == 1) {frame = 5;isdown1=1;}
//         else if(right1 == 1) {
//             if(posx+w+WD<=enemyposx) posx+=w;
//             else aside=1;
//             player.style.marginLeft = posx;
//             frame = (frame==1)?0:1;
//         } else if(left1 == 1) {
//             if(posx-w>=0) {posx-=w;aside=0;}
//             player.style.marginLeft = posx;
//             frame = (frame==1)?0:1;
//         } else frame = 0;
//     }
//
//     player.style.marginTop = 200;
//     c1 = (c1+1)%HitD;
//     if(hit1==1){
//         if(hit1c1==1)move("url(playerhit1.png)");
//         else move("url(playerhit2.png)");
//         if(c1==0){ hit1 = hit1c1 = hit1c2 = 0;}
//     } else if(frame == 0) {
//         move("url(player.png)");
//     } else if(frame == 1) {
//         move("url(player1.png)");
//     } else if(frame == 2) {
//         k1 = 1;
//         myenergy -=damage;
//         move("url(kick.png)");
//         if(aside==1 && isup2==0){enemyslife-=20;hit2=1;hit2c2=1;document.getElementById('p1').innerHTML = "<b>Bullseye!</b>";}
//         else document.getElementById('p1').innerHTML = "<b>Missed!</b>";
//         document.getElementById('p2').innerHTML = "";
//     } else if(frame == 3) {
//         p1 = 1;
//         move("url(punch.png)");
//         myenergy -= damage;
//         if(aside==1 && isdown2==0){	enemyslife-=20;hit2=1;hit2c1=1;document.getElementById('p1').innerHTML = "<b>Bullseye!</b>";}
//         else document.getElementById('p1').innerHTML = "<b>Missed!</b>";
//         document.getElementById('p2').innerHTML = "";
//     } else if(frame == 4) {
//         bup1 = 1;
//         move("url(playerup.png)");
//         player.style.marginTop = 200-120;
//     } else if(frame == 5) {
//         move("url(playerdown.png)");
//         player.style.marginTop = 200+20;
//     }
//
//     if(hit2==0){
//         isdown2 = isup2 =  0;
//         if(kick2 == 1 && enemysenergy>0) eframe = (eframe==2 || k2 == 1)?0:2;
//         else if(punch2 == 1 && enemysenergy>0) eframe = (eframe==3 || p2==1)?0:3;
//         else if(push2 == 1 && aside==1 && enemysenergy>0) {
//             enemysenergy -= damage;
//             move("url(playerpush.png)");
//             if(posx-d>=0) {posx-=d;aside=0;}
//             else {posx=0;aside=0;}
//             player.style.marginLeft = posx;
//         }else if(up2 == 1) {eframe = (eframe==4 || bup2 == 1)?0:4;isup2=1;}
//         else if(down2 == 1) {eframe = 5; isdown2 = 1;}
//         else if(right2 == 1) {
//             if(enemyright-w>=0) { enemyright-=w;enemyposx+=w; aside=0;}
//             enemy.style.marginRight = enemyright;
//             eframe = (eframe==1)?0:1;
//         } else if(left2 == 1) {
//             if(enemyposx-w>=posx+WD) { enemyright+=w;enemyposx-=w; }
//             else aside=1;
//             enemy.style.marginRight = enemyright;
//             eframe = (eframe==1)?0:1;
//         } else eframe = 0;
//     }
//     enemy.style.marginTop = 200;
//     c2 = (c2+1)%HitD;
//     if(hit2==1){
//         if(hit2c1==1) emove("url(enemyhit1.png)");
//         else emove("url(enemyhit2.png)");
//         if(c2==0){hit2 = hit2c1 = hit2c2 =0;}
//     } else if(eframe == 0) {
//         emove("url(enemy.png)");
//     } else if(eframe == 1) {
//         emove("url(enemy1.png)");
//     } else if(eframe == 2) {
//         k2=1;
//         enemysenergy -= damage;
//         emove("url(enemykick.png)");
//         if(aside==1 && isup1==0){mylife-=20;hit1=1;hit1c2=1;document.getElementById('p2').innerHTML = "<b>Bullseye!</b>";}
//         else document.getElementById('p2').innerHTML = "<b>Missed!</b>";
//         document.getElementById('p1').innerHTML = "";
//     } else if(eframe == 3) {
//         p2 = 1;
//         enemysenergy -= damage;
//         emove("url(enemypunch.png)");
//         if(aside==1 && isdown1==0){mylife-=20;hit1=1;hit1c1=1;document.getElementById('p2').innerHTML = "<b>Bullseye!</b>";}
//         else document.getElementById('p2').innerHTML = "<b>Missed!</b>";
//         document.getElementById('p1').innerHTML = "";
//     } else if(eframe == 4) {
//         bup2 = 1;
//         emove("url(enemyup.png)");
//         enemy.style.marginTop = 200-120;
//     } else if(eframe == 5) {
//         emove("url(enemydown.png)");
//         enemy.style.marginTop = 200+20;
//     }
//
//     document.getElementById('mylife').style.width = mylife;
//     document.getElementById('enemyslife').style.width = enemyslife;
//     document.getElementById('myenergy').style.width = (myenergy<0)?0:myenergy;
//     document.getElementById('enemysenergy').style.width = (enemysenergy<0)?0:enemysenergy;
//
//     if(mylife <= 0 || enemyslife<=0){
//         if(mylife <=0) document.getElementById('center').innerHTML = "<h2><blink>Winner is player 2!!</blink></h2>";
//         else document.getElementById('center').innerHTML = "<h2><blink>Winner is player 1!!</blink></h2>";
//         gameover = 1;
//         document.getElementById('p1').innerHTML = "";
//         document.getElementById('p2').innerHTML = "";
//         document.getElementById('again').innerHTML = "<input type='button' onClick='playagain();' value='Play Again?' />";
//     }
// }
// window.onload = function() {
//     document.getElementById('p1').innerHTML = "";
//     document.getElementById('p2').innerHTML = "";
//     player = document.getElementById("player");
//     enemy = document.getElementById("enemy");
//     setInterval("paint()",100);
// }




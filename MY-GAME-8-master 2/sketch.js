var score = 0;
var zombieGroup,bulletGroup;
var gameState = 0;
var lifelines = 3;
var zombies;
var desert,forest;
var reset;

function preload() {
  desertImg = loadImage("sprites/background.jpg");
   zombiesImg = loadImage("sprites/zombie.png");
   manImg = loadImage("sprites/man.png");
   bulletImg = loadImage("sprites/bullet.png");
   forestImg = loadImage("sprites/background1.jpg");
   zombies1Img = loadImage("sprites/zombie2.png");
   resetImg = loadImage("sprites/reset.png");
}

function setup() {
  createCanvas(1200,600);
  bg = createSprite(600,400,100,400);
  bg.addImage("desert",desertImg);
  bg.addImage("forest",forestImg);
  bg.scale = 2;
 reset =createSprite(width/2,400,40,40);
 reset.addImage(resetImg);
 reset.visible=false;
 // forest = addImage("building1");

  zombieGroup = new Group();
  bulletGroup = new Group();
  zombieGroup1 = new Group();
  bulletGroup1 = new Group();

 man = createSprite(50,540,30,70);
 man.addImage("man",manImg); 
 
// ground = createSprite(700,450,1000,20);
}

function draw() {
  
 

  man.y = mouseY;

 

 console.log(gameState);
  if(gameState === 0){
    bg.changeImage("desert",desertImg);
    bg.scale = 1;
  spawnZombies(); 
  reset.visible = false;
  for(var i = 0 ; i < (zombieGroup).length ; i++){
    z = (zombieGroup).get(i);
    if(z.x < man.x){
      lifelines = lifelines - 1;
      if(lifelines === 0){
        gameState = 1;
        break;
      }
    // console.log(lifelines);
    }
  }
 for(var i = 0 ; i< (zombieGroup).length ;i++){
    temp = (zombieGroup).get(i) ; 
    
    for(var j= 0 ; j< (bulletGroup).length ;j++){ 
      tem=(bulletGroup).get(j);
       //console.log(temp,tem);
        if (tem.collide(temp)) { 
          tem.destroy();
           temp.destroy(); 
           // bulletGroup.destroyEach();
            score = score + 1; 
            break;
           }
           } 
          } 
          if(keyWentDown("space")){ 
            spawnBullets();
           }
        
           if(score === 10){
            gameState = 2;
            zombieGroup.destroyEach();
            bulletGroup.destroyEach();
            }
        
          }

  
  drawSprites();

  if(gameState === 1){
    zombieGroup.setVelocityXEach(0);
    zombieGroup.setLifetimeEach(-1);
    zombieGroup1.setVelocityXEach(0);
    zombieGroup1.setLifetimeEach(-1);
    textSize(150)
    fill("red")
    text("GAME OVER",200,350);
    reset.visible=true;
   }

if(mousePressedOver(reset)){
  lifelines=3;
  gameState = 0;
 // reset.visible = false;
  zombieGroup.destroyEach();
  zombieGroup1.destroyEach();
}

  if(gameState === 2){
  //  console.log("buildfhyhshigijrijjhfiiuydjkhyeiuehy");
    bg.changeImage("forest",forestImg);
    bg.scale = 1;

    spawnZombies2();

    if(keyWentDown("space")){ 
      spawnBullets2();
     // console.log("inside spawnBullet ");
     }

    for(var i = 0 ; i < (zombieGroup1).length ; i++){
      z = (zombieGroup1).get(i);
      if(z.x < man.x){
        lifelines = lifelines - 1;
        if(lifelines === 0){
          gameState = 1;
          break;
        }
         //console.log();
      }
    }

 for(var i = 0 ; i< (zombieGroup1).length ;i++){
  temp = (zombieGroup1).get(i) ; 
  
  for(var j= 0 ; j< (bulletGroup1).length ;j++){ 
    tem=(bulletGroup1).get(j);
     //console.log(temp,tem);
      if (tem.collide(temp)) { 
        tem.destroy();
         temp.destroy(); 
         // bulletGroup.destroyEach();
          score = score + 1; 
          break;
         }
         } 
        } 

      }

  
  noStroke();
  textSize(35)
  fill("red")
  text("Score  " + score, 900, 50)
}

 function spawnZombies(){
   if(World.frameCount % 10 === 0) {
        zombies = createSprite(1150,random(250,550),10,50);
         zombies.addImage("zombie",zombiesImg);
         zombies.scale = 0.2;
         zombies.velocityX = -7;
         zombies.lifetime = 240;
         drawSprites();
          zombieGroup.add(zombies);
     }
}

function spawnBullets(){
 // console.log("inside spawnBullet function");
   var bullet = createSprite(100,530,10,5);
        bullet.y = mouseY;
        bullet.addImage("bullet",bulletImg);
        bullet.scale = 0.1;
         bullet.velocityX = 5;
         bullet.lifetime = 250;
          bulletGroup.add(bullet);
}

function spawnZombies2(){
  if(World.frameCount % 10 === 0) {
       zombies1 = createSprite(1150,random(250,550),10,50);
        zombies1.addImage("zombie2",zombies1Img);
        zombies1.scale = 0.5;
        zombies1.velocityX = -7;
        zombies1.lifetime = 240;
        drawSprites();
         zombieGroup1.add(zombies1);
    }
}

function spawnBullets2(){
 // console.log("inside spawnBullet function");
   var bullet1 = createSprite(100,530,10,5);
        bullet1.y = mouseY;
        bullet1.addImage("bullet",bulletImg);
        bullet1.scale = 0.1;
         bullet1.velocityX = 5;
         bullet1.lifetime = 250;
          bulletGroup1.add(bullet1);
}
var backImage;
var player_running;
var bananaImage, banana;
var obstacle_img ,obstacle;
var ground,ground2,player;


function preload(){            
  backImage = loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("stone.png");
  
  
}

function setup() {
  createCanvas(400, 400);
  ground = createSprite(200, 40, 800, 10);
  ground.addImage("ground",backImage);
  ground.x = ground.width /2;
  ground.velocityX = -6;
  ground.scale = 1.5;
  
  ground2 = createSprite(200, 325, 400, 10);
  ground2.visible = false;
  
  player = createSprite(75, 300);
  player.addAnimation("player",player_running)
  
  player.scale = 0.1;
  
  obstaclesGroup = new Group();
  bananasGroup = new Group();
}

function draw() {
  background(220);
  
  if (ground.x < 0) {
    ground.x =ground.width /2;
  }
  
  player.collide (ground2);
  player.velocityY = player.velocityY + 0.8
  
    if(keyDown("space") && player.y >= 270) {
      player.velocityY = -13;
    }
  
  if(bananasGroup.isTouching(player)){
    bananasGroup.setLifetimeEach(1);
    player.scale = player.scale + 0.02;
  }
  
   if(obstaclesGroup.isTouching(player)){
    obstaclesGroup.setLifetimeEach(1);
    player.scale = player.scale - 0.02;
  }
  
  Obstacles();
  bananas();
  
  drawSprites();
}

function Obstacles() {
  if(frameCount % 80 === 0) {
    var obstacle = createSprite(400,300,10,40);
    obstacle.addImage("stone" ,obstacle_img  );
    obstacle.velocityX = -6;           
    obstacle.scale = 0.12;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}

function bananas() {
  if (frameCount % 60 === 0) {
    var banana = createSprite(400,200,40,10);
    banana.y = Math.round(random(150,230));
    banana.addImage("banana", bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -6;
    banana.lifetime = 200;
    banana.depth = player.depth;
    banana.depth = player.depth + 1;
    
    bananasGroup.add(banana);
  }
  
}


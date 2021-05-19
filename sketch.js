
var dog , dogImage , happyDog , database , foodS ,foodStock;
var FeedTime , lastFed , foodObj;
var feed , addFood;
var changinggameState , readinggameState;
var bedroom_img , garden_img , washroom_img , LivingRoom_img; 
var sadDog;
var gameState;
var currentTime;

function preload()
{
  dogImage = loadImage("images/dogImg1.png");
  happyDog = loadImage("images/dogImg.png");
  bedroom_img = loadImage("images/Bed Room.png") ; 
  garden_img = loadImage("images/Garden.png") ;
  washroom_img = loadImage("images/Wash Room.png");
  LivingRoom_img = loadImage("images/Living Room.png")
}

function setup() {
	createCanvas(1000, 700);
  
  database = firebase.database();

 readinggameState=database.ref('gameState');
 readinggameState.on("value",function(data){
   gameState=data.val()
 });

  dog = createSprite(550 , 350,200,200);
 //dog.addImage(dogImage);
  dog.scale = 0.2

  foodObj= new Food();
  foodStock = database.ref('foodStock')
  foodStock.on("value" , readStock);

  feed = createButton("FEED THE DOG");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("ADD FOOD");
  addFood.position(820,95);
  addFood.mousePressed(addFoods)
}


function draw() 
{ 
  background("green")
  FeedTime = database.ref('FeedTime')
  FeedTime.on("value" , function(data){
    lastFed = data.val();
  });

  fill(255,255,255) 
  textSize(15)
  if(lastFed>=12)
  {
    text("LAST FEED : " + lastFed%12 + "  PM" , 350, 30);
  }else if(lastFed == 0)
  {
    text("LAST FEED : 12AM",350 , 30);
  }else
  {
    text("LAST FEED : " + lastFed + "AM" , 350 , 30);
  }
  currentTime=hour()+1;

  if(currentTime==(lastFed+1))
  {
    update("LivingRoom")
    foodObj.LivingRoom()
    
  }else if(currentTime==(lastFed+3))
  {
    update("Playing")
    foodObj.garden()
  }else if(currentTime==(lastFed+2))
  {
    update("Bathing")
    foodObj.washroom()
  }else if(currentTime>(lastFed+2)&&currentTime<=(lastFed+4))
  {
    update("Sleeping")
    foodObj.bedroom()
  }else
  {
    update("Hungry")
    foodObj.display();

  }

  

  
  if(gameState!="Hungry")
  {
    feed.hide();
    addFood.hide();
    dog.remove();
  }
  else
  {
    feed.show();
    addFood.show();
    dog.addImage(dogImage);
  }

  
drawSprites()
}
function readStock(data)
{
foodS = data.val();
foodObj.updateFoodStock(foodS)
}

function feedDog()
{
dog.addImage(happyDog);
foodObj.velocityX = 2
//console.log(dog)
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    foodStock:foodObj.getFoodStock(),
    FeedTime:hour()
  })
    
 
}
function addFoods()
{
  foodS++;
  database.ref('/').update({
    foodStock:foodS
  })
}

function update(state)
{
database.ref('/').update({
  gameState:state
})
}



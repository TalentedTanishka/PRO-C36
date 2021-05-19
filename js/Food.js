class Food
{

    constructor()
    {
        this.FoodStock = '';
        this.lastFed = '' ;
        this.image = loadImage("images/Milk.png")
    }
   
    getFoodStock()
    {
        /*
        this.FoodStock = database.ref('foodStock') ;
        FoodStock.on("value"  ,(data)=>{
            foodStock = data.val();
        })
        */
    return this.foodStock
    }
    updateFoodStock(food)
    {
        /*
        database.ref('/').update({
            foodStock : food
        })
       */
      this.foodStock = food
    }

    
bedroom()
{
    background(bedroom_img,1000, 700);
}

washroom()
{
    background(washroom_img,1000, 700);
}

garden()
{
    background(garden_img,1000, 700);
}

LivingRoom()
{
    background(LivingRoom_img,1000, 700);
}
   
   

    display()
    {
        var x = 80 , y = 100;

        imageMode(CENTER);
       // image(this.image , 720 , 220 , 70 , 70);
      
        if(this.foodStock!=0)
        {
            for(var i=0 ; i<this.foodStock ; i++)
            {
                if(i%10 == 0)
                {
                    x = 80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
                     }          
        }
        
    }
}
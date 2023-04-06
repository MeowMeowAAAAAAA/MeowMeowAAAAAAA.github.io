window.addEventListener('load',function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1300;
    canvas.height = 900;

    document.getElementById("base_bun_button").onclick=function() {
        var image = document.getElementById("coverdown_bun");
        game.base = new Base(game, image);
    };
    document.getElementById("base_bread_button").onclick=function() {
        var image = document.getElementById("coverdown_bread");
        game.base = new Base(game, image);
    };

    document.getElementById("cover_bun_button").onclick=function() {
        var image = document.getElementById("coverup_bun");
        game.cover = new Cover(game, image);
    };
    document.getElementById("cover_bread_button").onclick=function() {
        var image = document.getElementById("coverup_bread");
        game.cover = new Cover(game, image);
    };

    document.getElementById("burger_chocolate_button").onclick=function() {
        var image = document.getElementById("burger_chocolate");
        game.burger = new Burger(game, image);
    };
    document.getElementById("burger_grilled_button").onclick=function() {
        var image = document.getElementById("burger_grilled");
        game.burger = new Burger(game, image);
    };
    document.getElementById("burger_fried_button").onclick=function() {
        var image = document.getElementById("burger_fried");
        game.burger = new Burger(game, image);
    };
    document.getElementById("burger_squarefried_button").onclick=function() {
        var image = document.getElementById("burger_squarefried");
        game.burger = new Burger(game, image);
    };

    document.getElementById("veggies_onion_button").onclick=function() {
        var image = document.getElementById("veggies_onion");
        game.veggies = new Veggies(game, image);
    };
    document.getElementById("veggies_cucumber_button").onclick=function() {
        var image = document.getElementById("veggies_cucumber");
        game.veggies = new Veggies(game, image);
    };
    document.getElementById("veggies_tomato_button").onclick=function() {
        var image = document.getElementById("veggies_tomato");
        game.veggies = new Veggies(game, image);
    };
    document.getElementById("veggies_pickles_button").onclick=function() {
        var image = document.getElementById("veggies_pickles");
        game.veggies = new Veggies(game, image);
    };

    document.getElementById("sauce_green_button").onclick=function() {
        var image = document.getElementById("sauce_green");
        game.sauce = new Sauce(game, image);
    };
    document.getElementById("sauce_peach_button").onclick=function() {
        var image = document.getElementById("sauce_peach");
        game.sauce = new Sauce(game, image);
    };
    document.getElementById("sauce_red_button").onclick=function() {
        var image = document.getElementById("sauce_red");
        game.sauce = new Sauce(game, image);
    };
    document.getElementById("sauce_yellow_button").onclick=function() {
        var image = document.getElementById("sauce_yellow");
        game.sauce = new Sauce(game, image);
    };

    document.getElementById("leaf_leaf1_button").onclick=function() {
        var image = document.getElementById("leaf_leaf1");
        game.leaf = new Leaf(game, image);
    };
    document.getElementById("leaf_leaf2_button").onclick=function() {
        var image = document.getElementById("leaf_leaf2");
        game.leaf = new Leaf(game, image);
    };

    document.getElementById("cheese_egg_button").onclick=function() {
        var image = document.getElementById("cheese_egg");
        game.cheese = new Cheese(game, image);
    };
    document.getElementById("cheese_cheese_button").onclick=function() {
        var image = document.getElementById("cheese_cheese");
        game.cheese = new Cheese(game, image);
    };
    document.getElementById("cheese_holecheese_button").onclick=function() {
        var image = document.getElementById("cheese_holecheese");
        game.cheese = new Cheese(game, image);
    };
    document.getElementById("instruction_button").onclick=function() {
        game.show = !game.show;
    }

    document.getElementById("spacebar_button").onclick=function() {
        if(game.plate.canMove){
            game.plate.canMove = false;
            if(!(game.plate.x >= 990) && !game.gameOver) game.plate.moveForward();
        }
    }
    document.getElementById("up_button").onclick=function() {
        game.plate.upPressed = true;
    }
    document.getElementById("down_button").onclick=function() {
        game.plate.downPressed = true;
    }

    class InputHandler{
            constructor(game){
                this.game = game;
                window.addEventListener('keydown',e => {
                    
                    if(( (e.key === 'ArrowUp') || (e.key === 'ArrowDown'))  && this.game.keys.indexOf(e.key) === -1){
                        this.game.keys.push(e.key);
                    }
                    else if(e.key === 'p') this.game.pauseGame();
                    else if(e.key === ' ' && !(this.game.plate.x === 990) && !this.game.gameOver && this.game.plate.canMove){
                        this.game.plate.canMove = false;
                        this.game.plate.moveForward();
                    } 
                });
                window.addEventListener('keyup', e => {
                    if(this.game.keys.indexOf(e.key) > -1){
                        this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
                    }
                });
            }
    }
    class Customer{
        constructor(game, x, y){
            this.game = game;
            this.x = x;
            this.y = y;
            this.width = 150;
            this.height = 250;
            this.speedX = 0;
            this.moveSpeed = 3;
            this.positionX = 0;
            this.remove = false;
            this.taskDone = false;
            this.image = null;
            this.index = null;
            this.addNewOrder();
        }
        update(){
            this.x += this.speedX;
            if(!this.taskDone && this.x < this.positionX) this.speedX = this.moveSpeed;
            else if(!this.taskDone){
               this.speedX = 0; 
            } 
            else if(this.taskDone){
                this.speedX = this.moveSpeed;
                this.game.food = null;
            } 

            if (this.game.plate.x === 990 && (this.game.keys.includes('ArrowUp') || this.game.plate.upPressed) && !this.game.plate.empty){
                if(this.game.customers.indexOf(this) === 0 && this.speedX === 0) this.taskDone = true;
            } 

            if(this.x > this.game.width && this.taskDone) this.remove = true;
        }
        draw(context){
                // context.strokeRect(this.x, this.y, this.width, this.height);
                context.drawImage(this.game.orders[this.index].image, this.x, this.y, this.width, this.height);
        }
        generateRandomCustomer() {
            const index = Math.floor(Math.random() * this.game.customerinfo.length);
            return this.game.customerinfo[index];
        }

        generateRandomOrder() {
            const customer = this.generateRandomCustomer();
            const baseItemIndex = Math.floor(Math.random() * this.game.menuBase.length);
            const burgerItemIndex = Math.floor(Math.random() * this.game.menuBurger.length);
            const veggiesItemIndex = Math.floor(Math.random() * this.game.menuVeggies.length);
            const sauceItemIndex = Math.floor(Math.random() * this.game.menuSauce.length);
            const leafItemIndex = Math.floor(Math.random() * this.game.menuLeaf.length);
            const cheeseItemIndex = Math.floor(Math.random() * this.game.menuCheese.length);
            const Base = this.game.menuBase[baseItemIndex];
            const Burger = this.game.menuBurger[burgerItemIndex];
            const Veggies = this.game.menuVeggies[veggiesItemIndex];
            const Sauce = this.game.menuSauce[sauceItemIndex];
            const Leaf = this.game.menuLeaf[leafItemIndex];
            const Cheese = this.game.menuCheese[cheeseItemIndex];
            return {customer: customer.name, image: customer.image, Base: Base.image, Burger: Burger.image, Veggies: Veggies.image, Sauce: Sauce.image, Leaf: Leaf.image, Cheese: Cheese.image, Cover: (Base.image === document.getElementById('coverdown_bun') ? document.getElementById('coverup_bun') : document.getElementById('coverup_bread'))};
        }

        addNewOrder() {
            const order = this.generateRandomOrder();
            this.game.orders.push(order);
            this.index = this.game.orders.indexOf(order);
        }
    }
    class Food{
        constructor(game){
            this.game = game;
            this.x = 1070;
            this.y = 55;
            this.width = 130;
            this.height = 130;
            this.imageBox = document.getElementById('box');
            this.imagePlate = document.getElementById('plate');
            this.imageBase = this.game.orders[this.game.customers[0].index].Base;
            this.imageBurger = this.game.orders[this.game.customers[0].index].Burger;
            this.imageVeggies = this.game.orders[this.game.customers[0].index].Veggies;
            this.imageSauce = this.game.orders[this.game.customers[0].index].Sauce;
            this.imageLeaf = this.game.orders[this.game.customers[0].index].Leaf;
            this.imageCheese = this.game.orders[this.game.customers[0].index].Cheese;
            this.imageCover = this.game.orders[this.game.customers[0].index].Cover;
        }
        draw(context){
            context.drawImage(this.imageBox, 1030, 70, 210, 200);
            context.drawImage(this.imagePlate, this.x, this.y, this.width, this.height);
            context.drawImage(this.imageBase, this.x, this.y, this.width, this.height);
            context.drawImage(this.imageBurger, this.x, this.y, this.width, this.height);
            context.drawImage(this.imageVeggies, this.x, this.y, this.width, this.height);
            context.drawImage(this.imageSauce, this.x, this.y, this.width, this.height);
            context.drawImage(this.imageLeaf, this.x, this.y, this.width, this.height);
            context.drawImage(this.imageCheese, this.x, this.y, this.width, this.height);
            context.drawImage(this.imageCover, this.x, this.y, this.width, this.height);
            
        }
    }
    class Plate{
        constructor(game){
            this.game = game;
            this.width = 250;
            this.height = 250;
            this.x = -300;
            this.y = 400;
            this.imagePlate = document.getElementById('plate');
            this.speedX = 0;
            this.positionX = 30;
            this.moveSpeed = 10;
            this.nextPosition = 160;
            this.canMove = true;
            this.remove = false;
            this.empty = true;
            this.upPressed = false;
            this.downPressed = false;
            this.game.base = null;
            this.game.burger = null;
            this.game.veggies = null;
            this.game.sauce = null;
            this.game.leaf = null;
            this.game.cheese = null;
            this.game.cover = null;
        }
        update(){
            this.x += this.speedX;
            if(this.x < this.positionX) this.speedX = this.moveSpeed;
            else this.speedX = 0;

            if(this.x === 30){
                document.getElementById("base_bun_button").classList.remove("hidden");
                document.getElementById("base_bread_button").classList.remove("hidden");
            }
            else if(this.x === 190){
                document.getElementById("base_bun_button").classList.add("hidden");
                document.getElementById("base_bread_button").classList.add("hidden");
                document.getElementById("burger_chocolate_button").classList.remove("hidden");
                document.getElementById("burger_grilled_button").classList.remove("hidden");
                document.getElementById("burger_fried_button").classList.remove("hidden");
                document.getElementById("burger_squarefried_button").classList.remove("hidden");
            }
            else if(this.x === 350){
                document.getElementById("burger_chocolate_button").classList.add("hidden");
                document.getElementById("burger_grilled_button").classList.add("hidden");
                document.getElementById("burger_fried_button").classList.add("hidden");
                document.getElementById("burger_squarefried_button").classList.add("hidden");
                document.getElementById("veggies_onion_button").classList.remove("hidden");
                document.getElementById("veggies_cucumber_button").classList.remove("hidden");
                document.getElementById("veggies_tomato_button").classList.remove("hidden");
                document.getElementById("veggies_pickles_button").classList.remove("hidden");
            }
            else if(this.x === 510){
                document.getElementById("veggies_onion_button").classList.add("hidden");
                document.getElementById("veggies_cucumber_button").classList.add("hidden");
                document.getElementById("veggies_tomato_button").classList.add("hidden");
                document.getElementById("veggies_pickles_button").classList.add("hidden");
                document.getElementById("sauce_green_button").classList.remove("hidden");
                document.getElementById("sauce_peach_button").classList.remove("hidden");
                document.getElementById("sauce_red_button").classList.remove("hidden");
                document.getElementById("sauce_yellow_button").classList.remove("hidden");
            }
            else if(this.x === 670){
               
                document.getElementById("sauce_green_button").classList.add("hidden");
                document.getElementById("sauce_peach_button").classList.add("hidden");
                document.getElementById("sauce_red_button").classList.add("hidden");
                document.getElementById("sauce_yellow_button").classList.add("hidden");
                document.getElementById("leaf_leaf1_button").classList.remove("hidden");
                document.getElementById("leaf_leaf2_button").classList.remove("hidden");
            }
            else if(this.x === 830){
                document.getElementById("leaf_leaf1_button").classList.add("hidden");
                document.getElementById("leaf_leaf2_button").classList.add("hidden");
                document.getElementById("cheese_egg_button").classList.remove("hidden");
                document.getElementById("cheese_cheese_button").classList.remove("hidden");
                document.getElementById("cheese_holecheese_button").classList.remove("hidden");
            }
            else if(this.x === 990){
                document.getElementById("cheese_egg_button").classList.add("hidden");
                document.getElementById("cheese_cheese_button").classList.add("hidden");
                document.getElementById("cheese_holecheese_button").classList.add("hidden");
                document.getElementById("cover_bun_button").classList.remove("hidden");
                document.getElementById("cover_bread_button").classList.remove("hidden");
            }

            if(this.x === 990 && !this.game.gameOver && ((this.game.keys.includes('ArrowUp') || this.upPressed) || (this.game.keys.includes('ArrowDown') || this.downPressed)))
            {
                const index = this.game.customers[0].index;
                // this.remove = true;
                
                if((this.game.keys.includes('ArrowUp') || this.upPressed) && !this.empty){
                    this.moveForward();
                    
                    this.game.checkFood(index);
                } 
                else if(this.game.keys.includes('ArrowDown') || this.downPressed) this.moveForward();

                this.upPressed = false;
                this.downPressed = false;
            }

            if(this.x + this.width + 100 > this.game.width) this.remove = true;

            if(this.remove && this.x > this.game.width){
                document.getElementById("cover_bun_button").classList.add("hidden");
                document.getElementById("cover_bread_button").classList.add("hidden");
                this.game.NewPlate();
            } 
            
            if(this.x === this.positionX) this.canMove = true;
        }
        draw(context){
                context.drawImage(this.imagePlate, this.x, this.y, this.width, this.height);
        }
        moveForward(){
            if(this.remove) this.positionX += this.nextPosition + 200;
            else this.positionX += this.nextPosition;
        }
    }
    class Base{
        constructor(game, image){
            this.game = game;
            this.image = image;
            this.width = 250;
            this.height = 250;
            this.x = this.game.plate.x;
            this.y = 400;
            this.game.plate.empty = false;
        }
        update(){
            this.x = this.game.plate.x;
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
    class Burger{
        constructor(game, image){
            this.game = game;
            this.image = image;
            this.width = 250;
            this.height = 250;
            this.x = this.game.plate.x;
            this.y = 400;
            this.game.plate.empty = false;
        }
        update(){
            this.x = this.game.plate.x;
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
    class Veggies{
        constructor(game, image){
            this.game = game;
            this.image = image;
            this.width = 250;
            this.height = 250;
            this.x = this.game.plate.x;
            this.y = 400;
            this.game.plate.empty = false;
        }
        update(){
            this.x = this.game.plate.x;
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
    class Sauce{
        constructor(game, image){
            this.game = game;
            this.image = image;
            this.width = 250;
            this.height = 250;
            this.x = this.game.plate.x;
            this.y = 400;
            this.game.plate.empty = false;
        }
        update(){
            this.x = this.game.plate.x;
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
    class Leaf{
        constructor(game, image){
            this.game = game;
            this.image = image;
            this.width = 250;
            this.height = 250;
            this.x = this.game.plate.x;
            this.y = 400;
            this.game.plate.empty = false;
        }
        update(){
            this.x = this.game.plate.x;
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
    class Cheese{
        constructor(game, image){
            this.game = game;
            this.image = image;
            this.width = 250;
            this.height = 250;
            this.x = this.game.plate.x;
            this.y = 400;
            this.game.plate.empty = false;
        }
        update(){
            this.x = this.game.plate.x;
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
    class Cover{
        constructor(game, image){
            this.game = game;
            this.image = image;
            this.width = 250;
            this.height = 250;
            this.x = this.game.plate.x;
            this.y = 400;
            this.game.plate.empty = false;
        }
        update(){
            this.x = this.game.plate.x;
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
    class Layer{
        constructor(game, image){
            this.game = game;
            this.image = image;
            this.width = 1300;
            this.height = 950;
            this.x = 0;
            this.y = 0;
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
    class Background{
        constructor(game){
            this.game = game;
            this.image1 = document.getElementById('kitchen');
            this.layer1 = new Layer(this.game, this.image1)
            this.layers = [this.layer1];
        }
        draw(context){
            this.layers.forEach(layer => layer.draw(context));
        }
    }
    class UI{
        constructor(game){
            this.game = game;
            this.fontSize = 30;
            this.fontFamily = 'Monoton';
            this.fontFamily2 = 'Righteous';
            this.color = 'white';
        }
        draw(context){
            context.save();
            context.fillStyle = this.color;
            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;
            context.shadowColor = 'black';
            context.font = this.fontSize + 'px ' + this.fontFamily;
            //score
            context.fillText('Score: ' + this.game.score, 20,40); 
            //timer
            const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
            context.fillText('Time: ' + formattedTime, 20, 100);
            //game over messages
            if (this.game.gameOver){
                context.textAlign = 'center';
                let message1;
                let message2;
                if (this.game.score >= this.game.winningscore){
                    message1 = 'You win!';
                    message2 = 'Your score: ' + this.game.score;
                }
                else{
                    message1 = 'You lose!';
                    message2 = 'Try again';
                }
                context.font = '50px ' + this.fontFamily;
                context.fillText(message1, this.game.width * 0.5, this.game.height * 0.5);
                context.font = '25px ' + this.fontFamily;
                context.fillText(message2, this.game.width * 0.5, this.game.height * 0.6);
            }
            //instructions
            if(this.game.instructions != null){
                context.textAlign = 'left';
                let messagea = 'Space bar -> Next set of ingredients';
                let messageb = 'Mouse -> Select ingredients';
                let messagec = 'Up arrow key -> Deliver the order to the customer';
                let messaged = 'Down arrow key -> Use the bin for incorrect order';
                context.font = '30px ' + this.fontFamily2;
                context.fillText(messagea, 100, 370);
                context.fillText(messageb, 100, 430);
                context.fillText(messagec, 100, 490);
                context.fillText(messaged, 100, 550);
            }
            context.restore();
        }
    }
    class Screen{
        constructor(game){
            this.game = game;
            this.image = document.getElementById('screen');
        }
        draw(context){
            context.drawImage(this.image, 0, 0, this.game.width, this.game.height);
        }
    }
    class Instructions{
        constructor(game){
            this.game = game;
            this.screenimage = document.getElementById('screen');
        }
        draw(context){
            context.drawImage(this.screenimage, 50, 300, this.game.width-100, this.game.height/3);
        }
    }
    class Game{
            constructor(width, height){
                this.width = width;
                this.height = height;
                this.customers = [];
                this.orders = [];
                this.background = new Background(this);
                this.plate = null;
                this.base = null;
                this.burger = null;
                this.veggies = null;
                this.sauce = null;
                this.leaf = null;
                this.cheese = null;
                this.cover = null;
                this.screen = null;
                this.instructions = null;
                this.audioscore = document.getElementById('audioscore');
                this.audiounscore = document.getElementById('audiounscore');
                this.audiowin = document.getElementById('audiowin');
                this.audiolose = document.getElementById('audiolose');
                this.shopname = document.getElementById('shopname');
                this.audiowin.volume = 0.3;
                this.audiolose.volume = 0.3;
                this.NewPlate();
                this.input = new InputHandler(this);
                this.food = null;
                this.ui = new UI(this);
                this.keys = [];
                this.timeBetweenCustomers = 5000;
                this.timeToNextCustomer = 0;
                this.score = 0;
                this.orderscore = 1;
                this.winningscore = 10;
                this.gameOver = false;
                this.gamePaused = false;
                this.show = false;
                this.gameTime = 500000;
                this.timeLimit = 0;
                this.customerinfo = [
                    {name: '1', image: document.getElementById('customer1')},
                    {name: '2', image: document.getElementById('customer2')},
                    {name: '3', image: document.getElementById('customer3')},
                    {name: '4', image: document.getElementById('customer4')},
                    {name: '5', image: document.getElementById('customer5')},
                    {name: '6', image: document.getElementById('customer6')},
                ];
                this.menuBase = [
                    {image: document.getElementById('coverdown_bun')},
                    {image: document.getElementById('coverdown_bread')},
                    ];
                this.menuBurger = [
                    {image: document.getElementById('burger_chocolate')},
                    {image: document.getElementById('burger_grilled')},
                    {image: document.getElementById('burger_fried')},
                    {image: document.getElementById('burger_squarefried')},
                ];
                this.menuVeggies = [
                    {image: document.getElementById('veggies_onion')},
                    {image: document.getElementById('veggies_cucumber')},
                    {image: document.getElementById('veggies_tomato')},
                    {image: document.getElementById('veggies_pickles')},
                ];
                this.menuSauce = [
                    {image: document.getElementById('sauce_green')},
                    {image: document.getElementById('sauce_peach')},
                    {image: document.getElementById('sauce_red')},
                    {image: document.getElementById('sauce_yellow')},
                ];
                this.menuLeaf = [
                    {image: document.getElementById('leaf_leaf1')},
                    {image: document.getElementById('leaf_leaf2')},
                ];
                this.menuCheese = [
                    {image: document.getElementById('cheese_egg')},
                    {image: document.getElementById('cheese_cheese')},
                    {image: document.getElementById('cheese_holecheese')},
                ];
            }
            update(deltaTime){
                if(this.show) this.instructions = new Instructions(this);
                else this.instructions = null;

                if (!this.gameOver) this.gameTime -= deltaTime;
                if (this.gameTime <= this.timeLimit) this.gameOver = true;
                this.timeToNextCustomer -= deltaTime;

                if(this.customers.length < 3 && this.timeToNextCustomer <= 0){
                    this.NewCustomer();
                    this.timeToNextCustomer = this.timeBetweenCustomers;
                } 
                this.customers.forEach(customer => {
                    customer.update();

                    if(customer === this.customers[0]) customer.positionX = 900;
                    else if(customer === this.customers[1]) customer.positionX = 550;
                    else if(customer === this.customers[2]) customer.positionX = 200;

                    if(customer === this.customers[0] && customer.x === 900) this.food = new Food(this);
                    
                    if (customer.remove){
                        this.customers.splice(this.customers.indexOf(customer), 1);
                    } 
                });
                this.plate.update();
                if(this.base != null) this.base.update();
                if(this.burger != null) this.burger.update();
                if(this.veggies != null) this.veggies.update();
                if(this.sauce != null) this.sauce.update();
                if(this.leaf != null) this.leaf.update();
                if(this.cheese != null) this.cheese.update();
                if(this.cover != null) this.cover.update();

                if(this.instructions != null) this.shopname.style.display = 'none';
                else this.shopname.style.display = 'block';

                if(this.gameOver){
                    this.show = false;
                    this.shopname.style.display = 'none';
                    document.getElementById("instruction_button").classList.add("hidden");
                    document.getElementById("base_bun_button").classList.add("hidden");
                    document.getElementById("base_bread_button").classList.add("hidden");
                    document.getElementById("burger_chocolate_button").classList.add("hidden");
                    document.getElementById("burger_grilled_button").classList.add("hidden");
                    document.getElementById("burger_fried_button").classList.add("hidden");
                    document.getElementById("burger_squarefried_button").classList.add("hidden");
                    document.getElementById("veggies_onion_button").classList.add("hidden");
                    document.getElementById("veggies_cucumber_button").classList.add("hidden");
                    document.getElementById("veggies_tomato_button").classList.add("hidden");
                    document.getElementById("veggies_pickles_button").classList.add("hidden");
                    document.getElementById("sauce_green_button").classList.add("hidden");
                    document.getElementById("sauce_peach_button").classList.add("hidden");
                    document.getElementById("sauce_red_button").classList.add("hidden");
                    document.getElementById("sauce_yellow_button").classList.add("hidden");
                    document.getElementById("leaf_leaf1_button").classList.add("hidden");
                    document.getElementById("leaf_leaf2_button").classList.add("hidden");
                    document.getElementById("cheese_egg_button").classList.add("hidden");
                    document.getElementById("cheese_cheese_button").classList.add("hidden");
                    document.getElementById("cheese_holecheese_button").classList.add("hidden");
                    document.getElementById("cover_bun_button").classList.add("hidden");
                    document.getElementById("cover_bread_button").classList.add("hidden");
                    this.screen = new Screen(this);
                } 
            }
            draw(context){
                this.customers.forEach(customer => {
                    
                    customer.draw(context);
                });
                this.background.draw(context);
                if(this.food != null) this.food.draw(context);
                this.plate.draw(context);
                if(this.base != null) this.base.draw(context);
                if(this.burger != null) this.burger.draw(context);
                if(this.veggies != null) this.veggies.draw(context);
                if(this.sauce != null) this.sauce.draw(context);
                if(this.leaf != null) this.leaf.draw(context);
                if(this.cheese != null) this.cheese.draw(context);
                if(this.cover != null) this.cover.draw(context);
                if(this.screen != null) this.screen.draw(context);
                if(this.instructions != null) this.instructions.draw(context);
                this.ui.draw(context);
            }
            NewPlate(){
                this.plate = new Plate(this);
            }
            NewCustomer(){
                this.customers.push(new Customer(this, -150, 200));
            }
            checkFood(index){
                if(this.base === null || this.burger === null || this.veggies === null || this.sauce === null || this.leaf === null || this.cheese === null || this.cover === null){
                    if (!this.gameOver) this.score -= this.orderscore;
                    this.audiounscore.play();
                    if (this.score <= -1){
                        this.audiolose.play();
                        this.gameOver = true;
                    } 
                }
                else if(this.orders[index].Base === this.base.image && this.orders[index].Cover === this.cover.image && this.orders[index].Burger === this.burger.image && this.orders[index].Veggies === this.veggies.image && this.orders[index].Sauce === this.sauce.image && this.orders[index].Leaf === this.leaf.image && this.orders[index].Cheese === this.cheese.image){
                    if (!this.gameOver) this.score += this.orderscore;
                    this.audioscore.play();
                    if (this.score >= this.winningscore){
                        this.audiowin.play();
                        this.gameOver = true;
                    } 
                } 
                else{
                    if (!this.gameOver) this.score -= this.orderscore;
                    this.audiounscore.play();
                    if (this.score <= -1){
                        this.audiolose.play();
                        this.gameOver = true;
                    } 
                }
            }
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;
    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);

});

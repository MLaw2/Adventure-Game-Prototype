class Tutorial extends AdventureScene {
    constructor(){
        super("tutorial", "Entrance to the Candy Kingdom");
    }

    onEnter(){
        let candy = this.makeItem("🍬", 0.5, 0.7, 2);
        candy.on("pointerover", () =>{
            this.showMessage("A piece of candy");
        })
        candy.on('pointerdown', () =>{
            this.showMessage("You picked up the piece of candy.");
            this.addPickupTween(candy);
            this.gainItem("candy");
        })

        let door = this.makeItem("🚪", 0.5, 0.4, 20);
        door.on('pointerover', () =>{
            if(this.hasItem("candy")){
                this.showMessage("The way is open.");
            }
            else{
                this.showMessage("A door. You can smell greatness on the other side.");
            }
        })
        door.on('pointerdown', () =>{
            if(this.hasItem("candy")){
                this.showMessage("");
                this.loseItem("candy");
                this.gotoScene("entrance");
            }
            else{
                this.showMessage("An offering is required.");
                this.addShake(door, 0.5, 2, 100);
            }
        })
    }
}

class Entrance extends AdventureScene {
    constructor(){
        super("entrance", "Welcome to Candy Kingdom!");
    }
    onEnter(){
        this.cameras.main.setBackgroundColor(0xff4dcf);
        let secretEntrance = this.makeItem("🕳", 0.2, 0.3, 5);
        secretEntrance.on("pointerover", ()=>{
            this.showMessage("A secret entrance to the castle. You can smell the sour from here.");
        });
        secretEntrance.on("pointerdown", ()=>{
            this.gotoScene("troll");
        });
        let bridge = this.makeItem("🌉", 0.7, 0.4, 5);
        bridge.on("pointerover", ()=>{
            this.showMessage("A bridge to the castle. You hear music.");
        });
        bridge.on("pointerdown", ()=>{
            this.gotoScene("toll");
        });
    }
}
class Troll extends AdventureScene {
    constructor(){
        super("troll", "A Troll blocks the way!");
    }
    preload(){
        this.load.image("sourtroll", "./assets/troll.png");
    }
    onEnter(){
        this.cameras.main.setBackgroundColor(0xD0FE1D);
        // back button
        let backButton = this.makeItem("⬇", 0.5, 0.9, 3);
        backButton.on("pointerover",()=>{
            this.showMessage("Click to go back.");
        })
        backButton.on("pointerdown",()=>{
            this.gotoScene("entrance");
        })
        // passageway
        this.makeItem("🚪", 0.5, 0.5, 10)
            .on("pointerover",()=>{
                this.showMessage("The castle path is open.");
            })
            .on("pointerdown",()=>{
                this.showMessage("The passageway opens.");
                this.gotoScene("castle");
            });
        // troll initialize
        let troll = this.add.image(this.w * 0.75 * 0.5, this.h * 0.5, "sourtroll")
            .setInteractive();
        // cup
        let cup = this.makeItem("🥤", 0.7, 0.8, 5);
        cup.on("pointerover",()=>{
            this.showMessage("An empty cup.");
        })
        cup.on("pointerdown",()=>{
            this.showMessage("You picked up the cup.");
            this.addPickupTween(cup);
            this.gainItem("cup");
        })
        // river
        let river = this.makeItem("🌊", 0.2, 0.8, 10);
        river.on("pointerover",()=>{
            this.showMessage("A nearby river. It smells of sour.");
        });
        river.on("pointerdown", ()=> {
            if(this.hasItem("cup")){
                this.showMessage("You filled the cup with the sour river.");
                this.loseItem("cup");
                this.gainItem("sour drink");
            }
        });

        // troll interactions
        let satiated = false;
        troll.on("pointerover", ()=>{
            if(satiated == true){
                this.showMessage("A happy troll.");
            }
            else{
                this.showMessage("Need...food...");
            }
        });
        troll.on("pointerdown", ()=>{
            if(satiated){
                this.showMessage("Thank you.");
            }
            else if(this.hasItem("sour drink")){
                this.showMessage("MMMMMMMM, I needed that. Thank you kind stranger, you may proceed.");
                this.loseItem("sour drink");
                satiated = true;
                this.tweens.add({
                    targets: troll,
                    x: (this.w * 0.75) * 0.8,
                    duration: 1000,
                })
            }
            else{
                this.showMessage("Not...Sour...Enough...");
            }
        });
    }
}
class Toll extends AdventureScene {
    constructor(){
        super("toll", "A Candy Salesman blocks the way!");
    }
    onEnter(){
        this.cameras.main.setBackgroundColor(0xffbcd9);
        // back button
        let backButton = this.makeItem("⬇", 0.5, 0.9, 3);
        backButton.on("pointerover",()=>{
            this.showMessage("Click to go back.");
        })
        backButton.on("pointerdown",()=>{
            this.gotoScene("entrance");
        })
        // candy salesman
        let salesman = this.makeItem("🤹‍♂️", 0.5, 0.4, 10);
        salesman.on("pointerover",()=>{
            this.showMessage("Hello, would you like to enter the castle? I'll let you in, but you must answer a riddle first: If all of my candies had to go somewhere, which one would be the last to arrive?");
        });
        salesman.on("pointerdown",()=>{
            if(this.hasItem("chocolate bar")){
                this.showMessage("Chocolate! Because it's always choco-late! Get it? You can go inside now. Feel free to take some candy with you.")
                this.loseItem("chocolate bar");
                this.makeItem("🚪", 0.3, 0.2, 4)
                .on("pointerover",()=>{
                    this.showMessage("The entrance to the castle.");
                })
                .on("pointerdown",()=>{
                    this.gotoScene("castle");
                });
            }
        });
        // candy cart
        let cartX = 0.2;
        let cartY = 0.6;
        let cartItemSize = 2
        let icecream = this.makeItem("🍦", cartX, cartY, cartItemSize);
        icecream.on("pointerover",()=>{
            this.showMessage("Ice Cream");
        });
        icecream.on("pointerdown",()=>{
            this.gainItem("ice cream");
        });
        let honey = this.makeItem("🍯", cartX + 0.1, cartY, cartItemSize);
        honey.on("pointerover",()=>{
            this.showMessage("Honey");
        });
        honey.on("pointerdown",()=>{
            this.gainItem("honey");
        });
        let lollipop = this.makeItem("🍭", cartX + 0.2, cartY, cartItemSize);
        lollipop.on("pointerover",()=>{
            this.showMessage("A Lollipop");
        });
        lollipop.on("pointerdown",()=>{
            this.gainItem("lollipop");
        });
        let chocolatebar = this.makeItem("🍫", cartX + 0.3, cartY, cartItemSize);
        chocolatebar.on("pointerover",()=>{
            this.showMessage("A Chocolate Bar");
        });
        chocolatebar.on("pointerdown",()=>{
            this.gainItem("chocolate bar");
        });
        let dango = this.makeItem("🍡", cartX + 0.4, cartY, cartItemSize);
        dango.on("pointerover",()=>{
            this.showMessage("Dango");
        });
        dango.on("pointerdown",()=>{
            this.gainItem("dango");
        });
        let donut = this.makeItem("🍩", cartX + 0.5, cartY, cartItemSize);
        donut.on("pointerover",()=>{
            this.showMessage("A Donut");
        });
        donut.on("pointerdown",()=>{
            this.gainItem("donut");
        });
    }
}
class Castle extends AdventureScene {
    constructor(){
        super("castle", "Mysterious sweets line the wall...");
    }
    onEnter(){
        this.cameras.main.setBackgroundColor(0x7F00FF);
        // big door
        let finalDoor = this.makeItem("🚪", 0.5, 0.5, 20);
        finalDoor.on("pointerover",()=>{
            if(this.hasItem("spiral key") && this.hasItem("lightning key")){
                this.showMessage("The door can be opened.");
            }
            else if(this.hasItem("spiral key") || this.hasItem("lightning key")){
                this.showMessage("You are missing a key.");
            }
            else{
                this.showMessage("The door has two keyholes. You can smell pure sweetness on the other side.");
            }
        })
        finalDoor.on("pointerdown",()=>{
            if(this.hasItem("spiral key") && this.hasItem("lightning key")){
                this.gotoScene("innersanctum");
            }
            else{
                this.addShake(door, 0.5, 2, 100);
            }
        })
        // witch door
        let witchDoor = this.makeItem("🚪", 0.25, 0.7, 7);
        witchDoor.on("pointerover",()=>{
            this.showMessage("A door. You can smell something brewing on the other side.");
        });
        witchDoor.on("pointerdown",()=>{
            this.gotoScene("witch");
        })
        // mage door
        let mageDoor = this.makeItem("🚪", 0.75, 0.7, 7);
        mageDoor.on("pointerover",()=>{
            this.showMessage("A door. You hear sweet magic happening on the other side.");
        })
        mageDoor.on("pointerdown",()=>{
            this.gotoScene("mage");
        })
        // back button
        let backButton = this.makeItem("⬇", 0.5, 0.9, 3);
        backButton.on("pointerover",()=>{
            this.showMessage("Click to go back.");
        })
        backButton.on("pointerdown",()=>{
            this.gotoScene("entrance");
        })
    }
}

// missing no item cauldron message. for polish.
class Witch extends AdventureScene {
    constructor(){
        super("witch", "The air is sweet with creation...");
    }
    preload(){
        this.load.image("cauldron", "./assets/cauldron.png");
    }
    onEnter(){
        this.cameras.main.setBackgroundColor(0x301934);
        // key to use as an item and as a conditional
        // this.makeItem("spiral key", 0, -0.5, 1);

        // witch
        let witch = this.makeItem("️🧙‍♀️", 0.5, 0.4, 10);
        witch.on("pointerover",()=>{
            if(this.hasItem("spiral key")){
                this.showMessage("Thank you for your help.");
            }
            else{
                this.showMessage("You there. You must be looking for the secrets of this castle. But I am missing something for my fondue. I need something exotic!");
            }
        })
        let witch_quest_complete = false;
        // cauldron
        let cauldron = this.add.image(this.w * 0.75 * 0.75, this.h * 0.7, "cauldron")
            .setInteractive()
            .setScale(0.1);
        cauldron.on("pointerover",()=>{
            this.showMessage("You smell a mysterious concoction. Is this really a fondue? At least it smells nice...");
        })
        cauldron.on("pointerdown",()=>{
            if(this.hasItem("spiral key")){
                this.showMessage("You taste the fondue. Words cannot describe the assault on your taste buds. In a good way.");
            }
            else if(this.hasItem("dango")){
                this.loseItem("dango");
                witch_quest_complete = true;
                this.tweens.add({
                    targets: cauldron,
                    angle: '+=360',
                    duration: 500,
                })
                this.showMessage("Ah, this will be perfect! Here is a key for your troubles.");
                this.gainItem("spiral key");
            }
            else{
                // needs a special message for when you have nothing. otherwise it's a bit weird, but ok for now
                this.showMessage("That won't work! This fondue needs to be special!");
                this.addShake(cauldron, 0.5, 2, 100);
            }
        })
        // back button
        let backButton = this.makeItem("⬇", 0.5, 0.9, 3);
        backButton.on("pointerover",()=>{
            this.showMessage("Click to go back.");
        })
        backButton.on("pointerdown",()=>{
            this.gotoScene("castle");
        })
    }
}
class Mage extends AdventureScene {
    constructor(){
        super("mage", "The air crackles with pure sugar...");
    }
    onEnter(){
        this.cameras.main.setBackgroundColor(0x072A6C);
        // mage
        let mage = this.makeItem("🧙‍♂️", 0.5, 0.4, 10);
        mage.on("pointerover",()=>{
            this.showMessage("A mage. He is engrossed in a spell.");
        });
        mage.on("pointerdown",()=>{
            if(this.hasItem("lightning key")){
                this.showMessage("Thank you for the help.");
            }
            else{
                this.showMessage("I am making the sweetest spell. However, the spell is too sweet, and I need something strong to keep it stable. Help me, and I will make it worth your while.");
            }
        });
        // spell
        let spell = this.makeItem("🔮", 0.5, 0.6, 7);
        spell.on("pointerover",()=>{
            this.showMessage("A sweet spell.");
        });
        spell.on("pointerdown",()=>{
            if(this.hasItem("chocolate bar")){
                //success
                this.loseItem("chocolate bar");
                this.showMessage("It worked! The spell is stable! Here is your reward.");
                this.gainItem("lightning key");
            }
            else if(!this.hasItem("lightning key")){
                this.showMessage("It's unstable still. Try adding something else.");
                this.addShake(spell, 0.5, 2, 100);
            }
        });

        // back button
        let backButton = this.makeItem("⬇", 0.5, 0.9, 3);
        backButton.on("pointerover",()=>{
            this.showMessage("Click to go back.");
        })
        backButton.on("pointerdown",()=>{
            this.gotoScene("castle");
        })
    }
}
class InnerSanctum extends AdventureScene {
    constructor(){
        super("innersanctum", "Sickly sweetness blocks your path!");
    }
    // Code from Phaser Examples: Look up link and you'll find it
    openCandyBox(){
        const url = `https://candybox2.github.io/`;
        const s = window.open(url, '_blank');
        if (s && s.focus){
            s.focus();
        }
        else if (!s){
            window.location.href = url;
        }
    }
    onEnter(){
        this.gainItem("honey");
        let candybox = this.makeItem("📦", 0.5, 0.5, 10);
        candybox.on("pointerover",()=>{
            this.showMessage("The mythical candy box. You cannot possibly imagine what is inside.");
        });
        candybox.on("pointerdown",()=>{
            this.openCandyBox();
            this.gotoScene("outro");
        });
        let sweetdemon = this.makeItem("🍮", 0.5, 0.5, 40);
        sweetdemon.on("pointerover",()=>{
            this.showMessage("This amorphous blob of concentrated sweetness keeps throwing sweets at you, expecting you to go away. There must be a way to distract it away from the box.");
        });
        sweetdemon.on("pointerdown",()=>{
            if(this.hasItem("honey")){
                this.loseItem("honey");
                this.showMessage("What is that? I must have it for myself!");
                this.tweens.add({
                    targets: sweetdemon,
                    x: 3000,
                    duration: 1000,
                });
            }
            else{
                this.showMessage("You think you can tempt me? No single candy is too sweet for me!");
            }
        });
    }
}
class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(this.game.config.width/2,this.game.config.height/2, "A world of candy awaits!").setFontSize(50).setOrigin(0.5, 0.5);
        this.add.text(this.game.config.width/2,this.game.config.height/2 + 50, "Click anywhere to start dreaming...").setFontSize(20).setOrigin(0.5, 0.5);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('tutorial'));
            // this.time.delayedCall(1000, () => this.scene.start('innersanctum'));
        });
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "the end is never the end is never the end is never the end").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Intro, Tutorial, Entrance, Troll, Toll, Castle, Witch, Mage, InnerSanctum, Outro],
    title: "Sweet Dreams",
});


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
                console.log("yep balls");
            }
            else{
                this.showMessage("A door. You can smell greatness on the other side.");
                console.log("nope not balls");
            }
        })
        door.on('pointerdown', () =>{
            this.showMessage("An offering is required.");
            this.addShake(door, 0.5, 2, 100);
        })
        // let testing = this.makeItem("testing L", "what the dog doin", 0.5, 0.5);
        // testing.on('pointerdown', () => {
        //     this.showMessage("THE IMPOSTOR IS SUS 😊🖇");
        //     this.tweens.add({
        //         targets: testing,
        //         x: '+=' + this.s * 0.5,
        //         repeat: 100,
        //         yoyo: true,
        //         ease: "Sine.inOut",
        //         duration: 10
        //     })
        // })
    }
}

class Entrance extends AdventureScene {
    constructor(){
        super("entrance", "Welcome to Candy Kingdom!");
    }
    onEnter(){

    }
}
class Troll extends AdventureScene {
    constructor(){
        super("troll", "A Troll blocks the way!");
    }
    onEnter(){}
}
class Toll extends AdventureScene {
    constructor(){
        super("toll", "A Candy Salesman blocks the way!");
    }
    onEnter(){}
}
class Castle extends AdventureScene {
    constructor(){
        super("castle", "Mysterious sweets line the wall...");
    }
    onEnter(){}
}
class Witch extends AdventureScene {
    constructor(){
        super("witch", "The air is sweet with creation");
    }
    onEnter(){}
}
class Mage extends AdventureScene {
    constructor(){
        super("mage", "The air crackles with pure sugar");
    }
    onEnter(){}
}
class InnerSanctum extends AdventureScene {
    constructor(){
        super("innersanctum", "Sickly sweetness blocks your path!");
    }
    onEnter(){}
}
class TheEnd extends AdventureScene {
    constructor(){
        super("theend", "the end is never the end is never the end isn ever the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end");
    }
    onEnter(){}
}
class Demo1 extends AdventureScene {
    constructor() {
        super("demo1", "First Room");
    }

    onEnter() {

        let clip = this.add.text(this.w * 0.3, this.w * 0.3, "📎 paperclip")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("Metal, bent."))
            .on('pointerdown', () => {
                this.showMessage("No touching!");
                this.tweens.add({
                    targets: clip,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });

        let key = this.add.text(this.w * 0.5, this.w * 0.1, "🔑 key")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a nice key.")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up the key.");
                this.gainItem('key');
                this.tweens.add({
                    targets: key,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => key.destroy()
                });
            })

        let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪 locked door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("key")) {
                    this.showMessage("You've got the key for this door.");
                } else {
                    this.showMessage("It's locked. Can you find a key?");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("key")) {
                    this.loseItem("key");
                    this.showMessage("*squeak*");
                    door.setText("🚪 unlocked door");
                    this.gotoScene('demo2');
                }
            })

    }
}

class Demo2 extends AdventureScene {
    constructor() {
        super("demo2", "The second room has a long name (it truly does).");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You've got no other choice, really.");
            })
            .on('pointerdown', () => {
                this.gotoScene('demo1');
            });

        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('*giggles*');
                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));
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
            // this.time.delayedCall(1000, () => this.scene.start('demo1'));
        });
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
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
    // scene: [Intro, Demo1, Demo2, Outro],
    scene: [Intro, Tutorial, Entrance, Troll, Toll, Castle, Witch, Mage, InnerSanctum, TheEnd],
    title: "Sweet Dreams",
});


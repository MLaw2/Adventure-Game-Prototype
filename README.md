A simple adventure game by Michael Law based on a simple adventure game engine by [Adam Smith](https://github.com/rndmcnlly).

Code requirements:
- **4+ scenes based on `AdventureScene`**: Tutorial, Intro, Outro, Witch, Mage.
- **2+ scenes *not* based on `AdventureScene`**: Entrance, Troll, Toll, Castle, InnerSanctum.
- **2+ methods or other enhancement added to the adventure game engine to simplify my scenes**:
    - Enhancement 1: makeItem - Aids me in creating simple text items that can be interacted with.
    - Enhancement 2: addPickupTween - Aids me in adding a pickup animation for items.

Experience requirements:
- **4+ locations in the game world**: Entrance, Troll, Toll, Castle, Witch, Mage, InnerSanctum
- **2+ interactive objects in most scenes**: Candy Salesman, Mage
- **Many objects have `pointerover` messages**: Candy from the Salesman, Troll's messages
- **Many objects have `pointerdown` effects**: Empty cup, Witch's cauldron
- **Some objects are themselves animated**: Sweet Demon, Troll

Asset sources:
- [Troll Image](https://favpng.com/png_view/free-kraken-cliparts-octopus-free-content-goblin-clip-art-png/cdsR9H0B)  
Downloaded Troll image.  
Cropped image with paint.net  
- [Cauldron Image](https://www.vecteezy.com/vector-art/1838079-witch-cauldron-set)
Downloaded Cauldron image.  
Cropped and made background transparent with paint.net  

Code sources:
- `adventure.js` and `index.html` were created for this project [Adam Smith](https://github.com/rndmcnlly) and edited by me.
- `game.js` was sketched by [Adam Smith](https://github.com/rndmcnlly) and rewritten by me.
- `openCandyBox()` in scene `InnerSanctum` in `game.js` modified from this [Phaser Example](https://labs.phaser.io/edit.html?src=src/input/pointer/external%20link.js).
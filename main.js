import Juego from "./src/scenes/Juego.js";
import Precarga from "./src/scenes/Precarga.js";
import Fin from "./src/scenes/Fin.js";
import nivel2 from "./src/scenes/nivel2.js";
import nivel3 from "./src/scenes/nivel3.js";
import Win from "./src/scenes/Win.js";
import gameOver from "./src/scenes/gameOver.js";

// Create a new Phaser config object
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600,
    },
    max: {
      width: 1600,
      height: 1200,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 750 },
      debug: true,
    },
  },
  
  // List of scenes to load
  // Only the first scene will be shown
  // Remember to import the scene before adding it to the list
  scene: [Precarga, Juego,nivel2, nivel3, Fin, gameOver, Win],
};

// Create a new Phaser game instance
window.game = new Phaser.Game(config);

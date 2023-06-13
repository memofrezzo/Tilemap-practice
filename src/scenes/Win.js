export default class Win extends Phaser.Scene {
    constructor() {
      // key of the scene
      // the key will be used to start the scene by other scenes
      super("Win");
    }
  
    init(data) {
      // this is called before the scene is created
      // init variables
      // take data passed from other scenes
      // data object param {}
      console.log(data);
      this.cantidadEstrellas = data.cantidadEstrellas;
    }
  
    create() {
      this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        const screenWidth = this.cameras.main.width;
        const screenHeight = this.cameras.main.height;
      this.imagenVictoria = this.add.image(screenWidth / 2,
      screenHeight / 2,"victoria")
    }
    update() {
      if ( this.keyR.isDown) {
        this.scene.start("juego");
   }
    }
  }
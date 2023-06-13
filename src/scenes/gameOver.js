export default class gameOver extends Phaser.Scene {
    constructor() {
      // key of the scene
      // the key will be used to start the scene by other scenes
      super("gameOver");
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
      
        this.cantidadEstrellasTexto = this.add.text(
          screenWidth / 2,
          screenHeight / 2,
          "Estrellas recolectadas: " + this.cantidadEstrellas,
          { fontSize: "20px", fill: "#FFFFFF" }
        ).setOrigin(0.5);
      
        const cartelTexto = "¡Juego terminado!";
        const cartel = this.add.text(
          screenWidth / 2,
          screenHeight / 2 + this.cantidadEstrellasTexto.height,
          cartelTexto,
          { fontSize: "30px", fill: "#FFFFFF" } ) .setOrigin(0.5);
    }
    update() {
      if ( this.keyR.isDown) {
        this.scene.start("juego");
   }
  }
  }
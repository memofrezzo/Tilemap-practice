// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Fin extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("fin");
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
    this.cantidadEstrellasTexto = this.add.text(400,300,
      "Estrellas recolectadas: " + this.cantidadEstrellas,
      { fontSize: "20px", fill: "#FFFFFF" }
    );
  }
}

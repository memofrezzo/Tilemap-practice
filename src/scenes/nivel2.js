export default class nivel2 extends Phaser.Scene {
    constructor() {
      // key of the scene
      // the key will be used to start the scene by other scenes
      super("nivel2");
    }
  
    init() {
      // this is called before the scene is created
      // init variables
      // take data passed from other scenes
      // data object param {}
  
      this.cantidadEstrellas = 0;
      console.log("Prueba !");
    }
  
    create() {
      // todo / para hacer: texto de puntaje
      const map = this.make.tilemap({ key: "map2" });
  
      // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
      // Phaser's cache (i.e. the name you used in preload)
      const capaFondo = map.addTilesetImage("sky", "tilesFondo");
      const capaPlataform = map.addTilesetImage("platform_atlas", "tilesPlataforma");
  
      // Parameters: layer name (or index) from Tiled, tileset, x, y
      const fondoLayer = map.createLayer("background", capaFondo, 0, 0);
      const plataformaLayer = map.createLayer(
        "platform",
        capaPlataform,
        0,
        0
      );
      const objectosLayer = map.getObjectLayer("objects");
  
      plataformaLayer.setCollisionByProperty({ collision: true });
  
      console.log("spawn point player", objectosLayer);
  
      // crear el jugador
      // Find in the Object Layer, the name "dude" and get position
      let spawnPoint = map.findObject("objects", (obj) => obj.name === "player");
      console.log(spawnPoint);
      // The player and its settings
      this.jugador = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "dude");
  
      //  Player physics properties. Give the little guy a slight bounce.
      this.jugador.setBounce(0.1);
      this.jugador.setCollideWorldBounds(true);
  
      spawnPoint = map.findObject("objects", (obj) => obj.name === "salida");
      console.log("spawn point salida ", spawnPoint);
      if (spawnPoint){
        this.salida = this.physics.add
        .sprite(spawnPoint.x, spawnPoint.y, "salida") 
        .setScale(0.2);
      }
      
  
      //  Input Events
      this.cursors = this.input.keyboard.createCursorKeys();
  
      // Create empty group of starts
      this.estrellas = this.physics.add.group();
      this.bombs = this.physics.add.group({
        immovable:true,
        allowGravity:false
      });
      // find object layer
      // if type is "stars", add to stars group
      objectosLayer.objects.forEach((objData) => {
        //console.log(objData.name, objData.type, objData.x, objData.y);
  
        const { x = 0, y = 0, name } = objData;
        switch (name) {
          case "star": {
            // add star to scene
            // console.log("estrella agregada: ", x, y);
            const star = this.estrellas.create(x, y, "star");
            break;
          }
          case "bomb": {
            const bomb= this.bombs.create(x,y, "bomb").setBounce(1,1);
            bomb.setScale(0.025);
            break;
          }
          case "bombx": {
            const bombx= this.bombs.create(x,y, "bombx").setBounce(1,0);
            bombx.setScale(0.025);
            break;
          }
          case "bomby": {
            const bomby= this.bombs.create(x,y, "bomby").setBounce(0,1);
            bomby.setScale(0.025);
            break;
          }
        }
       
  
      
      
      
      });
      this.salida.visible = false;
       this.physics.add.collider(this.bombs, plataformaLayer)
       this.physics.add.collider(
        this.bombs,
        this.jugador,
        this.bombakill,
        null,
        this
        );
  
       this.physics.add.collider(this.jugador, plataformaLayer);
      this.physics.add.collider(this.estrellas, plataformaLayer);
      this.physics.add.collider(
        this.jugador,
        this.estrellas,
        this.recolectarEstrella,
        null,
        this
      );
      if(this.salida){
        this.physics.add.collider(this.salida, plataformaLayer);
      this.physics.add.overlap(
        this.jugador,
        this.salida,
        this.esVencedor,
        () => this.cantidadEstrellas >= 4, // condicion de ejecucion
        this
      );
      }
      
  
      /// mostrar cantidadEstrella en pantalla
      this.cantidadEstrellasTexto = this.add.text(
        15,
        15,
        "Estrellas recolectadas: 0",
        { fontSize: "15px", fill: "#FFFFFF" }
      );
  
      this.timer = 60;
      this.timeText = this.add.text(750 , 20, this.timer, {
        fontSize: "35px",
        fontStyle: "bold",
        fill: "#FFFFFF",
      }); 
      this.time.addEvent({
        delay: 1000,
        callback: this.onSecond,
        callbackScope: this,
        loop: true
      })
      //velocidad bomb
      this.bombs.setVelocity(150,150);
  
      this.cameras.main.startFollow(this.jugador)
      this.physics.world.setBounds(0,0, map.widthInPixels, map.heightInPixels);
      this.cameras.main.setBounds(0,0, map.widthInPixels, map.heightInPixels);
  
      this.cantidadEstrellasTexto.setScrollFactor(0);
      this.timeText.setScrollFactor(0);
    }
  
    update() {
      // update game objects
      // check input
      //move left
      if (this.cursors.left.isDown) {
        this.jugador.setVelocityX(-160);
        this.jugador.anims.play("left", true);
      }
      //move right
      else if (this.cursors.right.isDown) {
        this.jugador.setVelocityX(160);
        this.jugador.anims.play("right", true);
      }
      //stop
      else {
        this.jugador.setVelocityX(0);
        this.jugador.anims.play("turn");
      }
    
      //jump
      if (this.cursors.up.isDown && this.jugador.body.blocked.down) {
        this.jugador.setVelocityY(-500);
      }
    
      // Check bomb position and update
      this.bombs.getChildren().forEach((bomb) => {
       if (bomb.texture.key === 'bomb') {
          // Lógica de movimiento para las bombas normales
          //  if (bomb.x < 0 || bomb.x > this.game.config.width) {
        //      bomb.setVelocityX(-bomb.body.velocity.x);
      //      }
            if (bomb.y < 0 || bomb.y > this.game.config.height) {
              bomb.setVelocityY(-bomb.body.velocity.y);
            }
        } else if (bomb.texture.key === 'bombx') {
            // Lógica de movimiento para las bombx (solo eje X)
            if (bomb.x < 0 || bomb.x > this.game.config.width) {
              bomb.setVelocityX(-bomb.body.velocity.x);
           }
          } else if (bomb.texture.key === 'bomby') {
       //    Lógica de movimiento para las bomby (solo eje Y)
            if (bomb.y < 0 || bomb.y > this.game.config.height) {
              bomb.setVelocityY(-bomb.body.velocity.y);
            }
          }
      });
    }
  
    recolectarEstrella(jugador, estrella) {
      estrella.disableBody(true, true);
  
      // todo / para hacer: sumar puntaje
      //this.cantidadEstrellas = this.cantidadEstrellas + 1;
      if(this.estrellas.getTotalUsed()=== 0){
        this.salida.visible=true;
      };
      
      this.cantidadEstrellas++;
  
      this.cantidadEstrellasTexto.setText(
        "Estrellas recolectadas: " + this.cantidadEstrellas
      );
    }
    bombakill(jugador, bombs){
      this.scene.restart();
    }
    
    esVencedor(jugador, salida) {
      // if (this.cantidadEstrellas >= 5)
      // sacamos la condicion porque esta puesta como 4to parametro en el overlap
  
      console.log("estrellas recolectadas", this.cantidadEstrellas);
  
      this.scene.start("nivel3", {
        cantidadEstrellas: this.cantidadEstrellas,
        y: "este es un dato de muestra",
        z: "este es otro atributo enviado a otro escena",
      });
      //this.scene.start("nivel2",{
        //cantidadEstrellas:this.cantidadEstrellas
      //});
    }
    
  
    onSecond (){
      this.timer--;
      this.timeText.setText(this.timer);
      if ( this.timer <=0){
        this.scene.start("gameOver", { cantidadEstrellas: this.cantidadEstrellas })
      }
    }
  }
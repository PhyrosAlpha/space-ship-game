import { ControlBuilder } from "./src/Control.js";
import Player from "./src/Objects/Player.js";
import Enemy from "./src/Objects/Enemy.js";
import Scenario from "./src/Scenario.js";
import { DeltaTime, FrameIntervals, FrameTimeout, IDGenerator, randomIntNumber } from "./src/Tools.js";
import Rect from "./src/Rect.js";
import Coord from "./src/Coord.js";
import Collider from "./src/Collider.js";
import GameObject from "./src/Objects/GameObject.js";


class Game {

    enemiesGeneratorId = new IDGenerator("enemy");
    control = {};
    lastTimeStamp = 0;
    width = 800;
    height = 800;

    constructor() {
        let contentGameElement = document.querySelector("#game-content");
        let canvasElement = `<canvas width="${this.width}" height="${this.height}" id="game"></canvas>`
        contentGameElement.innerHTML = canvasElement;
        this.canvas = document.querySelector("#game");
        this.context = this.canvas.getContext("2d");

        //this.scenario = new Scenario(this.canvas);
        this.scenario = new Scenario(this.context);
        this.gameLoop = this.gameLoop.bind(this);
        this.spawnObject = this.spawnObject.bind(this);

    }

    start() {
        //load asssets
        this.loadGameAssets();

        this.player = new Player("player", new Rect(80, 80), new Coord(this.canvas.width / 2 - 40 , this.canvas.height - 80), this.scenario);
        this.player.setClass("player");
        this.scenario.addObject(this.player);
        this.control = ControlBuilder.buildPlayerControl(this.player);
        this.player.setControl(this.control);
        this.respawnId = FrameIntervals.addInterval(() => {
           this.spawnObject()}, 20000
        )
       buildSpaceShipsTroopps(new Coord(100, -500), 5, 5, this.scenario, this.enemiesGeneratorId);

       /*
        let leftWallObject = new GameObject("left-wall", new Rect(20, this.canvas.height), new Coord(0, 0), this.scenario);
        leftWallObject.setColor("green");
    
        let leftWallCollider = new Collider(leftWallObject, this.scenario);
        leftWallCollider.addSubscriber("player");
        leftWallCollider.setWhenThereIsCollision((object) => {
            object.setCoord(new Coord(leftWallObject.getX() + 17 ,object.getY()));
        })
        */
        FrameTimeout.add(() => {console.log("Executando timeout de teste")}, 10000);

        //leftWallObject.setCollider(leftWallCollider);
        //this.scenario.addObject(leftWallObject);
        requestAnimationFrame(this.gameLoop);

    }

    gameLoop(timestamp) {
        DeltaTime.setLastTimeStamp(timestamp);
        //console.log(DeltaTime.getDeltaSeconds());
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        FrameTimeout.startListenTimeouts();
        FrameIntervals.startListenIntervals(timestamp);
        this.control.listenControls();
        this.scenario.update();
    
        let result = this.scenario.getObjectById("player");
        if(result === undefined) {
            let enemies = this.scenario.getObjectsByClass("point");
            enemies.forEach((enemy) => {
                enemy.destroy();
            })
            FrameIntervals.removeInterval(this.respawnId);
        }


        requestAnimationFrame(this.gameLoop);
    }

    spawnObject() {
        /*const enemy = new Enemy(
            `point-${this.enemiesGeneratorId.generateId()}`, 
            new Rect(60, 40) ,
            new Coord(randomIntNumber(1, this.canvas.width), randomIntNumber(-25, -50)), 
            this.scenario);

        enemy.setClass("point")
        enemy.setColor("purple");
        this.scenario.addObject(enemy);*/
/*
        for(let x = 0; x <= 10; x++) {
            const enemy = new Enemy(
                `point-${this.enemiesGeneratorId.generateId()}`, 
                new Rect(60, 40) ,
                new Coord((x * 50) + 100, -20), 
                this.scenario);

            enemy.setClass("point")
            this.scenario.addObject(enemy);
        }
            */
        
        buildSpaceShipsTroopps(new Coord(100, -500), 10, 10, this.scenario, this.enemiesGeneratorId);

    }

    loadGameAssets() {
        Player.loadAssets();
        Enemy.loadAssets();
    }
}

function buildSpaceShipsTroopps(coord, wShips, hShips, scenario, generatorId) {

    for(let y = 0; y < hShips; y++) {
        for(let x = 0; x < wShips; x++) {
            const enemy = new Enemy(
                `enemy-${generatorId.generateId()}`, 
                new Rect(60, 40) ,
                new Coord((x * 60) + coord.getX(), (y * 50) + coord.getY()), 
                scenario);

            enemy.setClass("point")
            scenario.addObject(enemy);
        }
    }
}

const game = new Game();
game.start();
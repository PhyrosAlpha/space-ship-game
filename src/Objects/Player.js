import Collider from "../Collider.js";
import Coord from "../Coord.js";
import Rect from "../Rect.js";
import { DeltaTime, FrameTimeout, IDGenerator } from "../Tools.js";
import GameObject from "./GameObject.js";
import LaserShot from "./LaserShot.js";

export default class Player extends GameObject {

    __weaponShotIsAble = true;
    __laserIDGenerator = new IDGenerator("laser");
    __isDead = false;
    __velocity = 150;

    startX = 0;
    startY = 80;
    startWidth = 80;
    startHeight = 80;

    __control;

    static spaceShipImage = new Image();

    constructor(id, rect, coord, scenario) {
        super(id, rect, coord, scenario);
    }

    static loadAssets() {
        Player.spaceShipImage.src = "./assets/sprites/ship.png";
    }


    main() {
        this.__collider = new Collider(this, this.__scenario);
        this.__collider.addSubscriber("point");
        this.__collider.setWhenThereIsCollision((object) => {
            if (object.class === "point") {
                this.__isDead = true;
                this.destroy();
                new Audio("./assets/sounds/atari_boom.wav").play();
            }
        })
    }

    preRender() {
    }
    
    posRender() {
        this.__collider.updateDetection();
    }

    render(context) {
        this.preRender();
        this.listenAnimate();
        context.drawImage(Player.spaceShipImage,
            this.startX, this.startY,
            this.startWidth, this.startHeight,


            this.getX(), this.getY(),
            this.__rect.getWidth(), this.__rect.getHeight())

        this.posRender();
    }

    listenAnimate() {
        if (this.__control.thisKeyIsPressed("move-left")) {
            this.setImage(0, 160);
            return
        }
        if (this.__control.thisKeyIsPressed("move-right")) {
            this.setImage(160, 160);
            return
        }
        if (this.__control.thisKeyIsPressed("move-up")) {
            this.setImage(0, 80);
            return
        }
        if (this.__control.thisKeyIsPressed("move-down")) {
            this.setImage(160, 80);
            return
        }
        this.setImage(80, 80);
    }

    setImage(startX, startY) {
        this.startX = startX;
        this.startY = startY;
    }

    setControl(control) {
        this.__control = control;
    }

    getVelocity() {
        return this.__velocity;
    }

    moveUp() {
        this.__coord = new Coord(this.getX(), this.getY() - (this.__velocity * DeltaTime.getDeltaSeconds()))
    }

    moveDown() {
        this.__coord = new Coord(this.getX(), this.getY() + (this.__velocity * DeltaTime.getDeltaSeconds()))
    }

    moveLeft() {
        this.__coord = new Coord(this.getX() - (this.__velocity * DeltaTime.getDeltaSeconds()), this.getY())
    }

    moveRight() {
        this.__coord = new Coord(this.getX() + (this.__velocity * DeltaTime.getDeltaSeconds()), this.getY())
    }

    shot() {
        if (!this.__weaponShotIsAble || this.__isDead) {
            return;
        }

        //let shots = this.__scenario.getObjectsByClass("laser");

        /*if (shots.length >= 6) {
            return;
        }*/
        let laserShot = new LaserShot(
            `${this.getId()}-${this.__laserIDGenerator.generateId()}`,
            new Coord(this.getX() + 30, this.getY()),
            this.__scenario);

        laserShot.setClass("laser");
        laserShot.setColor("red");
        this.__scenario.addObject(laserShot);


        this.__weaponShotIsAble = false;

        let id = FrameTimeout.add(() => {
            this.__weaponShotIsAble = true;
            FrameTimeout.remove(id);
        }, 100);
    }

    grow() {
        this.width += 1;
        this.height += 1;

        this.__rect(new Rect(
            this.__rect.getWidth() + 1,
            this.__rect.getHeight() + 1
        ))
    }
}
import Coord from "../Coord.js";
import { DeltaTime, FrameIntervals, FrameTimeout } from "../Tools.js";
import GameObject from "./GameObject.js";

export default class Enemy extends GameObject {

    startX = 0;
    startY = 0;
    startWidth = 51;
    startHeight = 32;
    zigzag = "left";

    static spaceShipImage = new Image();
    
    static loadAssets() {
        Enemy.spaceShipImage.src = "./assets/sprites/ship-enemy.png";
    }

    main() {
        this.pointsElement = document.querySelector("#pontuation");
        this.idZigZag = FrameIntervals.addInterval(() => {
            if(this.zigzag === "left") {
                this.zigzag = "right";
                return;
            }
            this.zigzag = "left";
        }, 1000)
    }

    render(context) {
        this.preRender();
        context.drawImage(Enemy.spaceShipImage,
            this.startX, this.startY,
            this.startWidth, this.startHeight,
            this.getX(), this.getY(),
            this.__rect.getWidth(), this.__rect.getHeight())

        this.posRender();
    }

    update() {
        if (this.__coord.getY() > 820) {
            this.destroy();
            this.pointsElement.textContent = Number.parseInt(this.pointsElement.textContent) - 1;
        }

        this.moveDown();
        //this.moveZigZag();
    }

    destroy() {
        super.destroy();
        FrameIntervals.removeInterval(this.idZigZag);
    }

    moveDown() {
        this.__coord = new Coord(this.getX() ,this.getY() + (75 * DeltaTime.getDeltaSeconds()))
    }

    moveZigZag() {

        if(this.zigzag === 'left') {
            this.__coord = new Coord(this.getX() - 4 ,this.getY() + 3)
        }
        if(this.zigzag === 'right') {
            this.__coord = new Coord(this.getX() + 4 ,this.getY() + 3)
        }
    }

}
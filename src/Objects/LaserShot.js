import Collider from "../Collider.js";
import Coord from "../Coord.js";
import Rect from "../Rect.js";
import { DeltaTime } from "../Tools.js";
import GameObject from "./GameObject.js";

export default class LaserShot extends GameObject {
    
    constructor(id, coord, scenario) {
        super(id, new Rect(6, 20), coord, scenario)
    }

    main() {
        this.__collider = new Collider(this, this.__scenario);
        this.__collider.addSubscriber("point");

        this.__collider.setWhenThereIsCollision((object) => {
            if (object.class === "point") {
                object.destroy();
                this.destroy();
                new Audio("./assets/sounds/atari_boom.wav").play();
            }

            let pointsElement = document.querySelector("#pontuation");
            pointsElement.textContent = Number.parseInt(pointsElement.textContent) + 1;
        })
        new Audio("./assets/sounds/laser-shot.ogg").play();
    }

    update() {
        if (this.__coord.getY() < -20) {
            this.destroy();
        }
        this.moveUp();
        this.__collider.updateDetection();
    }

    render(context) {
        this.preRender(context);
        context.fillStyle = "green";

        context.fillRect(this.__coord.getX() + 7, this.__coord.getY(), this.__rect.getWidth(), this.__rect.getHeight());
        this.posRender(context);
    }

    moveUp() {
        this.__coord = new Coord(this.getX(), this.getY() - (600 * DeltaTime.getDeltaSeconds()))
    }

}
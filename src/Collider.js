export default class Collider {

    subscribers = [];
    whenThereIsCollision = (targetObject) => {};

    constructor(object, scenario) {
        this.object = object;
        this.scenario = scenario;
    }

    addSubscriber(id) {
        this.subscribers.push(id);
    }
    
    toString() {
        return "Posição X:" + this.object.getX() + " |" + " Posição Y:" + this.object.getY();
    }

    setWhenThereIsCollision(callback) {
        this.whenThereIsCollision = callback;
    }

    updateDetection() {
        this.__detectCollisionsByClass();
    }

    __detectCollisionsByClass() {
        let result = false;
        this.subscribers.forEach(className => {
            let targetObjects = this.scenario.getObjectsByClass(className)
            targetObjects.forEach((target) => {
                if(target !== undefined) {
                    result = this.object.getX() < target.getX() + target.getWidth() &&
                             this.object.getX() + this.object.getWidth() > target.getX() &&
                             this.object.getY() < target.getY() + target.getHeight() &&
                             this.object.getY() + this.object.getHeight() > target.getY();
                    if(result) {
                        this.whenThereIsCollision(target);
                    }
                }
            })
        });
    }
}

export class CollidersManager {

    constructor() {
        this.colliders = [];

    }

    updateDetection() {
        this.colliders.forEach((item) => {
            item.updateDetection();
        })
    }


}
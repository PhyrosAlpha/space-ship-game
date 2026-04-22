export default class Collider {

    subscribers = [];



    whenThereIsCollision = (targetObject) => {};

    constructor(object, scenario, rect, coord) {
        //console.log(object);
        //console.log(rect, coord);
        this.object = object;
        this.scenario = scenario;
        this.__rect = rect;
        this.__coord = coord;
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

    getRect(){
        return this.__rect;
    }

    getCoord(){
        return this.__coord;
    }

    getWidth(){
        return this.__rect.getWidth();
    }

    getHeight(){
        return this.__rect.getHeight();
    }

    getObjectWidthCenter() {
        return this.__rect.getWidthCenter();
    }

    getObjectHeightCenter() {
        return this.__rect.getHeigthCenter();
    }

    getX(){
        return this.__coord.getX();
    }

    getY(){
        return this.__coord.getY();
    }

    render(context) {
        context.fillStyle = "rgba(255, 0, 0, 0.2)";
        context.fillRect(this.object.getX() + this.getX(), this.object.getY() + this.getY(), this.__rect.getWidth(), this.__rect.getHeight());
        context.strokeStyle = "red";
        context.lineWidth = 1;
        context.strokeRect(this.object.getX() + this.getX(), this.object.getY() + this.getY(), this.__rect.getWidth(), this.__rect.getHeight());
    }

    __detectCollisionsByClass() {
        
        this.subscribers.forEach(className => {
            let targetObjects = this.scenario.getObjectsByClass(className)
            targetObjects.forEach((target) => {
                this.__detectTargetCollisions(target);
            })

        });
    }

    __detectTargetCollisions(target) {
        let result = false;
        target.getColliders().forEach((collisor) => {
            if(target !== undefined) {
                result = (this.object.getX() + this.getX()) < (collisor.object.getX() + collisor.getX()) + collisor.getWidth() &&
                            (this.object.getX() + this.getX()) + this.getWidth() > (collisor.object.getX() + collisor.getX()) &&
                            (this.object.getY() + this.getY()) < (collisor.object.getY() + collisor.getY()) + collisor.getHeight() &&
                            (this.object.getY() + this.getY()) + this.getHeight() > (collisor.object.getY() + collisor.getY());
                if(result) {
                    this.whenThereIsCollision(target);
                }
            }
        })
    }

}


export class CollidersManager {

    constructor(scenario) {
        this.scenario = scenario;
        this.colliders = [];
    }

    add(collider) {
        this.colliders.push(collider);
    }

    getColliders() {
        return this.colliders;
    }

    updateDetection() {
        this.colliders.forEach((item) => {
            item.updateDetection();
        })
    }

    render(context) {
        this.colliders.forEach((item) => {
            item.render(context);
        })
    }

}
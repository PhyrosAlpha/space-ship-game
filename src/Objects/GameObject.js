export default class GameObject {

    __rect;
    __coord;
    __id;
    __scenario;
    __collider;

    constructor(id, rect, coord, scenario) {
        this.__id = id;
        this.__rect = rect;
        this.__coord = coord;
        this.color = "black";
        this.class = "default"
        this.__scenario = scenario;
        this.main();
    }

    render(context) {
        this.preRender(context);

        if(this.__collider != undefined) {
            this.__collider.updateDetection();
        }

        context.fillStyle = this.color;
        context.fillRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
        this.posRender(context);
    }

    main() {

    }

    update() {
        
    }

    preRender() {
    }

    posRender() {

    }

    setColor(color) {
        this.color = color;
    }

    setClass(name) {
        this.class = name;
    }

    destroy() {
        this.__scenario.destroyObjectById(this.getId());
    }

    getId(){
        return this.__id;
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

    setCollider(collider) {
        this.__collider = collider;
    }

    setCoord(coord) {
        this.__coord = coord;
    }
}
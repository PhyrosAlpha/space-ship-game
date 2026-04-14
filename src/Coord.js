export default class Coord {

    __x;
    __y;

    constructor(x, y) {
        this.__x = x;
        this.__y = y;
    }

    getX(){
        return this.__x;
    }

    getY(){
        return this.__y;
    }
    
}
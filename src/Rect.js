export default class Rect  {

    __width;
    __height;

    constructor(width, height) {
        if(width === null || width === undefined || height === null || height === undefined) {
            throw Error("Width or Height paramers do not declared");
        }

        this.__width = width;
        this.__height = height;
    }
    
    getWidth(){
        return this.__width;
    }
    getHeight(){
        return this.__height;
    }

    getWidthCenter() {
        return (this.__width / 2).toFixed(2);
    }

    getHeightCenter() {
        return (this.__height / 2).toFixed(2);
    }

    getRectCenter() {
        return new Rect(this.getWidthCenter(), this.getHeightCenter());
    }
}
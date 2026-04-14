export class Control {

    keys = {};
    keysPressed = {};

    constructor() {
        document.addEventListener("keydown", (event) => {
            let key = this.keys[event.key]
            if(!key) {
                return;
            }
            this.keysPressed[key.name] = true;
        })

        document.addEventListener("keyup", (event) => {
            let key = this.keys[event.key]
            if(!key) {
                return;
            }
            this.keysPressed[key.name] = false;
        })   
        
    }

    thisKeyIsPressed(key) {
        return this.keysPressed[key] === true;
    }

    addKey(key) {
        this.keys[key.keyCode] = key;
    }

    removeKey(name) {
        delete this.keys[name];
    }

    listenControls() {
        Object.keys(this.keys).forEach((item) => {
            let key = this.keys[item];
            if(this.keysPressed[key.name]) {
                key.callback();
            }
        })
    }

}

export class Key {

    constructor(name, keyCode, callback) {
        this.name = name;
        this.keyCode = keyCode;
        this.callback = callback;
    }

}

export class ControlBuilder {

    static buildPlayerControl(player) {
        const control = new Control();
        
        control.addKey(new Key("move-up", "ArrowUp", player.moveUp.bind(player)))
        control.addKey(new Key("move-down", "ArrowDown", player.moveDown.bind(player)))
        control.addKey(new Key("move-left", "ArrowLeft", player.moveLeft.bind(player)))
        control.addKey(new Key("move-right", "ArrowRight", player.moveRight.bind(player)))
        control.addKey(new Key("move-up", "w", player.moveUp.bind(player)))
        control.addKey(new Key("move-down", "s", player.moveDown.bind(player)))
        control.addKey(new Key("move-left", "a", player.moveLeft.bind(player)))
        control.addKey(new Key("move-right", "d", player.moveRight.bind(player)))
        control.addKey(new Key("shot", " ", player.shot.bind(player)))
        return control;
    }
}
export default class Scenario {

    objects = []
    objectsToDelete = new Set();

    constructor(/*canvas, */context) {
        //this.context = canvas.getContext("2d");
        this.context = context
    }

    addObject(object) {
        this.objects.push(object);
    }

    getObjectById(id) {
        let target = null;
        target = this.objects.find((object) => {
            if(object.getId() === id) {
                return object;
            }
        })
        return target;
    }

    getObjectsByClass(className) {
        let result = []
        this.objects.forEach((object) => {
            if(object.class === className) {
                result.push(object);
            }
        })
        return result;
    }

    /*destroyObjectById(id) {
        if(id === undefined) {
            return;
        }

        let index = null;
        index = this.objects.findIndex((object) => {
            return object.getId() === id  
        })
        if(index !== -1) {
            this.objects.splice(index, 1);
        }
        return index;
    }*/

    destroyObjectById(id) {
        let object = this.getObjectById(id);
        this.objectsToDelete.add(object);
    }

    clearTargetItems() {
        if(this.objectsToDelete.size === 0) return;

        this.objects = this.objects.filter((object) => {
            return !this.objectsToDelete.has(object);
        });

        this.objectsToDelete.clear();
    }
    
    update() {
        //this.context.clearRect(0, 0, 1000, 1000);
        this.objects.forEach((object) => {
            object.update();
        })

        this.objects.forEach((object) => {
            object.render(this.context);
        })

        this.clearTargetItems();
    }
}
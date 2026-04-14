export function randomIntNumber(min, max) {
    return Number.parseInt(Math.random() * (max - min) + (min));
}

export class IDGenerator {

    count = 0;

    constructor(id) {
        this.id = id;
    }

    generateId() {
        this.count += 1;
        return this.count;
    }

}

export class FrameIntervals {

    static milliseconds = 0;
    static intervals = {};
    static idGenerator = new IDGenerator("intervals");
    

    static updateMilliseconds(milliseconds) {
        FrameIntervals.milliseconds = milliseconds;
    }

    static addInterval(callback, milliseconds) {
        let id = FrameIntervals.idGenerator.generateId();
   
        FrameIntervals.intervals[id] = {
            "id":id, 
            "callback": callback,
            "startMilliseconds": FrameIntervals.milliseconds,
            "milliseconds": milliseconds
        }
        return id;
    }

    static removeInterval(id) {
        let result = delete FrameIntervals.intervals[id];
        return result;
    }

    static startListenIntervals(milliseconds) {
        FrameIntervals.milliseconds = milliseconds;
        Object.keys(FrameIntervals.intervals).forEach((key) => {
            let interval = FrameIntervals.intervals[key];
            if(FrameIntervals.milliseconds - interval["startMilliseconds"] >= interval["milliseconds"]) {
                interval["callback"]();
                interval["startMilliseconds"] = milliseconds;
            }
        })

    }
}

export class FrameTimeout {
    static milliseconds = 0;
    static timeouts = {};
    static idGenerator = new IDGenerator("timeout");

    static updateMilliseconds(milliseconds) {
        FrameTimeout.milliseconds = milliseconds;
    }

    static add(callback, milliseconds) {
        const id = FrameTimeout.idGenerator.generateId();
        FrameTimeout.timeouts[id] = {
            "id":id, 
            "callback": callback,
            "lastMilliseconds": FrameTimeout.milliseconds,
            "milliseconds": milliseconds,
            "isExecuted": false
        }
        return id;
    }

    static remove(id) {
        return delete FrameTimeout.timeouts[id];
    }

    static startListenTimeouts(milliseconds) {
        FrameTimeout.milliseconds = milliseconds;
        Object.keys(FrameTimeout.timeouts).forEach((key) => {
            let timeout = FrameTimeout.timeouts[key];
            if(FrameTimeout.milliseconds - timeout["lastMilliseconds"] >= timeout["milliseconds"] && !timeout["isExecuted"]) {
                timeout["callback"]();
                timeout["isExecuted"] = true;
            }
        })

    }
}
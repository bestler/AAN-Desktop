const path = require('node:path')

class Status {

    constructor(name, color, code) {
        this.name = name;
        this.color = color;
        this.code = code;
    }

    getIconPath() {
        return path.join(__dirname , '..','assets', this.color + '.png');
    }


    static getAllStatus() {
        return [
            new Status("Verfügbar", "green", 0),
            new Status("Abwesend", "yellow", 1),
            new Status("In einem Meeting", "blue", 5),
            new Status("Bitte nicht stören/Beschäftigt", "red", 2),
            new Status("Kaffeepause", "purple", 3),
            new Status("kein Status", "white", 4),
        ];
    }

    static getAllStatusMap() {
        const statusMap = new Map();
        const allStatus = Status.getAllStatus();
        allStatus.forEach(status => {
            statusMap.set(status.color, status);
        });
        return statusMap;
    }
}

module.exports = Status;
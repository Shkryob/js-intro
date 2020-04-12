export default class Sandbox {
    constructor(code) {
        this.code = code;
        this.running = false;
        this.testZone = null;
        this.output = '';
    }

    run(successCallback, failCallback, logCallback) {
        if (this.running) {
            return;
        }

        this.logCallback = logCallback;
        this.output = '';
        this.running = true;
        const func = new Function(this.code);

        const zoneSpec = new window.Zone['AsyncTestZoneSpec'](() => {
            if (typeof successCallback === 'function') {
                successCallback();
            }

            this.running = false;
            this.returnOriginalConsole();
        }, (error) => {
            if (typeof failCallback === 'function') {
                failCallback(error)
            }

            this.running = false;
            this.returnOriginalConsole();
        });
        this.testZone = new window.Zone(window.Zone.current, zoneSpec);
        this.monkeyPatchConsole();
        this.testZone.runGuarded(func);
    }

    isRunning() {
        return this.running;
    }

    getOutput() {
        return this.output;
    }

    monkeyPatchConsole() {
        this.originalConsoleLog = console.log;
        console.log = (message, ...optionalParams) => { //Monkey patch console log
            if (window.Zone.current === this.testZone) {
                if (typeof this.logCallback === 'function') {
                    this.logCallback(message);
                }
                this.output += message + '\n';
            } else {
                this.originalConsoleLog(message, ...optionalParams);
            }
        };
    }

    returnOriginalConsole() {
        if (this.originalConsoleLog) {
            console.log = this.originalConsoleLog;
            this.originalConsoleLog = null;
        }
    }

    destructor() {
        this.returnOriginalConsole();
    }
}
export default class Sandbox {
    constructor(code) {
        this.code = code;
        this.running = false;
        this.testZone = null;
        this.output = '';
    }

    run(successCallback, failCallback, logCallback, expose) {
        if (this.running) {
            return;
        }

        this.logCallback = logCallback;
        this.output = '';
        this.running = true;
        const func = new Function(this.code + this.generateReturnStatement(expose));

        const zoneSpec = new window.Zone['AsyncTestZoneSpec'](() => {
            const wasRunning = this.running; //callback always fire twice :(
            this.running = false;
            this.returnOriginalConsole();

            if (wasRunning && typeof successCallback === 'function') {
                successCallback();
            }
        }, (error) => {
            this.running = false;
            this.returnOriginalConsole();

            if (typeof failCallback === 'function') {
                failCallback(error)
            }
        });
        this.testZone = new window.Zone(window.Zone.current, zoneSpec);
        this.monkeyPatchConsole();
        return this.testZone.runGuarded(func);
    }

    generateReturnStatement(expose) {
        if (!Array.isArray(expose)) {
            return;
        }
        return ';\n return { ' + expose.join(', ') + ' }; ';
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
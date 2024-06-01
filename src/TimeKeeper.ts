export class TimeKeeper {
    private startUnixTime: number = 0
    private endUnixTime: number = 0

    constructor() {}

    start() {
        this.startUnixTime = Date.now()
    }

    end() {
        this.endUnixTime = Date.now()
    }

    reset() {
        this.startUnixTime = 0
        this.endUnixTime = 0
    }

    private getDurationMs(): number {
        return this.endUnixTime - this.startUnixTime
    }

    getDurationSec(): number {
        return this.toSecFromMs(this.getDurationMs())
    }

    private toSecFromMs(ms: number): number {
        return Math.floor(ms / 100) / 10
    }
}

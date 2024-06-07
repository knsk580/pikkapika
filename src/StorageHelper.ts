/**
 * ローカルストレージを操作する
 */
export class StorageHelper {
    private prefix: string

    constructor(prefix: string) {
        this.prefix = prefix
    }

    // Set item in localStorage
    set<T>(key: string, value: T): void {
        const fullKey = this.prefix + key
        const stringValue = JSON.stringify(value)
        localStorage.setItem(fullKey, stringValue)
    }

    // Get item from localStorage
    get<T>(key: string): T | null {
        const fullKey = this.prefix + key
        const stringValue = localStorage.getItem(fullKey)
        if (stringValue) {
            try {
                return JSON.parse(stringValue) as T
            } catch (error) {
                return null
            }
        }
        return null
    }

    // Remove item from localStorage
    remove(key: string): void {
        const fullKey = this.prefix + key
        localStorage.removeItem(fullKey)
    }

    // Check if item exists in localStorage
    has(key: string): boolean {
        const fullKey = this.prefix + key
        return localStorage.getItem(fullKey) !== null
    }
}

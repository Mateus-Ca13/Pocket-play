import { v4 as uuid } from 'uuid';
const CONSOLE_DEVICE_ID_STORAGE_KEY = 'CONSOLE_DEVICE_ID';

export default function useConsoleDeviceId() {
    const storedConsoleDeviceId = localStorage.getItem(CONSOLE_DEVICE_ID_STORAGE_KEY);

    if (storedConsoleDeviceId) {
        return storedConsoleDeviceId;
    }

    const consoleDeviceId = crypto.randomUUID?.() ?? uuid();
    localStorage.setItem(CONSOLE_DEVICE_ID_STORAGE_KEY, consoleDeviceId);

    return consoleDeviceId;
}
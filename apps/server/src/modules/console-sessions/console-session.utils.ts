import { randomInt } from "node:crypto";


const CONSOLE_SESSION_CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const CONSOLE_SESSION_CODE_LENGTH = 6;

export function generateConsoleSessionCode() {
    let code = '';

    for (let index = 0; index < CONSOLE_SESSION_CODE_LENGTH; index++) {
        const charIndex = randomInt(CONSOLE_SESSION_CODE_ALPHABET.length);
        code += CONSOLE_SESSION_CODE_ALPHABET[charIndex];
    }

    return code;
}

export function getConsoleSessionExpiresAt() {
    return new Date(Date.now() + CONSOLE_SESSION_EXPIRES_TIME);
}


const CONSOLE_SESSION_EXPIRES_TIME = 4 * 60 * 60 * 1000; // 4 horas
import app from "./app.js";
import { registerSocketServer } from "./realtime/socket.js";

registerSocketServer(app);

await app.listen({
    port: 3333,
    host: '0.0.0.0',
});
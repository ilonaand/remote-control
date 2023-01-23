import { httpServer } from "./src/http_server/index";
import dotenv from 'dotenv';

dotenv.config();

const HTTP_PORT = process.env.PORT || 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

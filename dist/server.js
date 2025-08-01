"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const env_1 = require("./app/config/env");
const sendAdmin_1 = require("./app/utils/sendAdmin");
let server;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(env_1.envVars.MONGODB_URL);
        console.log('Connected to MongoDB');
        server = app_1.default.listen(env_1.envVars.PORT, () => {
            console.log(`Server is running on http://localhost:${env_1.envVars.PORT}`);
        });
    }
    catch (error) {
        console.error('Error starting server:', error);
    }
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield startServer();
    yield (0, sendAdmin_1.sendAdmin)();
}))();
// Handle unhandled rejections and uncaught exceptions
// This is important for production environments to avoid crashes
process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection. Shutting down server...', error);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception. Shutting down server...', error);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received. Shutting down gracefully...');
    if (server) {
        server.close(() => {
            console.log('Server closed gracefully');
            process.exit(0);
        });
    }
    else {
        process.exit(0);
    }
});
process.on('SIGINT', () => {
    console.log('SIGINT signal received. Shutting down gracefully...');
    if (server) {
        server.close(() => {
            console.log('Server closed gracefully');
            process.exit(0);
        });
    }
    else {
        process.exit(0);
    }
});

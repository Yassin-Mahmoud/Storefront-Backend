"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            jsonwebtoken_1.default.verify(token, process.env.SECRET_TOKEN);
            next();
        }
        else {
            throw new Error("no authHeader [ not authenticated ]");
        }
    }
    catch (err) {
        throw new Error(`token verify error: ${err}`);
    }
};
exports.default = verifyToken;
//# sourceMappingURL=authentication.js.map
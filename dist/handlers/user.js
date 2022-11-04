"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.addProducts = exports.deleteUser = exports.createUser = exports.showUser = exports.index = void 0;
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const USERS = new user_1.users();
const index = async (_req, res) => {
    const theUsers = await USERS.index();
    res.json(theUsers);
};
exports.index = index;
const showUser = async (req, res) => {
    const theUser = await USERS.showUser(req.params.id);
    res.json(theUser);
};
exports.showUser = showUser;
const createUser = async (req, res) => {
    try {
        const addNewUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            password: req.body.password,
        };
        const newUser = await USERS.createUser(addNewUser);
        res.status(200).json({
            new_user: { ...newUser },
            message: "User created successfully",
        });
    }
    catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
};
exports.createUser = createUser;
const deleteUser = async (req, res) => {
    const deleted = await USERS.deleteUser(req.params.id);
    res.json({
        message: "user deleted successfully",
    });
};
exports.deleteUser = deleteUser;
const addProducts = async (req, res) => {
    const addProduct = await USERS.addProduct(req.params.userId, req.body.productId, req.body.quantity);
    res.json({
        product: { ...addProduct },
        message: "product added",
    });
};
exports.addProducts = addProducts;
const authenticate = async (req, res) => {
    try {
        const login = await USERS.authentication(req.body.userName, req.body.password);
        const token = jsonwebtoken_1.default.sign(login, process.env.SECRET_TOKEN);
        return res.json({
            userInfo: { ...login, token },
            message: "you are authenticated",
        });
    }
    catch (err) {
        throw new Error(`you are not authenticated: ${err}`);
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=user.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
const PORT = process.env.PORT;
app.use("/", routes_1.default);
app.get("/", (req, res) => {
    res.status(200).send("Welecome to Yassin's Storefront backend");
});
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});
exports.default = app;
//# sourceMappingURL=server.js.map
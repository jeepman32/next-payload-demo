"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const errorHandler_1 = __importDefault(require("payload/dist/express/middleware/errorHandler"));
const login_1 = __importDefault(require("payload/dist/auth/operations/login"));
const withPayload_1 = __importDefault(require("../../middleware/withPayload"));
const convertPayloadJSONBody_1 = __importDefault(require("../../middleware/convertPayloadJSONBody"));
const cookie_1 = __importDefault(require("../../middleware/cookie"));
const fileUpload_1 = __importDefault(require("../../middleware/fileUpload"));
const dataLoader_1 = __importDefault(require("../../middleware/dataLoader"));
const i18n_1 = __importDefault(require("../../middleware/i18n"));
async function handler(req, res) {
    var _a;
    const collectionSlug = req.query.collection;
    if (!((_a = req.payload.collections) === null || _a === void 0 ? void 0 : _a[collectionSlug])) {
        return res.status(http_status_1.default.BAD_REQUEST).json({
            message: 'Collection not found',
        });
    }
    try {
        const result = await (0, login_1.default)({
            req,
            res,
            collection: req.payload.collections[collectionSlug],
            data: req.body,
            depth: parseInt(String(req.query.depth), 10),
        });
        console.log('result', JSON.stringify(result))
        return res.status(http_status_1.default.OK)
            .json({
            message: 'Auth Passed',
            user: result.user,
            token: result.token,
            exp: result.exp,
        });
    }
    catch (error) {
        const errorHandler = (0, errorHandler_1.default)(req.payload.config, req.payload.logger);
        return errorHandler(error, req, res, () => null);
    }
}
exports.default = (0, withPayload_1.default)((0, dataLoader_1.default)((0, fileUpload_1.default)((0, i18n_1.default)((0, convertPayloadJSONBody_1.default)((0, cookie_1.default)(handler))))));
//# sourceMappingURL=login.js.map

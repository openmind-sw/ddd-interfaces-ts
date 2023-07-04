"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceException_1 = __importDefault(require("./ServiceException"));
/**
 * Exception for service repositories
 */
class RepositoryException extends ServiceException_1.default {
    /**
     * @param caller The origin of the exception; Use format `fileName.functionName` or `ClassName.methodName`
     * @param message The message explaining the exception. Might be exposed to the api
     * @param status The HTTP status code of the exception. Defaults to 400
     * @param cause When catching and re-throwing, this should be used to pass the original exception
     */
    constructor(caller, message, status, cause) {
        super(caller, message, status, cause);
    }
}
exports.default = RepositoryException;
//# sourceMappingURL=RepositoryException.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatusCodes_1 = require("../HttpStatusCodes");
/**
 * General exception for API services.
 * - `AbstractEntity` and `AbstractValueObject` should usually throw `ValidationException` instead
 * - `Repository` should throw `RepositoryException` instead
 */
class ServiceException extends Error {
    caller;
    message;
    status;
    cause;
    /**
     * @param caller The origin of the exception; Use format `fileName.functionName` or `ClassName.methodName`
     * @param message The message explaining the exception. Might be exposed to the api
     * @param status The HTTP status code of the exception. Defaults to 400
     * @param cause When catching and re-throwing, this should be used to pass the original exception
     */
    constructor(caller, message, status = HttpStatusCodes_1.HTTP_STATUS.BAD_REQUEST, cause) {
        super(message, { cause });
        this.caller = caller;
        this.message = message;
        this.status = status;
        this.cause = cause;
    }
    toString() {
        return `${this.caller}: ${this.message} (http ${this.status})`;
    }
}
exports.default = ServiceException;
//# sourceMappingURL=ServiceException.js.map
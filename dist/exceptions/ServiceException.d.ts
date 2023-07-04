import { HTTP_STATUS } from '../HttpStatusCodes';
/**
 * General exception for API services.
 * - `AbstractEntity` and `AbstractValueObject` should usually throw `ValidationException` instead
 * - `Repository` should throw `RepositoryException` instead
 */
export default class ServiceException extends Error {
    readonly caller: string;
    readonly message: string;
    readonly status: HTTP_STATUS;
    readonly cause?: Error;
    /**
     * @param caller The origin of the exception; Use format `fileName.functionName` or `ClassName.methodName`
     * @param message The message explaining the exception. Might be exposed to the api
     * @param status The HTTP status code of the exception. Defaults to 400
     * @param cause When catching and re-throwing, this should be used to pass the original exception
     */
    constructor(caller: string, message: string, status?: HTTP_STATUS, cause?: Error);
    toString(): string;
}

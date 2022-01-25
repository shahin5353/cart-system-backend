import ErrorCodes from './ErrorCodes';


//Define a ErrorMessage against every error code
export default class ErrorMessages {
    static getMessage(errorCode: number) {
        switch (errorCode) {
            case ErrorCodes.PRODUCT_NOT_FOUND:
                return 'Product not found';
            case ErrorCodes.USER_NOT_FOUND:
                return 'Wrong Credentials';
            case ErrorCodes.JWT_ERROR:
                return 'Unauthorized access';
            case ErrorCodes.USER_ALREADY_EXISTS_WITH_MAIL:
                return 'User already exists with this email';
            default:
                return 'something went wrong';
        }
    }
}

//creating the error handler
export const errorHandler = (err, req, res, next) =>{

    //if error is one of the defined apperros
    if(err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message || "ineternal server error"
        });
    }
}

// defining the app error class
export class AppError extends Error{
    statusCode;
    isOperational;
    constructor(message, statusCode=500, isOperational = true){
        super(message)
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}

//other commonly occuring errors
export class NotFoundError extends AppError {
    constructor(message = "resource not found"){
        super(message, 404);
    }
}

export class ConflictError extends AppError {
    constructor(message="conflict error") {
        super(message, 409);
    }
}
export class BadRequestError extends AppError {
    constructor(message="Bad request ") {
        super(message, 400);
    }
}
export class UnauthorizedError extends AppError {
    constructor(message="unauthorized error") {
        super(message, 401);
    }
}
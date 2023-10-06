import { Prisma } from "@prisma/client"
import { ResultTaskType } from "./Types"

const ErrorHandler = (e: unknown) => {
    let result: ResultTaskType
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // console.log(e)
        result = {
            success: false,
            message: e.meta?.cause,
            serverErrCode: e.code,
            httpStatus: 404
        }
        return result
    }
    else if (e instanceof Prisma.PrismaClientInitializationError) {
        console.log(e.name)
        console.log(e.message)
    }
    result = {
        success: false,
        message: 'Internal Server Error',
        httpStatus: 500
    };
    return result
}

export default ErrorHandler
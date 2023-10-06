import { PrismaClient } from '@prisma/client'
import { getFoodDataQueryType } from '../utils/Types'
import { DetailFoodFields, SimpleFoodFields } from '../utils/Fields'
import SuccessResponse from '../utils/SuccessResponse'
import ErrorHandler from '../utils/ErrorHandler'



const prisma = new PrismaClient().$extends({
    name: 'imageUrl',
    result: {
        foodData: {
            image: {
                needs: { image: true },
                compute(foodData) {
                    return `${process.env.IMAGE_URL}${foodData.image}`
                }
            }
        }
    }
})




export const getCategory = async () => {
    try {
        const data = await prisma.category.findMany()

        return {
            httpStatus: 200,
            data: SuccessResponse(data)
        }
    }
    catch (e) {
        const result = ErrorHandler(e)
        return {
            httpStatus: result.httpStatus,
            data: {
                success: result.success,
                message: result.message,
                serverErrCode: result.serverErrCode
            }
        }
    }
}

export const getFoodData = async (queryData?: getFoodDataQueryType) => {
    try {

        const data = await prisma.foodData.findMany({
            ...queryData, select: SimpleFoodFields
        })

        return {
            httpStatus: 200,
            data: SuccessResponse(data)
        }
    }
    catch (e) {
        const result = ErrorHandler(e)
        return {
            httpStatus: result.httpStatus,
            data: {
                success: result.success,
                message: result.message,
                serverErrCode: result.serverErrCode
            }
        }
    }
}

export const searchFoodData = async (searchQuery: string, queryData?: getFoodDataQueryType) => {
    try {
        const data = await prisma.foodData.findMany({
            ...queryData,
            select: SimpleFoodFields,
            where: {
                ...queryData?.where,
                dishName: {
                    contains: searchQuery, mode: 'insensitive'
                }
            }
        })

        return {
            httpStatus: 200,
            data: SuccessResponse(data)
        }
    }
    catch (e) {
        const result = ErrorHandler(e)
        return {
            httpStatus: result.httpStatus,
            data: {
                success: result.success,
                message: result.message,
                serverErrCode: result.serverErrCode
            }
        }
    }
}

export const getDetailFoodData = async (foodId: string) => {
    try {
        const foodData = await prisma.foodData.findUnique({
            where: {
                id: foodId
            },
            select: DetailFoodFields
        })

        if (!foodData) {
            return {
                httpStatus: 404,
                data: {
                    success: false,
                    message: "food Id didn't Exist"
                }
            }
        }

        return {
            httpStatus: 200,
            data: SuccessResponse(foodData)
        }
    }
    catch (e) {
        const result = ErrorHandler(e)
        return {
            httpStatus: result.httpStatus,
            data: {
                success: result.success,
                message: result.message,
                serverErrCode: result.serverErrCode
            }
        }
    }
}

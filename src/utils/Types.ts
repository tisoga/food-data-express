import { Prisma } from '@prisma/client';

export interface ResultTaskType {
    success: boolean
    data?: object | Array<any>
    message?: string | unknown
    httpStatus: number
    serverErrCode?: string
}

export type getFoodDataQueryType = {
    where: {
        isPopular?: boolean
        categoryId?: string
    }
    skip?: number
    take?: number
}

export type detailFoodData = Prisma.FoodDataGetPayload<{
    select: {
        id: true,
        dishName: true,
        categories: {
            select: {
                id: true,
                name: true
            }
        },
        image: true,
        origin: true,
        ingredients: {
            select: {
                ingredient: true,
                qty: true
            }
        },
        instructions: true,
        isPopular: true,
        tag: true,
        searchCount: true,
        createdAt: true,
    }
}>

export type simpleFoodDataType = Array<Prisma.FoodDataGetPayload<{
    select: {
        id: true,
        dishName: true,
        categories: {
            select: {
                id: true,
                name: true
            }
        },
        image: true,
        origin: true,
        isPopular: true,
        tag: true,
        searchCount: true,
        createdAt: true
    }
}>>

export type foodDataModelType = Array<Prisma.FoodDataGetPayload<{}>>

export type categoryModelType = Array<Prisma.CategoryGetPayload<{}>>

export type SuccessResponseType = foodDataModelType | categoryModelType | detailFoodData | simpleFoodDataType
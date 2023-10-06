import { Request, Response, Router } from "express";
import { getCategory, getFoodData, getDetailFoodData, searchFoodData } from "../controller/FoodController";
import { getFoodDataQueryType } from "../utils/Types";

const router = Router()


router.get('/category', async (req: Request, res: Response) => {
    const result = await getCategory()

    res.status(result.httpStatus).json(result.data)
})

router.get('/food-data', async (req: Request, res: Response) => {
    const { isPopular, category, limit, page, search } = req.query
    let result;

    const queryData: getFoodDataQueryType = {
        where: {}
    }

    if (isPopular === 'true') {
        queryData.where.isPopular = true
    }

    if (category) {
        queryData.where.categoryId = category as string
    }

    if (Number(limit) > 0) {
        queryData.take = Number(limit)
    }
    else {
        queryData.take = 6
    }

    if (Number(page) > 1) {
        queryData.skip = queryData.take * (Number(page) - 1)
    }

    if (search) {
        result = await searchFoodData(search as string, queryData)
    }
    else {
        result = await getFoodData(queryData)
    }

    res.status(result.httpStatus).json(result.data)
})

router.get('/food-data/:id', async (req: Request, res: Response) => {
    const { id } = req.params

    const result = await getDetailFoodData(id)

    res.status(result.httpStatus).json(result.data)
})

export default router
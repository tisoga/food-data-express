export const DetailFoodFields = {
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
    createdAt: true
}

export const SimpleFoodFields = {
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
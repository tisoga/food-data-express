import { SuccessResponseType } from "./Types"

const SuccessResponse = (data: SuccessResponseType) => {
    const resultJson = {
        success: true,
        data: data
    }
    return resultJson
}

export default SuccessResponse
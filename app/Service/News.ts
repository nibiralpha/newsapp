import { AxiosResponse } from 'axios';
import { API_END_POINT } from '../Constant/API';
import axios from '../Interceptor';
import NewsListResponse, { NewsDetailResponse } from '../Models/Response.model';
import { generateGurdienIDFromUrlId, generateQS } from "../Utils/helper";

interface NewsResponse {
    response: NewsListResponse
}

interface SingleNewsResponse {
    response: NewsDetailResponse
}

const getNews = async (filters: object): Promise<NewsListResponse> => {
    try {
        const response: AxiosResponse = await axios.get<NewsResponse>(`${API_END_POINT}/search?${generateQS(filters)}`)
        return response.data.response
    } catch (error: any) {
        throw error
    }
}

const getNewsById = async (id: string, filters: object): Promise<NewsDetailResponse> => {
    id = generateGurdienIDFromUrlId(id)
    try {
        const response: AxiosResponse = await axios.get<SingleNewsResponse>(`${API_END_POINT}/${id}?${generateQS(filters)}`)
        return response.data.response
    } catch (error: any) {
        throw error
    }
}



export { getNews, getNewsById }

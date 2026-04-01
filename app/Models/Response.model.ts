import NewsModel, { Fields } from "./News.model"

interface Content {
    id: string,
    type: string,
    sectionId: string,
    sectionName: string,
    webPublicationDate: string,
    webTitle: string,
    webUrl: string,
    apiUrl: string,
    isHosted: string,
    pillarId: string,
    pillarName: string,
    fields?: Fields
}

interface NewsListResponse {
    currentPage: number,
    orderBy: string,
    pageSize: number,
    pages: number,
    startIndex: number,
    status: string,
    total: number,
    userTier: string,
    results: NewsModel[]
}

interface NewsDetailResponse {
    status: string,
    userTier: string,
    total: string,
    content: Content
}

export default NewsListResponse
export type { NewsDetailResponse, Content }
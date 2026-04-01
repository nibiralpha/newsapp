interface Fields {
    headline: string,
    body: string,
    thumbnail: string
}

interface NewsModel {
    apiUrl: string,
    id: string,
    isHosted: boolean,
    pillarId: string,
    pillarName: string,
    sectionId: string,
    sectionName: string,
    type: string,
    webPublicationDate: string,
    webTitle: string,
    webUrl: string,
    fields?: Fields
}

export default NewsModel
export type { Fields }
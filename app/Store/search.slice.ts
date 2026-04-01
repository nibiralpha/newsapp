import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import NewsListResponse from '../Models/Response.model'

interface NewsState {
    data: NewsListResponse | {},
    loading: boolean,
    errorResponse: object,
    error: boolean,
    query: string,
    sort: string,
    globalLoading: boolean
}

const defaultState: NewsState = {
    data: {},
    loading: false,
    errorResponse: {},
    error: false,
    query: '',
    sort: 'newest',
    globalLoading: false
}

export const searchSlice = createSlice({
    name: 'search',
    initialState: defaultState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            return { ...state, query: action.payload }
        },
        setSort: (state, action: PayloadAction<string>) => {
            return { ...state, sort: action.payload }
        },
        setGlobalLoading: (state, action: PayloadAction<boolean>) => {
            return { ...state, globalLoading: action.payload }
        },
        startLoadingTopNews: (state, action: PayloadAction) => {
            return { ...state, loading: true }
        },
        stopLoadingTopNews: (state, action: PayloadAction) => {
            return { ...state, loading: false }
        },
        getTopNewsSuccess: (state, action: PayloadAction<NewsListResponse>) => {
            return { ...state, error: false, data: { ...action.payload } }
        },
        getTopNewsFailed: (state, action: PayloadAction<object>) => {
            return { ...state, error: true, errorResponse: { ...action.payload } }
        }
    },
})

export const {
    startLoadingTopNews,
    stopLoadingTopNews,
    getTopNewsSuccess,
    getTopNewsFailed,
    setQuery,
    setSort,
    setGlobalLoading
} = searchSlice.actions

export default searchSlice.reducer

import { combineReducers } from '@reduxjs/toolkit'
import searchSlice from './search.slice'

const rootReducer = combineReducers(
    {
        searchSlice: searchSlice
    }
)

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
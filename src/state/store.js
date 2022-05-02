import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from './reducers/user.reducers'


export default configureStore({
    reducer: {
        auth: authSlice.reducer
    }
})
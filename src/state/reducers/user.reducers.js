import { createSlice } from "@reduxjs/toolkit"
import { checkUser, fetchProfile, signIn, signOut } from "../actions/user.actions"

const initialState = {
    userData: null,
    profile: null,
    repos: null,
    count: 0,
    requestStatus: null,
    requestError: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        [checkUser.pending]: (state, _action) => {
            return {
                ...state,
                requestStatus: 'loading',
            }
        },
        [checkUser.fulfilled]: (state, action) => {
            return {
                ...state,
                userData: action.payload,
                requestStatus: 'success'
            }
        },
        [checkUser.rejected]: (state, action) => {
            return {
                ...state,
                requestStatus: 'failed',
                requestError: action.payload
            }
        },
        [signIn.pending]: (state, _action) => {
            return {
                ...state,
                requestStatus: 'loading',
            }
        },
        [signIn.fulfilled]: (state, _action) => {
            return {
                ...state,
                requestStatus: 'success'
            }
        },
        [signIn.rejected]: (state, action) => {
            return {
                ...state,
                requestStatus: 'failed',
                requestError: action.payload
            }
        },
        [fetchProfile.pending]: (state, _action) => {
            return {
                ...state,
                requestStatus: 'loading',
            }
        },
        [fetchProfile.fulfilled]: (state, action) => {
            return {
                ...state,
                profile: action.payload.data,
                repos: action.payload.repos,
                requestStatus: 'success'
            }
        },
        [fetchProfile.rejected]: (state, action) => {
            return {
                ...state,
                requestStatus: 'failed',
                requestError: action.payload
            }
        },
        [signOut.pending]: (state, _action) => {
            return {
                ...state,
                requestStatus: 'loading',
            }
        },
        [signOut.fulfilled]: (state, _action) => {
            return {
                ...state,
                userData: null,
                requestStatus: 'success'
            }
        },
        [signOut.rejected]: (state, action) => {
            return {
                ...state,
                requestStatus: 'failed',
                requestError: action.payload
            }
        }
    }
})


export default authSlice.reducer
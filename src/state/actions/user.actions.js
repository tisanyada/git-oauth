import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

import { supabase } from "../../client"

const baseUrl = 'https://api.github.com/users/'

export const checkUser = createAsyncThunk(
    'auth/check-user',
    async (_, { rejectWithValue }) => {
        const user = supabase.auth.user()

        return user?.user_metadata
    }
)

export const fetchProfile = createAsyncThunk(
    'auth/profile',
    async (handle, { rejectWithValue }) => {
        try {
            const params = {
                count: 20,
                sort: 'updated'
            }

            const { data } = await axios.get(baseUrl + handle)
            const repos = await axios.get(`${baseUrl}${handle}/repos?per_page=${params.count}&sort=${params.sort}`)

            return { data, repos: repos.data }
        } catch (error) {
            console.log(error.message)
            return rejectWithValue(error)
        }
    }
)


export const signIn = createAsyncThunk(
    'auth/sign-in',
    async (_, { rejectWithValue }) => {
        try {
            const req = await supabase.auth.signIn({
                provider: 'github'
            })
            return req
        } catch (error) {
            console.log(error)
            return rejectWithValue(error)
        }
    }
)


export const signOut = createAsyncThunk(
    'auth/sign-out',
    async (_, { rejectWithValue }) => {
        try {
            const req = await supabase.auth.signOut()
            return req
        } catch (error) {
            console.log(error)
            return rejectWithValue(error)
        }
    }
)

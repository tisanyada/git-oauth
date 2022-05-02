import { createContext, useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { checkUser, fetchProfile, signIn, signOut } from "../state/actions/user.actions"

const Context = createContext()

export const StateContext = ({ children }) => {
    const dispatch = useDispatch()

    const [user, setUser] = useState(null)
    const [userRepos, setUserRepos] = useState(null)
    const [searchInput, setSearchInput] = useState('')
    const [loading, setLoading] = useState(false)

    const { userData, profile, repos, requestStatus, requestError } = useSelector(state => state.auth)

    useEffect(() => {
        setLoading(true)
        dispatch(checkUser())

        if (userData && !profile) {
            setUser(userData)
            dispatch(fetchProfile(userData.user_name))
            setLoading(false)
        }
        if (repos) {
            setUserRepos(repos)
            setTimeout(() => {
                setLoading(false)
            }, 3000)
        }

        window.addEventListener('hashchange', function () {
            setLoading(true)
            dispatch(checkUser())

            if (userData && !profile) {
                setUser(userData)
                dispatch(fetchProfile(userData.user_name))
            }
            if (repos) {
                setTimeout(() => {
                    setLoading(false)
                }, 3000)
                setUserRepos(repos)
            }
        })
    }, [userData, repos])

    const userSignOut = () => {
        dispatch(signOut())
        setUser(null)
    }
    const userSignIn = () => {
        dispatch(signIn())
    }

    const filterByName = (name) => {
        setSearchInput(name)

        setUserRepos([...repos.filter(repo => repo.name.includes(name))])
    }

    return (
        <Context.Provider
            value={{
                user,
                profile,
                loading,
                repos: userRepos,
                userSignIn,
                userSignOut,
                searchInput,
                filterByName
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)
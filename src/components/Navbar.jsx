import React from 'react'
import { FaGithubSquare } from 'react-icons/fa'

import { useStateContext } from '../context'

const Navbar = () => {
    const { user, userSignIn, userSignOut } = useStateContext()

    return (
        <nav className='navbar'>
            <a href="#" className="logo">OAUTH</a>

            <ul className='nav'>
                <li><a href="#">About</a></li>
                <li className={`nav__auth-link ${user && 'auth-active'}`}>
                    {!user ? (
                        <a
                            href="#"
                            onClick={userSignIn}
                        >
                            <FaGithubSquare size={14} />
                            Sign In
                        </a>
                    ) : (
                        <a
                            href="#"
                            onClick={userSignOut}
                        >
                            <FaGithubSquare size={14} />
                            Sign Out
                        </a>
                    )}
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
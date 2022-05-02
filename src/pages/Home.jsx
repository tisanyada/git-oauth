import { Fragment } from 'react'
import moment from 'moment'
import { FiGithub, FiUsers } from 'react-icons/fi'
import { AiOutlineBook, AiOutlineMail, AiOutlineFork, AiOutlineLink, AiOutlineStar, AiOutlineTwitter } from 'react-icons/ai'
import { BiCube, BiDownArrow } from 'react-icons/bi'
import { BsStack } from 'react-icons/bs'
import { GoLocation } from 'react-icons/go'
import { RiBookOpenLine, RiScales3Line } from 'react-icons/ri'

import { Octocat } from '../assets'
import { useStateContext } from '../context/index.jsx'
import { Loader } from '../components'


const Home = () => {
    const { loading, user, profile, repos, searchInput, userSignIn, filterByName } = useStateContext()

    return (
        <Fragment>
            {!user ? (
                <main className="main">
                    <div className='main__no-auth'>
                        <h1>GitHub-OAuth</h1>
                        <div className="main__icon">
                            <img src={Octocat} alt="octacat" />
                            <button onClick={userSignIn}>
                                <FiGithub /> Sign In
                            </button>
                        </div>
                    </div>
                </main>
            ) : loading ? (
                <div className="loader">
                    <Loader />
                </div>
            ) :
                (

                    <main className='main'>
                        <div className="main__header">
                            <div className="blank"></div>

                            <div className="tabs">
                                <div className="tabs__overview">
                                    <RiBookOpenLine /> Overview
                                </div>
                                <div className="tabs__repositories">
                                    <AiOutlineBook /> Repositories {repos && (<span>{repos?.length}</span>)}
                                </div>
                                <div className="tabs__projects">
                                    <BsStack /> Projects
                                </div>
                                <div className="tabs__packages">
                                    <BiCube /> Packages
                                </div>
                                <div className="tabs__stars">
                                    <AiOutlineStar /> Stars     
                                </div>
                            </div>
                        </div>


                        <div className="profile">
                            <aside className='profile__user'>
                                <div className="profile__img-name">
                                    <img src={user.avatar_url} alt="" />
                                    <div className="name">
                                        <h4>{user.full_name}</h4>
                                        <p>{user.user_name}</p>
                                    </div>
                                </div>
                                <div className="profile__user-info">
                                    <button>Follow</button>

                                    <div className="profile__connections">
                                        <div className="profile__connections-followers">
                                            <FiUsers />
                                            {profile?.followers} followers
                                        </div>
                                        <div>{'>'}</div>
                                        <div className="profile__connections-following">
                                            {profile?.following} following
                                        </div>
                                    </div>

                                    <div className="profile__contact">
                                        {user?.email && (
                                            <p className="profile__email"><AiOutlineMail /> {user.email}</p>
                                        )}
                                        {profile?.location && (
                                            <p className="profile__location"><GoLocation />{profile?.location}</p>
                                        )}
                                        {profile?.blog && (
                                            <a href={`https://${profile?.blog}`} target='_blank' className="profile__website"><AiOutlineLink /> {profile?.blog}</a>
                                        )}
                                        {profile?.twitter_username && (
                                            <p className="profile__twitter"><AiOutlineTwitter /> {profile?.twitter_username}</p>
                                        )}
                                    </div>
                                </div>
                            </aside>

                            <section className="profile__main">
                                <div className="profile__search">
                                    <input type="text" placeholder='Find a repository...' value={searchInput} onChange={(e) => filterByName(e.target.value)} />

                                    <div className="profile__search-btns">
                                        <select className="btn">
                                            {['Type', 'Sources', 'Forks', 'Archived', 'Mirrors', 'Templates'].map((item, index) => (
                                                <option
                                                    key={index}
                                                    value={item}
                                                >{item.toUpperCase()}
                                                </option>
                                            ))}
                                        </select>
                                        <select className="btn">
                                            {['Language', 'All', 'CSS', 'JavaScript', 'Python', 'TypeScript', 'HTML', 'Jupyter Notebook'].map((item, index) => (
                                                <option
                                                    key={index}
                                                    value={item}
                                                >{item.toUpperCase()}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            className="btn"
                                        >
                                            {['Sort', 'Last Updated', 'Name', 'Stars'].map((item, index) => (
                                                <option
                                                    key={index}
                                                    value={item}
                                                >{item.toUpperCase()}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="profile__repos">
                                    {repos && repos.map((repo) => (
                                        <div
                                            key={repo.id}
                                            className="repo__card"
                                        >
                                            <div className="repo__card-left">
                                                <h4 className='repo__title'>
                                                    <a href={`https://github.com/${user.user_name}/${repo.name}`} target={'_blank'}>
                                                        {repo.name}
                                                    </a>
                                                    <span>{repo.private ? 'Private' : 'Public'}</span>
                                                </h4>
                                                {repo.description && (<p className="repo__description">{repo.description}</p>)}

                                                {repo?.topics?.length > 0 && (
                                                    <div className="repo__topics">
                                                        {repo?.topics?.length > 0 && repo.topics.map((item, index) => (
                                                            <a
                                                                key={`${item}-${index}`}
                                                                href={`https://www.github.com/topics/${item}`}
                                                                target={'_blank'}
                                                                className="topic"
                                                            >
                                                                {item}
                                                            </a>
                                                        ))}
                                                    </div>
                                                )}

                                                <div className="repo__info">
                                                    {repo.language && (<p className="repo__language">{repo.language}</p>)}
                                                    {repo.forks > 0 && (
                                                        <p className="repo__forks">
                                                            <AiOutlineFork size={15} />
                                                            {repo.forks}
                                                        </p>
                                                    )}
                                                    {repo.license && (
                                                        <p className="repo__license">
                                                            <RiScales3Line size={15} />
                                                            {repo.license.name}
                                                        </p>
                                                    )}
                                                    <p className="repo__udated-at">Updated on {moment(repo.updated_at).format('Do MMM YYYY')}</p>
                                                </div>
                                            </div>

                                            <div className="repo__card-right">
                                                <div className="repo__star">
                                                    <div className="star"><AiOutlineStar/> Star</div>
                                                    <div className="icon">
                                                        <BiDownArrow/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div >
                    </main >
                )}
        </Fragment >
    )
}

export default Home
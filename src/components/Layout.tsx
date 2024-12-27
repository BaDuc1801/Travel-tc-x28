import React, { useEffect, useState } from 'react'
import { GiFlexibleStar } from 'react-icons/gi';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Obj } from '../interface';

const Layout: React.FC = () => {
    const [active, setActive] = useState("Home")
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const nav = useNavigate();

    const toggleMenu = () => {
        setShowMenu((prevShowMenu) => !prevShowMenu);
    };

    const isAuthenticated = window.localStorage.getItem('authenticated') === 'true';
    const user: Obj = JSON.parse(localStorage.getItem('user') || '{}');

    const location = useLocation();
     
    useEffect(() => {
        const path = location.pathname;
        if (path === '/') {
            setActive("Home");
        } else if (path.startsWith('/explore')) {
            setActive("Explore");
        } else if (path.startsWith('/destinations')) {
            setActive("Destinations");
        }
    }, [location.pathname]);    

    return (
        <div className="h-screen flex flex-col">
            <div className="fixed z-50 top-0 flex justify-between w-full bg-[#090c28] text-white pl-2 pr-2 h-[56px]">
                <div className="flex items-center w-1/3 cursor-pointer" onClick={() => nav('/')}>
                    <GiFlexibleStar className="text-3xl" />
                    <p className="text-2xl font-bold ml-2">Travel</p>
                </div>
                <div className="flex gap-10 items-center w-1/3 justify-center text-xl">
                    <Link to={'/'} className={(active === "Home") ? "text-red-400" : "white"} onClick={() => { setActive("Home") }}>Trang chủ</Link>
                    <Link to={'/explore'} className={(active === "Explore") ? "text-red-400" : "white"} onClick={() => { setActive("Explore") }}>Khám phá</Link>
                </div>
                {!isAuthenticated ?
                    <div className="flex gap-6 text-lg w-1/3 justify-end items-center">
                        <button className="hover:text-red-400 rounded-lg" onClick={() => nav('/auth/login')}>Đăng nhập</button>
                        <button className="hover:bg-red-500 rounded-lg px-2 h-10 bg-red-400" onClick={() => nav('/auth/register')}>Đăng kí</button>
                    </div> :
                    <div className="flex items-center gap-2 w-1/3 justify-end">
                        <p>{user?.name}</p>
                        <div className="h-10 w-10 relative group cursor-pointer " onClick={toggleMenu}>
                            <img src={user?.profilePic?.profilePicture} className="rounded-full" />
                            {showMenu && (
                                <>
                                    <div className="absolute top-[40px] right-0 z-50 rounded-md overflow-hidden bg-white">
                                        <Link to={`/profile/${user.id}`} className="block px-4 py-2 text-black rounded-md bg-white hover:bg-red-100 whitespace-nowrap">Personal Profile</Link>
                                        <Link to={'/login'} onClick={() => { localStorage.setItem("authenticated", "false") }} className="block px-4 py-2 text-black rounded-md bg-white hover:bg-red-100">Log Out</Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                }
            </div>
            <div className='flex-grow mt-[56px]'>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout

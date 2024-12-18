import { NavLink } from "react-router";
import profile from "../../assets/images/profile.png"
import task from "../../assets/images/task.png"
import { MouseEventHandler, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
function Header() {

    const [showMenu, setShowMenu] = useState<boolean>(false);
    const { data } = useAuth();
    const openUserMenu = (e: Event): MouseEventHandler<HTMLButtonElement> => {
        e.stopPropagation();
        setShowMenu((e) => !e);
    }
    useEffect(() => {
        const handleDomClick = (_event: Event) => {
            if (showMenu) {
                setShowMenu(false)
            }
        };
        document.addEventListener('click', handleDomClick);
        return () => {
            document.removeEventListener('click', handleDomClick);
        };
    }, [showMenu])
    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open main menu</span>
                            <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <svg className="hidden size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            <img className="h-8 w-auto" src={task} alt="Your Profile" />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <NavLink to="/" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" aria-current="page">Dashboard</NavLink>
                                <NavLink to="/category" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Category</NavLink>
                                <NavLink to="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Tag</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="relative ml-3">
                            <div className="flex gap-2 items-center">
                                <h3 className="text-white font-semibold ">{data?.user?.name}</h3>
                                <button onClick={openUserMenu} type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                    <span className="absolute -inset-1.5"></span>
                                    <span className="sr-only">Open user menu</span>
                                    <img className="size-8 rounded-full" src={profile} alt="" />
                                </button>
                            </div>
                            <div onClick={openUserMenu} className={`${(showMenu) ? '' : 'hidden'} absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
                                <NavLink to="/profile" className="block px-4 py-2 text-sm text-gray-700" tabIndex={-1} role="menuitem" id="user-menu-item-0">Your Profile</NavLink>
                                <NavLink to="/" className="block px-4 py-2 text-sm text-gray-700" tabIndex={-1} role="menuitem" id="user-menu-item-1">Settings</NavLink>
                                <NavLink to="/logout" className="block px-4 py-2 text-sm text-gray-700" tabIndex={-1} role="menuitem" id="user-menu-item-2">Sign out</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sm:hidden" id="mobile-menu">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    <NavLink to="/" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">Dashboard</NavLink>
                    <NavLink to="/" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Task</NavLink>
                    <NavLink to="/category" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Category</NavLink>
                    <NavLink to="/" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Tag</NavLink>
                </div>
            </div>
        </nav>
    );
}

export default Header;
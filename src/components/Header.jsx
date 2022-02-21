import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/auth';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';


/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { PlusCircleIcon, MenuIcon, XIcon } from '@heroicons/react/outline'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Header = () => {
    const navigation = [
        { name: 'Басты бет', href: '/', current: true, target: false },
        { name: 'Ресми сайт', href: 'https://okmpu.kz/kk', current: false, target: true },
        { name: 'Жаңалықтар', href: 'https://okmpu.kz/kk/news', current: false, target: true },
        { name: 'Біз жайлы', href: 'https://okmpu.kz/kk/node/1503', current: false, target: true },
        { name: 'Хабарландыру', href: 'https://okmpu.kz/kk/ads', current: false, target: true },
    ]
    const { t } = useTranslation();


    const router = useRouter();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user)

    const logoutHandler = () => {
        if(dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(logout())
        }
    }

  return (
    <Disclosure as="nav" className="bg-gray-800 sticky w-full top-0 z-50">
        {({ open }) => (
        <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    {isAuthenticated &&
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            {open ? (
                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </Disclosure.Button>
                    </div>}
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/"><a style={{width: "120px"}}><Image src="/logo.png" width={1092} height={211} alt=""/></a></Link>
                        </div>
                        {isAuthenticated && 
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                            {navigation.map((item, i) => (
                                <Link href={item.href} key={i}>
                                    <a
                                        className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'px-3 py-2 rounded-md text-sm font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                        target={item.target ? "_blank" : "_self"}
                                        rel="noopener noreferrer"
                                    >
                                        {item.name}
                                    </a>
                                </Link>

                            ))}
                            </div>
                        </div>}
                    </div>
                    {isAuthenticated &&
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {user !== null && user.status === 'Оқытушы' &&
                        <button
                            onClick={() => router.push('/article')}
                            type="button"
                            className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                            <span className="sr-only">View notifications</span>
                            <PlusCircleIcon className="h-6 w-6" aria-hidden="true" />
                        </button>}

                        <div className="user-status text-gray-300 text-xs pl-5"><i className="fas fa-circle"></i> {user !== null && user.status}</div>

                        {/* Profile dropdown */}
                        <Menu as="div" className="ml-3 relative">
                            <div>
                                <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                <span className="sr-only">Open user menu</span>
                                <div className="h-8 w-8 rounded-full">
                                    <Image
                                        src="data:image/png;base64,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"
                                        width={64}
                                        height={64}
                                        alt=""
                                    />
                                </div>
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                <Menu.Item>
                                    {({ active }) => (
                                    <Link href={user !== null ? `/profile/${encodeURIComponent(user.username)}`: "/"}>
                                        <a className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                        >Профиль</a>
                                    </Link>
                                    
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                    <Link
                                        href="http://univer.okmpu.kz/user/login?ReturnUrl=%2f"
                                    >
                                        <a className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>UNIVER 2.0</a>
                                    </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                    <span onClick={logoutHandler} className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>{t("common:header.logout-title")}</span>
                                    )}
                                </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>}
                </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {navigation.map((item, i) => (
                    <Disclosure.Button
                        key={i}
                        as="a"
                        target={item.target ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        href={item.href}
                        className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                    >
                        {item.name}
                    </Disclosure.Button>
                    ))}
                </div>
            </Disclosure.Panel>
        </>
        )}
    </Disclosure>
    )
}

export default Header;

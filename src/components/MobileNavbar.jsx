import { XIcon } from '@heroicons/react/outline';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const subCategories = [
    { name: 'Басты бет', href: '/' },
    { name: 'Ғылыми бағыт', href: '/direction/innovation' },
    { name: 'Тәрбие және рухани жаңғыру', href: '/direction/edu' },
    { name: 'Академиялық бағыт', href: '/direction/academy' },
    { name: 'Кафедра үшін', href: '/direction/cafedra' },
]


const MobileNavbar = ({mobileFiltersOpen, setMobileFiltersOpen}) => {
    const user = useSelector(state => state.auth.user);

    return (
        <Fragment>
            {/* Диалоговое окно мобильного фильтра */}
            <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" style={{marginTop: "64px"}} onClose={setMobileFiltersOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                            <div className="px-4 flex items-center justify-between">
                                <h2 className="text-lg font-medium text-gray-900">Меню</h2>
                                <button
                                type="button"
                                className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                                onClick={() => setMobileFiltersOpen(false)}
                                >
                                <span className="sr-only">Мәзірді жабу</span>
                                <XIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>

                            {/* Filters */}
                            <form className="mt-4 border-t border-gray-200">
                                <h3 className="sr-only">Категориялар</h3>
                                <ul role="list" className="font-medium text-gray-900 px-2 py-3">
                                    {subCategories.map((category, i) => (
                                        <li key={i}>
                                            <Link href={category.href}>
                                                <a className="block px-2 py-3">{category.name}</a>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                                <div className="border-b border-gray-200 py-6">
                                    {user !== null && user.status === "Oқытушы" ?
                                        null
                                    : user.status === "Кафедра" ?
                                        <Link href="/user/teachers">
                                            <a className="block text-sm font-medium text-gray-900 space-y-4 pb-6">Оқытушылар</a>
                                        </Link>
                                    : user.status === "Деканат" ?
                                        <>
                                            <Link href="/user/cafedra">
                                                <a className="block text-sm font-medium text-gray-900 space-y-4 pb-3">Кафедра</a>
                                            </Link>
                                            <Link href="/user/teachers">
                                                <a className="block text-sm font-medium text-gray-900 space-y-4 pb-3">Оқытушылар</a>
                                            </Link>
                                        </>
                                    : user.status === "Ректорат" ?
                                        <>
                                            <Link href="/user/decanat">
                                                <a className="block text-sm font-medium text-gray-900 space-y-4 pb-3">Деканат</a>
                                            </Link>
                                            <Link href="/user/cafedra">
                                                <a className="block text-sm font-medium text-gray-900 space-y-4 pb-3">Кафедра</a>
                                            </Link>
                                            <Link href="/user/teachers">
                                                <a className="block text-sm font-medium text-gray-900 space-y-4 pb-3">Оқытушылар</a>
                                            </Link>
                                        </>
                                    : null}
                                </div>
                            </form>
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition.Root>
        </Fragment>
    )
}

export default MobileNavbar;
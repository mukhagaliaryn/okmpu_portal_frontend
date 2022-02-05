import Layout from "../layout"
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, FilterIcon } from '@heroicons/react/solid'
import MobileNavbar from "../components/MobileNavbar";
import Navbar from "../components/Navbar";

const sortOptions = [
    { name: 'Атауы', href: '#', current: true },
    { name: 'Бағыты', href: '#', current: false },
    { name: 'Статус', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const MainLayout = ({children}) => {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const router = useRouter();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user);


    if(typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/accounts/login')
    }

    return (
        <Layout>
            {isAuthenticated && (user !== null && user.status !=="Студент") ?
            <div className="bg-white">
                <div>
                    <MobileNavbar mobileFiltersOpen={mobileFiltersOpen} setMobileFiltersOpen={setMobileFiltersOpen} />

                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="relative z-10 flex items-baseline justify-between pt-0 pb-6 border-b border-gray-200">
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Интикативтік жоспарлар</h1>

                            <div className="flex items-center">
                                <Menu as="div" className="relative inline-block text-left">
                                    <div>
                                        <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                            Сорттау
                                            <ChevronDownIcon
                                                className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
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
                                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="py-1">
                                                {sortOptions.map((option, i) => (
                                                <Menu.Item key={i}>
                                                    {({ active }) => (
                                                    <a
                                                        href={option.href}
                                                        className={classNames(
                                                        option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                        active ? 'bg-gray-100' : '',
                                                        'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        {option.name}
                                                    </a>
                                                    )}
                                                </Menu.Item>
                                                ))}
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>

                                <button
                                    type="button"
                                    className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                                    onClick={() => setMobileFiltersOpen(true)}
                                >
                                    <span className="sr-only">Filters</span>
                                    <FilterIcon className="w-5 h-5" aria-hidden="true" />
                                </button>
                            </div>
                        </div>

                        <section aria-labelledby="products-heading" className="pt-6 pb-24">
                            <h2 id="products-heading" className="sr-only">Products</h2>

                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                                <Navbar />

                                {/* Product grid */}
                                <div className="lg:col-span-3">
                                    {children}
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>: <h1 className="text-center text-xl">Администрациялық бөлімге жүгініңіз!</h1>}
        </Layout>
    )
}

export default MainLayout;
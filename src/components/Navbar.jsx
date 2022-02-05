import Link from "next/link"
import { useRouter } from 'next/router';
import { useSelector } from "react-redux";
import CafedraPanel from "./statues/for_cafedra";
import DecanatPanel from "./statues/for_decanat";
import ReactorPanel from "./statues/for_reactor";

const subCategories = [
    { name: 'Басты бет', href: '/' },
    { name: 'Ғылыми бағыт', href: '/direction/innovation' },
    { name: 'Тәрбие және рухани жаңғыру', href: '/direction/edu' },
    { name: 'Академиялық бағыт', href: '/direction/academy' },
    { name: 'Кафедра үшін', href: '/direction/cafedra' },
]


const Navbar = () => {
    const router = useRouter();
    const user = useSelector(state => state.auth.user);

    return (
        <form className="hidden lg:block">
            <h3 className="sr-only">Categories</h3>
            <ul role="list" className="text-sm font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200">
                {subCategories.map((category, i) => (
                <li key={i} className={router.pathname == category.href ? "font-bold" : ""}>
                    <Link href={category.href}><a>{category.name}</a></Link>
                </li>
                ))}
            </ul>

            {user !== null && user.status === "Oқытушы" ?
                null
            : user.status === "Кафедра" ?
                <CafedraPanel />
            : user.status === "Деканат" ?
                <DecanatPanel />
            : user.status === "Ректорат" ?
                <ReactorPanel />
            : null}
        </form>
    )
}

export default Navbar
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/auth';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';


const Header = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user)
    const { t } = useTranslation();

    const logoutHandler = () => {
        if(dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(logout())
        }
    }

    return (
        <div className="header">
            <div className="intro-header">
                <div className="logo">
                    <Link href="/">
                        <a><Image src="/logo.jpg" width={228} height={100}/></a>
                    </Link>
                </div>

                <div className="auth-user">
                    <Link href={user !== null ? `/profile/${encodeURIComponent(user.username)}`: "/"}>
                        <a className="user">
                            <i className="fas fa-user"></i>
                            <span>{user !== null && user.username}</span>
                        </a>
                    </Link>
                    <span className="logout" onClick={logoutHandler} title={t("common:header.logout-title")}>
                        <i className="fas fa-sign-out-alt"></i>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Header;
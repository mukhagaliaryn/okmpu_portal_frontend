import Head from 'next/head'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { check_auth_status } from './actions/auth';
import Header from './components/Header';

const Layout = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (dispatch && dispatch !== null && dispatch !== undefined)
            dispatch(check_auth_status());

    }, [dispatch]);

    return (
        <React.Fragment>
            <Head>
                <title>{props.title}</title>
                <meta name="description" content={props.content} />
                <link rel="icon" href="https://okmpu.kz/sites/default/files/logo211.png" />
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.13.1/css/all.css" integrity="sha384-xxzQGERXS00kBmZW/6qxqJPyxW3UR0BPsL4c8ILaIWXva5kFi7TxkIIaMiKtqV1Q" crossOrigin="anonymous" />
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
            </Head>
            
            <div id="root">
                <Header />
                <div className='main-wrapper'>
                    {props.children}
                </div>
                
                <nav className="i18next">
                    {router.locales.map(locale => (
                        <Link href={router.asPath} locale={locale} key={locale}>
                            <a>
                                {locale === "kz" ? "Қазашқа" : locale === "ru" ? "Русский" : null}
                            </a>
                        </Link>
                    ))}
                </nav>
            </div>

        </React.Fragment>
  )
}

Layout.defaultProps = {
    title: "Есеп порталы | OKMPU",
    content: "Оңтүстік Қазақстан Мемлекеттік Педагогикалық Университетінің құрылымы бойынша интикативтік жоспарларға есеп беру порталы"
}


export default Layout
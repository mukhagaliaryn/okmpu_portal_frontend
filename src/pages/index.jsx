import MainLayout from "./mainLayout"
import ArticleList from "../components/ArticleLists";
import { BACKEND_URL } from "../actions/types";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Fragment } from "react";


const Main = ({articles, access}) => {
    const router = useRouter();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    if(typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/accounts/login')
    }

    return (
        <Fragment>
            {isAuthenticated &&
            <MainLayout>
                <ArticleList articles={articles} access={access} />
            </MainLayout>}
        </Fragment>
    )
}

export async function getServerSideProps(context) {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${context.req.cookies.access}`
        }
    }
    const res = await fetch(`${BACKEND_URL}/`, context.req.cookies.access && config)
    const data = await res.json();
    const articles = data.articles || null;

    return {
        props: {
            articles,
            access: context.req.cookies.access || false
        }
    }
}

export default Main;

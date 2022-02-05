import MainLayout from "./mainLayout"
import ArticleList from "../components/ArticleLists";


import { BACKEND_URL } from "../actions/types";

const Index = ({articles, access}) => {
    return (
        <MainLayout>
            <ArticleList articles={articles} access={access} />
        </MainLayout>
    )
}

export async function getServerSideProps(context) {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${context.req.cookies.access}`
        }
    }
    
    const res = await fetch(`${BACKEND_URL}`, context.req.cookies.access && config)
    const data = await res.json();
    const articles = data.articles || [];

    return {
        props: {
            articles,
            access: context.req.cookies.access || null
        }
    }
}

export default Index;

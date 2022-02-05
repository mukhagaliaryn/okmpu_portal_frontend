import MainLayout from "./mainLayout"
import ArticleList from "../components/ArticleLists";
import { BACKEND_URL } from "../actions/types";



const Main = ({articles, access}) => {
    return (
        <MainLayout>
            <ArticleList articles={articles} access={access} />
        </MainLayout>
    )
}

export async function getServerSideProps(context) {
    const access = context.req.cookies.access ?? false
    if (!access) {
        return {
            props: {
                articles: null,
                access: null
            },
        }
    }
    
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${access}`
        }
    }
    
    const res = await fetch(`${BACKEND_URL}/`, access && config)
    const data = await res.json();
    const articles = data.articles;

    return {
        props: {
            articles,
            access
        }
    }
}

export default Main;

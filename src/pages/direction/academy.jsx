import { BACKEND_URL } from "../../actions/types";
import ArticleList from "../../components/ArticleLists";
import MainLayout from "../mainLayout"


const Academy = ({articles, access}) => {
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
    
    const res = await fetch(`${BACKEND_URL}/academy/`, context.req.cookies.access && config)
    const data = await res.json();
    const articles = data.articles || [];

    return {
        props: {
            articles,
            access: context.req.cookies.access
        }
    }
}

export default Academy;
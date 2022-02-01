import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Layout from "../layout"

const Index = () => {
    const router = useRouter();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    if(typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/accounts/login')
    }

    return (
        <Layout>
            <div className="main">
                <h1 className="text-center mt-20 text-4xl font-bold">Main page</h1>
            </div>
        </Layout>
    )
}

export default Index;

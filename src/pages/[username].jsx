import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { BACKEND_URL } from '../actions/types';
import ArticleList from '../components/ArticleLists';
import Profile from '../components/Profile';
import MainLayout from './mainLayout';


const UserPage = ({profile, articles, academy_count, inn_count, edu_count, access}) => {
    const router = useRouter();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    
    if(typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/accounts/login')
    }

    return (
        <MainLayout title={profile.user.full_name}>
            {isAuthenticated &&
                <React.Fragment>
                    <Profile profile={profile} academy_count={academy_count} inn_count={inn_count} edu_count={edu_count} />
                    
                    <ArticleList articles={articles} access={access} />
                </React.Fragment>
            }
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
    const res = await fetch(`${BACKEND_URL}/${context.params.username}`, context.req.cookies.access && config)
    const data = await res.json();
    const profile = data.profile || null;
    const articles = data.articles || null;
    const academy_count = data.academy_count;
    const edu_count = data.edu_count;
    const inn_count = data.inn_count;

    return {
        props: {
            profile,
            articles,
            academy_count,
            edu_count,
            inn_count,
            access: context.req.cookies.access || false
        }
    }
}


export default UserPage;
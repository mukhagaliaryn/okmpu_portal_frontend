import React, { useEffect } from 'react';
import Layout from '../../layout';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router'
import { check_auth_status, login } from '../../actions/auth';
import useTranslation from 'next-translate/useTranslation'

import { LockClosedIcon } from '@heroicons/react/solid'
import Loader from '../../components/Loader';

const Login = () => {
    const router = useRouter()
    const loading = useSelector(state => state.auth.loading);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        if (dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(login(data.username, data.password));
        }
    };


    useEffect(() => {
        if (dispatch && dispatch !== null && dispatch !== undefined)
            dispatch(check_auth_status());

    }, [dispatch]);


    if (typeof window !== "undefined" && isAuthenticated)
        router.push(localStorage.getItem("currentPage"));

    return (
        <Layout title="Авторизация | OKMPU" content="Авторизация">
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <div className="text-center ml-auto mr-auto w-200">
                            <Image
                                className="mx-auto h-12 w-auto"
                                src="/logo_black.png"
                                width={300}
                                height={56}
                                alt="Workflow"
                            />
                        </div>
                        <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">{t("common:accounts.login.h4")}</h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                            <label htmlFor="username" className="sr-only">
                                {t("common:accounts.login.form.username.label")}
                            </label>
                            <input
                                {...register("username")}
                                id="username"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder={t("common:accounts.login.form.username.placeholder")} 
                                minLength={3} 
                                maxLength={32}
                            />
                            </div>
                            <div>
                            <label htmlFor="password" className="sr-only">
                                {t("common:accounts.login.form.password.label")}
                            </label>
                            <input
                                {...register("password")}
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder={t("common:accounts.login.form.password.placeholder")}
                            />
                            </div>
                        </div>
                        {loading ? <Loader />:
                        <div>
                            <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                            </span>
                            Кіру
                            </button>
                        </div>}
                        <div className='mt-30 text-center'>
                            <Link href="/accounts/register"><a className="text-current text-sm">Регистрация</a></Link>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Login;
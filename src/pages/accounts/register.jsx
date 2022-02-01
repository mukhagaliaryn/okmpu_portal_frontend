import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Loader from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { check_auth_status } from '../../actions/auth';
import { signup } from '../../actions/auth';

import { useForm } from "react-hook-form";
import { BACKEND_URL } from '../../actions/types';
import Layout from '../../layout';
import useTranslation from 'next-translate/useTranslation'

import { LockClosedIcon } from '@heroicons/react/solid'

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import styled from 'styled-components';


const Error = styled.div`
    text-align: center;
    font-size: 12px;
    margin-bottom: 5px;
    color: rgb(221, 46, 33);
`;


const Register = () => {
    const [emailList, setEmailList] = useState([])
    const [userList, setUserList] = useState([])
    const { t } = useTranslation();

    const schema = yup.object().shape({
        username: yup.string()
        .notOneOf(userList, 'Имя такое же пользователь уже существует')
        .min(3, "Минимум 3 символа")
        .max(32, "Максимум 32 символов")
        .matches(
            /^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/, 
            "Введите правильные имя пользователя")
        .required('Требуется имя пользователя'),
        email: yup.string()
            .email('Электронная почта должна быть действительной')
            .notOneOf(emailList, 'Электронная почта уже существует')
            .required('Электронная почта требуется')
            .max(32, "Максимум 32 символов"),
        profile_name: yup.string()
            .required('Имя требуется')
            .max(32, "Максимум 32 символов"),
        phone: yup.string()
            .required('Телефон требуется'),
        password: yup.string()
            .required('Необходим пароль')
            .min(8, 'Пароль должен состоять из 8 или более символов')
            .matches(
                /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                "Пароль должен состоять не менее чем из 8 символов, одного верхнего регистра, одной цифры и одного символа специального регистра."
            ),
        re_password: yup.string()
            .required('Необходим подтверждение пароль')
            .min(8).oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
    });

    useEffect(() => {
        let cleanupFunction = false;
        const fetchData = async () => {
            try {
                const res = await fetch(`${BACKEND_URL}/accounts/users/`, {
                    headers: {'Content-Type': 'application/json'}  
                })
                const data = await res.json()
                data.map(user => {
                    setEmailList(emailList => [...emailList, user.email])
                    setUserList(userList => [...userList, user.username])
                })
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
        return () => cleanupFunction = true;
    }, [])

    const router = useRouter()
    const loading = useSelector(state => state.auth.loading);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch()
    const register_success = useSelector(state => state.auth.register_success);
    const { register, formState:{ errors }, handleSubmit } = useForm({ resolver: yupResolver(schema) });

    const [phone, setPhone] = useState('');

    

    const phoneChange = (e) => {
        const x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        setPhone(!x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : ''))
    }

    const onSubmit = (data) => {
        if (dispatch && dispatch !== null && dispatch !== undefined)
            dispatch(signup(data.username, data.email, data.full_name, data.phone, data.password, data.re_password));
    };


    useEffect(() => {
        if (dispatch && dispatch !== null && dispatch !== undefined)
            dispatch(check_auth_status());

    }, [dispatch]);

    if (typeof window !== "undefined" && isAuthenticated)
        router.push("/");


    if (register_success)
        router.push('/accounts/login');

    return (
        <Layout title="Регистрация | OKMPU" content="Регистрация">
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
                        <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">{t("common:accounts.register.h4")}</h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="username" className="sr-only">
                                    {t("common:accounts.register.form.username.label")}
                                </label>
                                <input
                                    {...register("username")}
                                    id="username"
                                    type="text"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder={t("common:accounts.register.form.username.placeholder")} 
                                    minLength={3} 
                                    maxLength={32}
                                />
                                {errors["username"] ? <Error>{errors["username"].message}</Error>: null}
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">
                                    {t("common:accounts.register.form.email.label")}
                                </label>
                                <input
                                    {...register("email")}
                                    id="email"
                                    type="email"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder={t("common:accounts.register.form.email.placeholder")} 
                                
                                />
                                {errors["email"] ? <Error>{errors["email"].message}</Error>: null}
                            </div>
                            <div>
                                <label htmlFor="full_name" className="sr-only">
                                    {t("common:accounts.register.form.profile_name.label")}
                                </label>
                                <input
                                    {...register("full_name")}
                                    id="full_name"
                                    type="text"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder={t("common:accounts.register.form.profile_name.placeholder")} 
                                    maxLength={64}
                                />
                                {errors["full_name"] ? <Error>{errors["full_name"].message}</Error>: null}
                            </div>
                            <div>
                                <label htmlFor="phone" className="sr-only">
                                    {t("common:accounts.register.form.phone.label")}
                                </label>
                                <input
                                    {...register("phone")}
                                    id="phone"
                                    value={phone} 
                                    onChange={e => phoneChange(e)}
                                    placeholder="+7 (XXX) XXX-XXXX"
                                    type="text"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                />
                                {errors["phone"] ? <Error>{errors["phone"].message}</Error>: null}
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    {t("common:accounts.register.form.password.label")}
                                </label>
                                <input
                                    {...register("password")}
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder={t("common:accounts.register.form.password.placeholder")}
                                />
                                {errors["password"] ? <Error>{errors["password"].message}</Error>: null}
                            </div>
                            <div>
                                <label htmlFor="re_password" className="sr-only">
                                    {t("common:accounts.register.form.password.label")}
                                </label>
                                <input
                                    {...register("re_password")}
                                    id="re_password"
                                    type="password"
                                    autoComplete="current-password"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder={t("common:accounts.register.form.re_password.placeholder")}
                                />
                                {errors["re_password"] ? <Error>{errors["re_password"].message}</Error>: null}
                            </div>
                        </div>
                        {loading ? <Loader /> :
                        <div>
                            <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                            </span>
                                {t("common:accounts.register.form.submit")}
                            </button>
                        </div>}
                        <div className='mt-30 text-center'>
                            <Link href="/accounts/login"><a className="text-current text-sm">{t("common:accounts.enter")}</a></Link>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}


export default Register;
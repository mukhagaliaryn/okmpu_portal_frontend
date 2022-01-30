import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Loader from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { check_auth_status } from '../../actions/auth';
import { signup } from '../../actions/auth';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { BACKEND_URL } from '../../actions/types';
import Layout from '../../layout';
import useTranslation from 'next-translate/useTranslation'


const Register = () => {
    const [emailList, setEmailList] = useState([])
    const [userList, setUserList] = useState([])
    const { t } = useTranslation();

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
        full_name: yup.string()
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
        <React.Fragment>
            <Layout title="Регистрация | OKMPU" content="Регистрация">
                <div className="accounts-container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h4>{t("common:accounts.register.h4")}</h4>
                        <div className="form-group">
                            <label htmlFor="">{t("common:accounts.register.form.username.label")}</label>
                            <input type="text" className={errors["username"] && "warning"} {...register("username")} placeholder={t("common:accounts.register.form.username.placeholder")} />
                            {errors["username"] ? <p>{errors["username"].message}</p>: null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="">{t("common:accounts.register.form.email.label")}</label>
                            <input type="email" className={errors["email"] && "warning"} {...register("email")} placeholder={t("common:accounts.register.form.email.placeholder")} />
                            {errors["email"] ? <p>{errors["email"].message}</p>: null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="">{t("common:accounts.register.form.profile_name.label")}</label>
                            <input type="text" className={errors["full_name"] && "warning"} {...register("full_name")} placeholder={t("common:accounts.register.form.profile_name.placeholder")} />
                            {errors["full_name"] ? <p>{errors["full_name"].message}</p>: null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="">{t("common:accounts.register.form.phone.label")}</label>
                            <input type="tel" id="phone" className={errors["phone"] && "warning"} {...register("phone")} value={phone} onChange={e => phoneChange(e)}  placeholder="+7 (XXX) XXX-XXXX" />
                            {errors["phone"] ? <p>{errors["phone"].message}</p>: null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="">{t("common:accounts.register.form.password.label")}</label>
                            <input type="password" className={errors["password"] && "warning"} {...register("password")} placeholder={t("common:accounts.register.form.password.placeholder")} minLength="8"/>
                            {errors["password"] ? <p>{errors["password"].message}</p>: null}
                            <small>{t("common:accounts.register.form.password.labels.first")}</small>
                            <small>{t("common:accounts.register.form.password.labels.second")}</small>
                            <small>{t("common:accounts.register.form.password.labels.third")}</small>
                            <small>{t("common:accounts.register.form.password.labels.fourth")}</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">{t("common:accounts.register.form.re_password.label")}</label>
                            <input type="password" className={errors["re_password"] && "warning"} {...register("re_password")} placeholder={t("common:accounts.register.form.re_password.placeholder")} minLength="8"/>
                            {errors["re_password"] ? <p>{errors["re_password"].message}</p>: null}
                        </div>
                        <div className="submit">
                            <span></span>
                            {loading ? <Loader />: <input type="submit" value={t("common:accounts.register.form.submit")} />}
                        </div>
                    </form>
                    <div className="register-block">
                        <h4>{t("common:accounts.is_accounts")}</h4>
                        <Link href="/accounts/login">
                            <a>{t("common:accounts.enter")}</a>
                        </Link>
                    </div>
                </div>
            </Layout>
        </React.Fragment>
    )
}


export default Register;
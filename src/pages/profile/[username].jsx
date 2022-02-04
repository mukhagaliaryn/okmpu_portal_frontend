import { PaperClipIcon } from '@heroicons/react/solid'
import Layout from '../../layout';
import { BACKEND_URL } from '../../actions/types';


const Profile = ({profile}) => {
    return (
        <Layout
            title={profile !== null && `${profile.user.username} | Профиль`}
            content="Профиль беті"
            header={profile !== null && profile.user.full_name}
        >
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                <h3 className="text-3xl font-extrabold tracking-tight text-gray-900">{profile.user.full_name} туралы ақпарат</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Жеке мәліметтер.</p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">ID есімі</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">@{profile.user.username}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Толық аты</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profile.user.full_name}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Мамандығы</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profile.user.status}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Email поштасы</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profile.user.email}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Туылған күні</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profile.user.birthday}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Жынысы</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profile.user.gender}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Телефон</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profile.user.phone}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Өзі жайлы</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profile.bio}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Тіркемелер</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <ul role="list" className="border border-gray-200 rounded-md divide-y divide-gray-200">
                                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                    <div className="w-0 flex-1 flex items-center">
                                    <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    <span className="ml-2 flex-1 w-0 truncate">resume_teacher.pdf</span>
                                    </div>
                                    <div className="ml-4 flex-shrink-0">
                                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Жүктеу
                                    </a>
                                    </div>
                                </li>
                                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                    <div className="w-0 flex-1 flex items-center">
                                    <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    <span className="ml-2 flex-1 w-0 truncate">coverletter_back_end_teacher.pdf</span>
                                    </div>
                                    <div className="ml-4 flex-shrink-0">
                                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Жүктеу
                                    </a>
                                    </div>
                                </li>
                                </ul>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const access = context.req.cookies.access ?? false
    if (!access) {
        return {
            props: {
                profile: null,
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
    const response = await fetch(`${BACKEND_URL}/profile/${context.params.username}/`, access && config)
    
    const data = await response.json();
    const profile = data.profile;

    return {
        props: {
            profile,
            access
        },
    }
}

export default Profile;

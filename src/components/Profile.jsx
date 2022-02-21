import { useRouter } from 'next/router';
import React from 'react';

const Profile = ({profile, inn_count, academy_count, edu_count}) => {
    const router = useRouter()
    return (
        <div onClick={() => router.push(`/profile/${profile.user.username}`)} className="cursor-pointer flex justify-between bg-white divide-y divide-gray-200 p-4 mb-4 border-y border-x rounded-lg">
            <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full" src={profile.avatar ? profile.avatar : "/avatar.png"} alt={profile.avatar} />
                </div>
                <div className="ml-4">
                    <div className="text-sm font-bold text-gray-900">{profile.user.full_name}</div>
                    <div className="text-xs text-gray-500">{profile.user.status}</div>
                </div>
            </div>
            <div className='border-none text-center'>
                <h1 className='text-xl font-bold'>{academy_count}</h1>
                <small className='text-sm text-gray-500'>Академиялық бағыт</small>
            </div>
            <div className='border-none text-center'> 
                <h1 className='text-xl font-bold'>{inn_count}</h1>
                <small className='text-sm text-gray-500'>Ғылыми бағыт</small>
            </div>
            <div className='border-none text-center'>
                <h1 className='text-xl font-bold'>{edu_count}</h1>
                <small className='text-sm text-gray-500'>Тәрбие және рухани жаңғыру</small>
            </div>
        </div>
    )
}

export default Profile;
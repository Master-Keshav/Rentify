'use client'

import { useRouter } from 'next/navigation';

const NotFound = () => {
    const router = useRouter();
    router.push('/404')
    return null;
};

export default NotFound;
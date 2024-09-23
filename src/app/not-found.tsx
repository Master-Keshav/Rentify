'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const NotFound = () => {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/404');
        });

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <> </>
    );
};

export default NotFound;

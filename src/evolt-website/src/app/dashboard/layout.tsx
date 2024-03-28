import Navbar from '@/components/navbar';
import React from 'react';

const Layout = ({children}:any) => {
    return(
        <div className='relative font-montserrat min-h-[150vh] bg-slate-200'>
            <div className="container sticky top-0 w-full z-20">
                <Navbar />
            </div>
            <div className='container mx-auto'>
                {children}
            </div>
        </div>
    )
}

export default Layout;

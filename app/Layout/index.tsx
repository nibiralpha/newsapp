import React from 'react';
import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';

interface Props {
    children: React.ReactNode
}

const Layout = (props: Props) => {
    const { children } = props
    return (
        <>
            <div>
                <Header />
                <div className='container'>
                    <main>{children}</main>
                </div>
                <Footer />
            </div>

        </>
    )
}

export default Layout;

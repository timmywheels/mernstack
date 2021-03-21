import React, { Fragment, useContext } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import NotificationContext from '../context/NotificationContext';
import Notification from '../components/common/Notification';

const AppLayout: ({ children }: { children: any }) => any = ({ children }) => {
    const { state: notification } = useContext(NotificationContext);
    return (
        <Fragment>
            <Header />
            <div className='mx-auto'>{children}</div>
            <Footer />
            <Notification display={notification.display} title={notification.title} message={notification.message}
                          type={notification.success}/>
        </Fragment>
    );
};

export default AppLayout;
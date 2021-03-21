import React, { Fragment } from 'react';
import Logo from "../../assets/img/logo.svg";

const Footer = () => {
    return (
        <div className="bg-white">
            <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="xl:col-span-1">
                        <img className="h-10" src={Logo} alt="MERNSTACK"/>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-200 pt-8">
                    <p className="text-base leading-6 text-gray-400 xl:text-center">
                        {`© ${new Date().getFullYear()} MERNSTACK | All Rights Reserved.`}
                    </p>
                </div>
            </div>
        </div>
    )
};

export default Footer;
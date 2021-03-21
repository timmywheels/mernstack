import React, {Fragment} from "react";
import PulseLoader from "./PulseLoader";

const Loader = ({ loading }: { loading: boolean }) => {
    return (
        <Fragment>
           <div className={`${loading ? "opacity-100 object-cover w-full h-full fixed block top-0 left-0 bg-white z-50 absolute" : "opacity-0 hidden"} transition-opacity duration-100 ease-in-out`}>
                <div className="profile-main-loader">
                    <div className="loader">
                        <PulseLoader />
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default Loader;

import React, {Fragment} from 'react';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import {ChevronRight} from "heroicons-react";
import {Link} from "react-router-dom";

const routes = [];

const Breadcrumbs: any = ({breadcrumbs}) => {
    return (
        <div>
            <div className={"inline-flex"}>
                {breadcrumbs.map(({match, breadcrumb, key}, i) => {
                    if (i === breadcrumbs.length - 1) {
                        return (
                            <div key={key} style={{lineHeight: "0.9rem"}}>
                                <Link to={key}>
                                    <div key={key} className={"flex text-xs inline-flex text-white"}>{breadcrumb}</div>
                                </Link>
                            </div>
                        )
                    }
                    return (
                        <Fragment key={key}>
                            <div key={key} style={{lineHeight: "0.9rem"}} className={"align-middle inline-block flex"}>
                                <Link to={key}>
                                    <div className={"flex text-xs inline-flex text-white opacity-75"}>{breadcrumb}</div>
                                </Link>
                                <ChevronRight key={key} height={"1.75rem"} width={"1.1rem"}
                                              className={"inline-block flex text-white opacity-75"}/>
                            </div>

                        </Fragment>
                    )
                })}
            </div>
            <div className={"my-5"}>
                <h1 className={"text-3xl font-medium text-white"}>
                    {breadcrumbs[breadcrumbs.length - 1].breadcrumb.props.children}
                </h1>
            </div>
        </div>
    )
};

export default withBreadcrumbs(routes)(Breadcrumbs);

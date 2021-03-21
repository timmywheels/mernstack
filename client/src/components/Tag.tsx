import React, { Fragment } from 'react';

const Tag = ({ text, color='orange' }) => {
    return (
        <Fragment>
            <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-${color}-100 text-${color}-800`}>
              {text}
            </span>
        </Fragment>
    )
};

export default Tag;

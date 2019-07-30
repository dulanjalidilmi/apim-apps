/*
 * Copyright (c) 2019, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { useState, useEffect } from 'react';
import qs from 'qs';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ResourceNotFound from '../Base/Errors/ResourceNotFound';
import API from '../../data/api';
import ApiThumb from '../Apis/Listing/ApiThumb';

/**
 *
 *
 * @param {*} theme
 */
const styles = theme => ({
    tagedApisWrapper: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

function ApisWithTag(props) {
    const [apis, setApis] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const { tag, classes } = props;
    useEffect(() => {
        const restApi = new API();
        const promised_apis = restApi.getAllAPIs({ query: 'tag:' + tag });
        promised_apis
            .then((response) => {
                setApis(response.obj);
            })
            .catch((error) => {
                const status = error.status;
                if (status === 404) {
                    setNotFound(true);
                }
            });
    }, []);

    /**
     *
     *
     * @returns
     * @memberof Listing
     */
    if (notFound) {
        return <ResourceNotFound />;
    } else {
        return (
            apis && (
                <div className={classes.tagedApisWrapper}>
                    {apis.list.map(api => (
                        <ApiThumb api={api} key={api.id} />
                    ))}
                </div>
            )
        );
    }
}

ApisWithTag.propTypes = {
    classes: PropTypes.object.isRequired,
    tag: PropTypes.object.isRequired,
};
export default withStyles(styles)(ApisWithTag);

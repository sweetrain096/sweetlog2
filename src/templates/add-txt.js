// @flow
import React from 'react';
import Layout from '../components/Layout';
import Ads from '../../static/ads.txt';

export default () => {
    return (
        <Layout>
            <pre>{Ads}</pre>
        </Layout>
    )
}
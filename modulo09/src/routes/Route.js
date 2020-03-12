import React from 'react';

import PropTypes from 'prop-types';

import { Route as ReactRouterRoute, Redirect } from 'react-router-dom';

import AuthLayout from '~/layouts/auth';
import DefaultLayout from '~/layouts/default';

import { store } from '~/store';
// import { Container } from './styles';

export default function Route({ component: Component, isPrivate, ...rest }) {
    const { signed } = store.getState().auth;

    if (!signed && isPrivate) {
        return <Redirect to="/" />;
    }

    if (signed && !isPrivate) {
        return <Redirect to="/dashboard" />;
    }

    const Layout = signed ? DefaultLayout : AuthLayout;

    return (
        <ReactRouterRoute
            {...rest}
            render={(props) => (
                <Layout>
                    <Component {...props} />
                </Layout>
            )}
        />
    );
}

Route.propTypes = {
    isPrivate: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
        .isRequired,
};

Route.defaultProps = {
    isPrivate: false,
};

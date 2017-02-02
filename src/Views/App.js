import React, { Component } from 'react';

import Error from './Error';
import Head from './Head';
import Loading from './Loading';
import Main from './Main';
import News from './News';
import Login from './Login';

class App extends Component {
    isLoading = true;
    constructor(args) {
        super(args);
        this.props.route.store.subscribe(this, ['session', 'error'], "App");
        if (this.props.route.store.getState().session === undefined)
        {
            this.props.route.store.auth.getSession()
                .then(() => {
                    this.session = this.props.route.store.getState().session;
                    this.isLoading = false;
                    this.mounted ? this.forceUpdate(): void(0);
                    if (this.session) {
                        this.props.route.store.friends.friends();
                        this.props.route.store.connection.open(true);
                    }
                });
        } else {
            this.session = this.props.route.store.getState().session;
        }
    }
    getChildren() {
        const {store} = this.props.route;
        const {params, route, router} = this.props;
        const autorized = this.props.router.routes[this.props.router.routes.length - 1].autorized;
        if (this.isLoading)
            return <Loading />;
        if (autorized && !store.getState().session)
            return <Login params={params} route={route} router={router} store={store}/>;
        if (this.props.children)
            return React.cloneElement(this.props.children, {
                params:params, route:route, router:router, store:store
            });
        return <News params={params} route={route} router={router} store={store} />;
    }
    render() {
        var autorized = this.props.router.routes[this.props.router.routes.length - 1].autorized;
        var usuario = this.props.route.store.getState().usuario || {};
        var session = this.props.route.store.getState().session;
        var error = this.props.route.store.getState().error || '';
        var isLogged = autorized && this.props.route.store.getState().session;
        var { user } = this.props.params;

        if (user && isLogged && usuario.usuario !== user && session.usuario !== user) {
            this.isLoading = true;
            this.props.route.store.friends.getUser(user)
                .then((data) => {
                    this.isLoading = false;
                    this.mounted ? this.forceUpdate(): void(0);
                });
        }

        let children = this.getChildren();
        var params = this.props.params;
        var store  = this.props.route.store;
        var route  = this.props.route;
        var router = this.props.router;
        return (
            <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                <Head params={params} route={route} router={router} store={store} />
                {<Error error={error} store={store} />}
                <Main params={params} route={route} router={router} store={store}>
                    {children}
                </Main>
            </div>
        );
    }
}

export default App;
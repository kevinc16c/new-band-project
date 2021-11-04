import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import loadable from 'react-loadable';
import LoadingComponent from '../components/Loading';
import './styles.scss';

let AsyncAppLayout = loadable({
  loader: () => import('components/Layout/AppLayout/'),
  loading: LoadingComponent
})

let AsyncAccount = loadable({
  loader: () => import('../routes/login'),
  loading: LoadingComponent
})

class App extends React.Component {
  render() {
    const { location } = this.props;
    const isRoot = location.pathname === '/' ? true : false;
    if (isRoot) {
      return ( <Redirect to={'/login'}/> );
    }

    return (
      <div id="app">
        <Route path={`/login`} component={AsyncAccount} />
        <Route path={`/app`} component={AsyncAppLayout} />
      </div>
    );
  }
}

export default App;

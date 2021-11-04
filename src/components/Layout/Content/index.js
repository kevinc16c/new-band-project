import React from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router'
import loadable from 'react-loadable';
import LoadingComponent from '../../Loading';
import '../../styles.scss';

let AsyncInicio = loadable({
  loader: () => import('routes/inicio/index'),
  loading: LoadingComponent
})

class AppContent extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <div className='app-content'>
        <Route exact path={`${match.url}/inicio`} component={AsyncInicio} />
      </div>
    );
  }
}

export default withRouter(AppContent);
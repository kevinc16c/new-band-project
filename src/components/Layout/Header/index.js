import React from 'react';
import '../../styles.scss';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { message } from 'antd';
import { setUser } from 'actions/user';
import { history } from '../../../_helpers';
import { authenticationService } from '../../../_services';
import { utils } from '../../../utils'

class AppHeader extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentUser: authenticationService.currentUserValue,
      users: null
    }
  }

  async componentDidMount() {
    try {
      authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));

      const e = this.state.currentUser.data.usuario.nombreempl;
      const r = e.toLowerCase()
      utils.primerLetra(r[0])
    } catch (e) {
      console.log(e)
      message.error(e.toString(), 10);
    }

  }
  changeCaseFirstLetter(params) {
    const e = params.toLowerCase()
    if (typeof e === 'string') {
      return e.charAt(0).toUpperCase() + e.slice(1);
    }
    return null;
  }

  logout() {
    authenticationService.logout();
    history.push('/login');
  }

  render() {
    const { currentUser } = this.state;
    // console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa', currentUser, users)

    return (
      <div className="app-header" style={{ backgroundColor: '#ededed' }}>
        <div className='app-header-inner' style={{ backgroundColor: '#f01a1c' }} >
          <div className="header-left" style={{ backgroundColor: '#ededed' }}>
            <div className="list-unstyled list-inline" style={{ backgroundColor: '#f01a1c' }}>
              {/* Logo o Nombre de usuario */}
            </div>
          </div>

          <div className="header-right" style={{ backgroundColor: '#f01a1c' }}>
            <div className="list-unstyled list-inline">
              {/* Botón para Logout */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  handleSetUser: (user) => {
    dispatch(setUser(user));
  }
});


const WrappedAppHeader = withRouter(AppHeader);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedAppHeader);

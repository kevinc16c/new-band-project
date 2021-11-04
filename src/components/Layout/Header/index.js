import React from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { message } from 'antd';
import { setUser } from 'actions/user';
import { history } from '../../../_helpers';
import { authenticationService } from '../../../_services';

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
    } catch (e) {
      console.log(e)
      message.error(e.toString(), 10);
    }

  }
  

  logout() {
    authenticationService.logout();
    history.push('/login');
  }

  handleLogout = () => {
    authenticationService.logout();
    history.push('/login');
    window.location.reload()
  }

  render() {
    const { currentUser } = this.state;
    console.log(currentUser)
    return (
      <div className="app-header" style={{ backgroundColor: '#198754' }}>
        <div className='app-header-inner' style={{ backgroundColor: '#198754' }} >
        <div className="col-6">
          <h4 style={{margin:'5px'}}>{currentUser.name}</h4>
        </div>
          <div className="col-6">
            <button
              style={{ float: 'right', margin: 5 }}
              type="button"
              className="btn btn-light"
              onClick={this.handleLogout}
            >
              Logout
            </button>
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

import React from 'react';
import { connect } from 'react-redux';
import { setUser } from 'actions/user';
import demoData from '../../../constants/demoData';
import { authenticationService } from '../../../_services';
import '../styles.scss'

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabledLogin: false,
    }

    // redirect to home if already logged in
    if (authenticationService.currentUserValue) {
      console.log(authenticationService.currentUserValue)
      // this.props.history.push('/app/inicio');
    }
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    if (!this.state.user) {
      return alert('you need to charge a user')
    }
    if (!this.state.pass) {
      return alert('you need to charge a pass')
    }
    authenticationService.login(this.state.user, this.state.pass)
    let found = demoData.find(item => item.user === this.state.user && item.pass === this.state.pass)
    console.log(found)
    if (found) {
      this.props.handleSetUser(found);
      sessionStorage.setItem("token", Math.random(0).toString(36).substr(2));
      window.open("/app/inicio", "_self")
    } else {
      alert('the username or password is incorrect')
    }
  }

  handleOnChange = (value, name) => {
    this.setState({ [name]: value })
  }
  render() {
    return (
      <section className="vh-100" style={{ backgroundColor: '#b3b3b3' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: '1rem' }}>
                <section className="form-v1-container" style={{ margin: '10px' }}>
                  <h2>Login</h2>
                  <p className="lead">Welcome, enter your username and password</p>
                  <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                      <label for="exampleInputUser" className="form-label">User</label>
                      <input className="form-control" id="exampleInputUser" aria-describedby="userHelp" onChange={(e) => this.handleOnChange(e.target.value, 'user')} />
                      <div id="user" className="form-text">We'll never share your data with anyone else.</div>
                    </div>
                    <div className="mb-3">
                      <label for="exampleInputPassword1" className="form-label">Password</label>
                      <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => this.handleOnChange(e.target.value, 'pass')} />
                    </div>
                    <div className="mb-3">
                      <button type="submit" className="btn btn-primary" style={{ float: 'right' }}>Sign in</button>
                    </div>
                  </form>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleSetUser: (user) => {
      dispatch(setUser(user));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NormalLoginForm);
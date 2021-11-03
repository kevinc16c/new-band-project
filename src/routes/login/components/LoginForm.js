import React from 'react';
import { api } from '../api';
import { message, Form, Icon, Input, Button } from 'antd';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { setUser } from 'actions/user';
import { authenticationService } from '../../../_services';
import '../styles.scss'

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabledLogin: false,
    }

    // redirect to home if already logged in
    if (authenticationService.currentUserValue) {
      this.props.history.push('/app/inicio');
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ disabledLogin: true });
        try {
          // console.log(values)
          authenticationService.login(values.usuario, values.clave)
          const response = await api.auth.login({
            usuario: values.usuario,
            clave: values.clave,
            nivel: 0
          });
          if (response.status === "success") {
            console.log(response)
            this.props.handleSetUser(response.data.usuario);
            sessionStorage.setItem("token", response.data.token);
            this.props.history.push('/app/inicio');
          } else {
            message.error(response.message, 7);
            console.log(response)
            this.setState({ disabledLogin: false });
          }
        } catch (e) {
          console.log(e)
          message.error("Verifique su conexión a internet", 7);
          this.setState({ disabledLogin: false });
        }
      }
    });
  }
  render() {
    return (
      <section className="form-v1-container">
        <h2>Inicio de sesión</h2>
        <p className="lead">Welcome, enter your username and password</p>
        <form>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </section>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(withRouter(NormalLoginForm));

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
)(WrappedNormalLoginForm);

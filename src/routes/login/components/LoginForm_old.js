import React from 'react';
import {api} from '../api';
import { message, Form, Icon, Input, Button } from 'antd';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { setUser } from 'actions/user';
import { authenticationService } from '../../../_services';
import '../styles.scss'

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            disabledLogin: false,
        }

        // redirect to home if already logged in
        if (authenticationService.currentUserValue){ 
          this.props.history.push('/app/inicio');
      }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                this.setState({disabledLogin:true});
                try {
                  // console.log(values)
                  authenticationService.login(values.usuario, values.clave)
                    const response = await api.auth.login({
                      usuario: values.usuario, 
                      clave: values.clave, 
                      nivel:0});
                    if (response.status === "success"){
                      console.log(response)
                        this.props.handleSetUser(response.data.usuario);
                        sessionStorage.setItem("token", response.data.token);
                        this.props.history.push('/app/inicio');
                    }else{
                        message.error(response.message, 7);
                        console.log(response)
                        this.setState({disabledLogin:false});
                    }
                } catch (e) {
                    console.log(e)
                    message.error("Verifique su conexión a internet",7);
                    this.setState({disabledLogin:false});
                }
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
          <section className="form-v1-container">

            <h2>Inicio de sesión</h2>
            <p className="lead">Bienvenido, ingrese su usuario y clave</p>
            <Form onSubmit={this.handleSubmit} className="form-v1">
              <FormItem>
                {getFieldDecorator('usuario', {
                  rules: [{ required: true, message: 'Por favor ingrese su nombre de usuario!' }],
                })(
                  <Input size="large" prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Usuario" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('clave', {
                  rules: [{ required: true, message: 'Por favor ingrese su contraseña!' }],
                })(
                  <Input size="large" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Contraseña" />
                )}
              </FormItem>

              <FormItem>
                <Button onClick={()=> this.handleSubmit} type="primary" htmlType="submit" className="btn-cta btn-block" disabled={this.state.disabledLogin}>
                  INGRESAR
                </Button>
              </FormItem>
            </Form>
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

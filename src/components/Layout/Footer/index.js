import React from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;

export default class AppFooter extends React.Component{
  render(){
    return(
    <Footer className="app-footer app-footer-custom">
      <div className="footer-inner-v1">
        <span className="small">
           2021
          </span>
      </div>
    </Footer>
    )
  }
}



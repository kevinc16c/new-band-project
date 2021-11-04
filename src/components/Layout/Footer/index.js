import React from 'react';
import appConfig from '../../../constants/appConfig'
import './styles.scss';
export default class AppFooter extends React.Component {
  render() {
    return (
      <div className="app-footer app-footer-custom">
          <span className="small a">
            {appConfig.year}
          </span>
      </div>
    )
  }
}



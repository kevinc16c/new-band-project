import React from 'react';
import AppHeader from 'components/Layout/Header';
import AppFooter from 'components/Layout/Footer';
import AppContent from 'components/Layout/Content';

class AppLayout extends React.Component {

  render() {
    return (
      <>
        <div className="app-layout">
          <AppHeader />
          <AppContent />
          <AppFooter />
        </div>
      </>
    )
  }
}

export default AppLayout;

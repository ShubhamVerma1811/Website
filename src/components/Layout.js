import React from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ profiles, children }) => {
  return (
    <div>
      <Header profiles={profiles} />
      {children}
      <Footer />
    </div>

    // React.Children.map(children, (child) => {
    //   return React.cloneElement(child, { ...child.props, profiles });
    // })
  );
};

export default Layout;

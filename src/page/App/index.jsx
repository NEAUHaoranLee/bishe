import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { actions } from 'store/store';
import Cookies from 'browser-cookies';
import logo from 'static/img/logo.png';
import Nav from './nav';
import './index.less';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isCollapse: false,
    };
  }
  // componentWillReceiveProps(newProps) {
  //   const { location, history, userType } = this.props;
  //   const { userType: newUserType } = newProps;

  //   if (userType !== newUserType && location.pathname === '/login') {
  //     history.push(`/${newUserType}`);
  //   }
  // }

  // componentDidMount() {
  //   // this.props.createUsers({ account: "A00000001", password: "000",userType: 'manager', userName: '李四' })
  //   //cookie操作
  //   const LoginCookie = Cookies.get('login-ticket');
  //   if (LoginCookie) {
  //     this.props.getUserInfo(LoginCookie);
  //   } else {
  //     this.props.history.push('/login');
  //   }
  // }
  toggleNav() {
    this.setState({
      isCollapse: !this.state.isCollapse,
    });
  }

  render() {
    const {
      location: { pathname },
      userName,
      userType,
    } = this.props;
    const { isCollapse } = this.state;
    const cls = isCollapse ? 'nav-in app-body' : 'nav-out app-body';

    return (
      <div id="app-container">
        {pathname !== '/login' && (
          <Nav
            pathname={pathname}
            toggleNav={this.toggleNav.bind(this)}
            isCollapse={isCollapse}
            userType={userType}
          />
        )}
        <div className={cls}>
          {pathname !== '/login' && (
            <div className="app-header">
              <img src={logo} alt="" />
              <div className="header-user-info">
                <span className="username">{userName}</span>
                <Link to="/login" onClick={this.props.userSignOut}>
                  退出
                </Link>
              </div>
            </div>
          )}
          {(pathname.split('/')[1] === userType || pathname === '/login') && (
            <div className="page-container">{this.props.children}</div>
          )}
        </div>
      </div>
    );
  }
}
export default connect(
  (state) => state,
  actions,
)(withRouter(App));

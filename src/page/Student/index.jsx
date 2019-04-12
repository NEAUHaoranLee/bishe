import React, { PureComponent } from 'react';
import { Upload, message, Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'store/store';
import NowProcess from 'components/nowProcess';
import './index.less';

class Student extends PureComponent {
  constructor(props) {
    super(props);
  }
  renderChildren() {
    return (
      <div className="my-project">
        我的项目：
        <Link to="/student/new-project">
          <div className="add">+</div>
        </Link>
      </div>
    );
  }
  render() {
    return (
      <div className="student-container">
        <div className="content-container">
          <NowProcess renderChildren={this.renderChildren}/>
        </div>
      </div>
    );
  }
}
export default connect(
  (state) => state,
  actions,
)(Student);

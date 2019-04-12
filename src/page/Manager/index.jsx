import React, { PureComponent } from 'react';
import { Upload, message, Button, Icon, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'store/store';
import ProBoard from './table';
import './index.less';

class Menager extends PureComponent {
  constructor(props) {
    super(props);
  }
  renderChildren() {
    return (
      <div className="new-year">
        发起学期：
        <Link to="/manager/new-year" className="new">
          <Button type="primary">发起学期</Button>
        </Link>
      </div>
    );
  }
  render() {
    return (
      <div className="manager-container">
        <div className="content-container">
          <div className="manage-title">
            <span className="title-child">
              当前流程: <span>{'2019中期检查/2018结题'}</span>
            </span>
            <Divider type="vertical" />
            <span className="title-child">管理等级：校级</span>
            <Divider type="vertical" />
            <span className="title-child">当前状态：正在审批(1/4)</span>
          </div>
          <ProBoard title="2019中期检查" />
          <ProBoard title="2018结题" />
        </div>
      </div>
    );
  }
}
export default connect(
  (state) => state,
  actions,
)(Menager);

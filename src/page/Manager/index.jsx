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
  componentDidMount() {
    this.init();
  }
  init = () => {
    const { userAccount, getManagerProcess } = this.props;

    getManagerProcess({ account: userAccount });
  };
  render() {
    const { mProcess, stopCollect, getManagerProcess } = this.props;
    console.log(mProcess);
    const { currentProcess, level, state } = mProcess;

    return (
      <div className="manager-container">
        <div className="content-container">
          {mProcess &&
            mProcess.map((item) => (
              <div key={item}>
                <div className="manage-title">
                  <span className="title-child">
                    当前流程: <span>{item.currentProcess}</span>
                  </span>
                  <Divider type="vertical" />
                  <span className="title-child">管理等级：{item.level}</span>
                  <Divider type="vertical" />
                  <span className="title-child">当前状态：{item.state}</span>
                </div>
                <ProBoard
                  stopCollect={stopCollect}
                  init={this.init}
                  pKey={item.key}
                  title={item.processName}
                  level={item.level}
                  data={item.managerDtoList[item.currentProcess]}
                />
              </div>
            ))}
        </div>
      </div>
    );
  }
}
export default connect(
  (state) => state,
  actions,
)(Menager);

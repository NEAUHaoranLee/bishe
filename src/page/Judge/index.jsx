import React, { PureComponent } from 'react';
import { message, Button, Icon, Divider, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'store/store';
import ProBoard from './table';
import './index.less';

const TabPane = Tabs.TabPane;

class Judge extends PureComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getStudentProcess({
      account: this.props.userAccount,
    });
  }
  render() {
    return (
      <div className="manager-container">
        <div className="content-container">
          <Tabs>
            <TabPane tab="待审批" key={1}>
              <ProBoard title="2019中期检查" type='judging'/>
              <ProBoard title="2018结题" type='judging'/>
            </TabPane>
            <TabPane tab="已审批" key={2}>
              <ProBoard title="2019中期检查" type='judged'/>
              <ProBoard title="2018结题" type='judged'/>
            </TabPane>
          </Tabs>
          {/* <div className="manage-title">
            <span className="title-child">
              当前流程: <span>{'2019中期检查/2018结题'}</span>
            </span>
            <Divider type="vertical" />
            <span className="title-child">管理等级：校级</span>
            <Divider type="vertical" />
            <span className="title-child">当前状态：正在审批(1/4)</span>
          </div> */}
        </div>
      </div>
    );
  }
}
export default connect(
  (state) => state,
  actions,
)(Judge);

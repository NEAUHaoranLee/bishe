import React, { PureComponent } from 'react';
import { Table, Divider, Modal, Button, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'store/store';
import './index.less';

class ViewPro extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalTitle: '',
    };
    this.columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '项目总数',
        dataIndex: 'total',
        key: 'total',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: '查看详情',
        dataIndex: 'detail',
        key: 'detail',
        render: (text, record) => {
          console.log(text, record);
          return <Link to={`/manager/view-project/${text}`}>查看详情</Link>;
        },
      },
    ];
    this.dataSource = [
      {
        name: '2017SITP',
        total: '1010',
        status: '已结题',
        detail: '2017SITP',
        key: 1,
      },
      {
        name: '2018SITP',
        total: '1010',
        status: '结题中',
        detail: '2018SITP',
        key: 2,
      },
      {
        name: '2019SITP',
        total: '1010',
        status: '中期检查中',
        detail: '2019SITP',
        key: 3,
      },
    ];
  }
  handleChange = (name, e) => {
    this.setState({
      [name]: e.target.value,
    });
  };
  handleCancel = () => {
    this.setState({
      modalVisible: false,
      modalTitle: '',
    });
  };
  render() {
    return (
      <div className="viewPro-container">
        <div className="table-container">
          <Table dataSource={this.dataSource} columns={this.columns} />
          <Button
            type="primary"
            onClick={() => {
              this.setState({
                modalVisible: true,
                modalTitle: '新建流程',
              });
            }}
          >
            新建流程
          </Button>
          <Modal
            title={this.state.modalTitle}
            visible={this.state.modalVisible}
            onOk={this.handleOk}
            confirmLoading={this.state.confirmLoading}
            onCancel={this.handleCancel}
            width={450}
          >
            <span className="label">流程类型:</span>
            <Select
            style={{ display: 'block' }}
            // onChange={(value) => this.setState({ rowSelectValue: value })}
            // value={this.state.rowSelectValue}
            >
              <Select.Option value="A">立项</Select.Option>
              <Select.Option value="B">中期/结题</Select.Option>
            </Select>
            <span className="label">开始时间:</span>
            <Input
              value={this.state.proName}
              onChange={(e) => this.handleChange('proName', e)}
            />
            <span className="label">结束时间:</span>
            <Input
              value={this.state.proName}
              onChange={(e) => this.handleChange('proName', e)}
            />
          </Modal>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => state,
  actions,
)(ViewPro);

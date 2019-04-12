import React, { PureComponent } from 'react';
import { Table, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'store/store';
import './index.less';

class ViewPro extends PureComponent {
  constructor(props) {
    super(props);
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
          console.log(text, record)
          return <Link to={`/manager/view-project/${text}`}>查看详情</Link>
        }
      }
    ]
    this.dataSource = [
      {
        name: '2017SITP',
        total: '1010',
        status: '已结题',
        detail: '2017SITP',
        key: 1
      },
      {
        name: '2018SITP',
        total: '1010',
        status: '结题中',
        detail: '2018SITP',
        key: 2
      },
      {
        name: '2019SITP',
        total: '1010',
        status: '中期检查中',
        detail: '2019SITP',
        key: 3
      }
    ]
  }

  render() {
    return <div className="myPro-container">
      <div className="table-container">
        <Table dataSource={this.dataSource} columns={this.columns}/>
      </div>
    </div>;
  }
}

export default connect(
  (state) => state,
  actions,
)(ViewPro);

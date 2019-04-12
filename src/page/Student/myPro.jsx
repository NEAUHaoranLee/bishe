import React, { PureComponent } from 'react';
import { Table, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'store/store';
import './index.less';

class MyPro extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '成员',
        dataIndex: 'member',
        key: 'member',
        className: 'member',
      },
      {
        title: '指导教师',
        dataIndex: 'teacher',
        key: 'teacher',
      },
      {
        title: '当前进度',
        dataIndex: 'process',
        key: 'process',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: '评审结果',
        dataIndex: 'result',
        key: 'result',
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => {
          console.log(text, record)
          return <Link to={`/student/edit-project/${text}`}>编辑</Link>
        }
      }
    ]
    this.dataSource = [
      {
        name: '张三',
        member: '李四/A19100000',
        teacher: '张宇',
        process: '待提交',
        status: '立项申请',
        result: '-',
        action: '1',
        key: 1
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
)(MyPro);

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
        title: '项目名称',
        dataIndex: 'pName',
        key: 'pName',
      },
      {
        title: '负责人',
        dataIndex: 'userName',
        key: 'userName',
      },
      {
        title: '成员',
        dataIndex: 'memberInf',
        key: 'memberInf',
        className: 'member',
      },
      {
        title: '指导教师',
        dataIndex: 'teacherName',
        key: 'teacherName',
      },
      {
        title: '当前进度',
        dataIndex: 'recordStatus',
        key: 'recordStatus',
      },
      {
        title: '状态',
        dataIndex: 'pStatus',
        key: 'pStatus',
      },
      {
        title: '评审结果',
        dataIndex: 'avg',
        key: 'avg',
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => {
          return (
            <div>
              <Link to={`/student/edit-project/${record.key}`}>download</Link>
              {record.recordStatus !== '已提交' && (
                <span>
                  <Divider type='vertical'/>
                  <Link to={`/student/edit-project/${record.key}`}>编辑</Link>
                </span>
              )}
            </div>
          );
        },
      },
    ];
  }
  componentDidMount() {
    this.props.getStudentProject({ account: this.props.userAccount });
  }
  render() {
    return (
      <div className="myPro-container">
        <div className="table-container">
          <Table dataSource={this.props.sProject} columns={this.columns} />
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => state,
  actions,
)(MyPro);

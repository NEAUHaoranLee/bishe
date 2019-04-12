import React, { PureComponent } from 'react';
import { Table, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'store/store';
import { collage, projectType } from 'config/index';
import './index.less';

class Detail extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '项目名称',
        dataIndex: 'pName',
        key: 'pName',
        fixed: 'left',
        width: 250,
      },
      {
        title: '负责人姓名',
        dataIndex: 'oName',
        key: 'oName',
        width: 150,
      },
      {
        title: '学院',
        dataIndex: 'collage',
        key: 'collage',
        width: 250,
        filters: collage.map((item) => {
          return {
            text: item,
            value: item,
          };
        }),
        onFilter: (value, record) => record.collage === value,
      },
      {
        title: '指导教师',
        dataIndex: 'teacher',
        key: 'teacher',
      },
      {
        title: '结果',
        dataIndex: 'result',
        key: 'result',
      },
      {
        title: '项目来源',
        dataIndex: 'source',
        key: 'source',
      },
      {
        title: '下载文件',
        dataIndex: 'download',
        key: 'download',
        fixed: 'right',
        width: 100,
        render: (text, record) => {
          console.log(text, record);
          return <Link to={`/manager/view-project/${text}`}>download</Link>;
        },
      },
    ];
    this.dataSource = [
      {
        pName: '基于web的SIPT项目管理系统',
        oName: '李大宝',
        collage: '电气与信息学院',
        teacher: 'Mr.张',
        result: '校级重点优秀结题',
        source: '学生自拟',
        key: 1,
      },
      {
        pName: '基于web的SIPT项目管理系统',
        oName: '李大宝',
        collage: '电气与信息学院',
        teacher: 'Mr.张',
        result: '校级重点优秀结题',
        source: '学生自拟',
        key: 2,
      },
      {
        pName: '基于web的SIPT项目管理系统',
        oName: '李大宝',
        collage: '电气与信息学院',
        teacher: 'Mr.张',
        result: '校级重点优秀结题',
        source: '学生自拟',
        key: 3,
      },
      {
        pName: '基于web的SIPT项目管理系统',
        oName: '李大宝',
        collage: '电气与信息学院',
        teacher: 'Mr.张',
        result: '校级重点优秀结题',
        source: '学生自拟',
        key: 4,
      },
    ];
  }

  render() {
    return (
      <div className="myPro-container">
        <div className="table-container" style={{ width: 1000 }}>
          <Table
            dataSource={this.dataSource}
            columns={this.columns}
            scroll={{ x: 1200 }}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => state,
  actions,
)(Detail);

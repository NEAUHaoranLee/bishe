import React, { PureComponent } from 'react';
import { Table, Divider, Modal, Button } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'store/store';
import { collage, projectType, processType } from 'config/index';
import './index.less';

class Detail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: null,
    };
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
        width: 200,
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
        title: '当前流程',
        dataIndex: 'process',
        key: 'process',
        filters: processType.map((item) => {
          return {
            text: item,
            value: item,
          };
        }),
        onFilter: (value, record) => record.process === value,
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
          return <Link to={`/manager/view-project/${text}`}>download</Link>;
        },
      },
      {
        title: '审批',
        dataIndex: 'approve',
        key: 'approve',
        fixed: 'right',
        width: 100,
        render: (text, record) => {
          const content = (
            <div>
              <Button size="small">取消</Button>
              <Button type="primary" size="small">
                确定
              </Button>
            </div>
          );
          return (
            <div>
              <a href="javascript:;" onClick={() => this.confirm(record)}>
                approve
              </a>
            </div>
          );
        },
      },
    ];
    this.dataSource = [
      {
        pName: '基于web的SIPT项目管理系统1',
        oName: '李大宝',
        collage: '电气与信息学院',
        teacher: 'Mr.张',
        result: '校级重点优秀结题',
        source: '学生自拟',
        process: '立项',
        key: 1,
      },
      {
        pName: '基于web的SIPT项目管理系统2',
        oName: '李大宝',
        collage: '电气与信息学院',
        teacher: 'Mr.张',
        result: '校级重点优秀结题',
        source: '学生自拟',
        process: '立项',
        key: 2,
      },
      {
        pName: '基于web的SIPT项目管理系统3',
        oName: '李大宝',
        collage: '电气与信息学院',
        teacher: 'Mr.张',
        result: '校级重点优秀结题',
        source: '学生自拟',
        process: '中期检查',
        key: 3,
      },
      {
        pName: '基于web的SIPT项目管理系统4',
        oName: '李大宝',
        collage: '电气与信息学院',
        teacher: 'Mr.张',
        result: '校级重点优秀结题',
        source: '学生自拟',
        process: '结题',
        key: 4,
      },
    ];
  }
  componentDidMount() {}
  showModal = (record) => {
    this.setState({
      visible: record.pName,
    });
  };
  handleOk = (record) => {
    this.hideModal();
  };
  hideModal = () => {
    this.setState({
      visible: null,
    });
  };
  confirm = () => {
    Modal.confirm({
      title: '审批确认',
      content: '确定要进行审批吗？',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  };
  render() {
    return (
      <div className="teacher-container">
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

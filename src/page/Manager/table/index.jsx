import React, { PureComponent } from 'react';
import { collage, projectType } from 'config/index';
import { Table, Select, Button, message } from 'antd';
import _ from 'lodash';
import './index.less';

const actionFilterOption = [
  {
    text: '未选择',
    value: 'undefined',
  },
  {
    text: 'A',
    value: 'A',
  },
  {
    text: 'B',
    value: 'B',
  },
  {
    text: 'C',
    value: 'C',
  },
  {
    text: 'D',
    value: 'D',
  },
];

export default class proBoard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      actionResult: {},
      rowSelection: [],
      rowSelectValue: '',
    };
    this.columns = [
      {
        title: '学院',
        dataIndex: 'collage',
        key: 'collage',
        filters: collage.map((item) => {
          return {
            text: item,
            value: item,
          };
        }),
        onFilter: (value, record) => record.collage === value,
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '指导教师',
        dataIndex: 'teacher',
        key: 'teacher',
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        filters: projectType.map((item) => {
          return {
            text: item,
            value: item,
          };
        }),
        onFilter: (value, record) => record.type === value,
      },
      {
        title: '评审1',
        dataIndex: 'result1',
        key: 'result1',
      },
      {
        title: '评审2',
        dataIndex: 'result2',
        key: 'result2',
      },
      {
        title: '评审3',
        dataIndex: 'result3',
        key: 'result3',
      },
      {
        title: '评审4',
        dataIndex: 'result4',
        key: 'result4',
      },
      {
        title: '平均分',
        dataIndex: 'avg',
        key: 'avg',
        sorter: (a, b) => {
          return parseFloat(a.avg) - parseFloat(b.avg);
        },
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        filters: actionFilterOption,
        onFilter: (value, record) =>
          String(this.state.actionResult[record.key]) === value,
        render: (text, record) => {
          const { actionResult } = this.state;

          return (
            <Select
              style={{ width: 90 }}
              onChange={(value) => this.selectChange(record, value)}
              value={actionResult[record.key]}
            >
              <Select.Option value="A">A</Select.Option>
              <Select.Option value="B">B</Select.Option>
              <Select.Option value="C">C</Select.Option>
              <Select.Option value="D">D</Select.Option>
            </Select>
          );
        },
      },
    ];
    this.dataSource = [
      {
        name: '张三',
        teacher: '张宇',
        type: '创新训练项目',
        collage: '水利学院',
        result1: '60',
        result2: '60',
        result3: '60',
        result4: '60',
        avg: '60',
        action: '1',
        key: 1,
      },
      {
        name: '李四',
        teacher: '张宇',
        type: '创业训练项目',
        collage: '电气与信息学院',
        result1: '61',
        result2: '61',
        result3: '61',
        result4: '61',
        avg: '61',
        action: '1',
        key: 2,
      },
      {
        name: '王五',
        teacher: '张宇',
        type: '创业实践项目',
        collage: '电气与信息学院',
        result1: '59',
        result2: '59',
        result3: '59',
        result4: '59',
        avg: '59',
        action: '1',
        key: 3,
      },
    ];
  }
  selectChange = (record, value) => {
    let result = { ...this.state.actionResult };
    result[record.key] = value;

    this.setState({
      actionResult: result,
    });
  };
  batching = () => {
    const { rowSelection, rowSelectValue, actionResult } = this.state;
    let result = {};

    rowSelection.forEach((item) => {
      result[item.key] = rowSelectValue;
    });

    this.setState(
      {
        actionResult: { ...actionResult, ...result },
      },
      () => {
        this.setState({
          rowSelection: [],
        });
      },
    );
  };
  submitResult = () => {
    let flag = true;

    this.dataSource.forEach((item) => {
      if (!this.state.actionResult[item.key]) {
        flag = false;
      }
    });

    if (flag) {
      console.log(this.state.actionResult);
    } else {
      message.error('请为所有项目评分后再提交!');
    }
  };
  getRowSelection = () => {
    return {
      selectedRowKeys: this.state.rowSelection.map((item) => item.key),
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys);
        this.setState({
          rowSelection: selectedRows,
        });
      },
      getCheckboxProps: (record) => ({
        disabled: false,
        name: record.name,
      }),
    };
  };
  render() {
    const { renderChildren, title } = this.props;

    return (
      <div className="manager-table-container">
        <div className="title">
          {title}
          <div className="batching">
            <Select
              style={{ width: 90 }}
              onChange={(value) => this.setState({ rowSelectValue: value })}
              value={this.state.rowSelectValue}
            >
              <Select.Option value="A">A</Select.Option>
              <Select.Option value="B">B</Select.Option>
              <Select.Option value="C">C</Select.Option>
              <Select.Option value="D">D</Select.Option>
            </Select>
            <Button size="small" onClick={this.batching}>
              批量操作
            </Button>
          </div>
        </div>
        <Table
          dataSource={this.dataSource}
          columns={this.columns}
          rowSelection={this.getRowSelection()}
        />
        <div className="button-container">
          <Button
            onClick={() => {
              console.log('stop');
            }}
          >
            停止收取
          </Button>
          <Button
            //函数防抖
            onClick={_.throttle(this.submitResult, 2000, { leading: true })}
            type="primary"
          >
            提交结果
          </Button>
        </div>
      </div>
    );
  }
}

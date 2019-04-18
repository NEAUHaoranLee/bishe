import React, { PureComponent } from 'react';
import { collage, projectType } from 'config/index';
import { Table, Select, Button, message, Input } from 'antd';
import _ from 'lodash';
import './index.less';

export default class proBoard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      actionResult: {},
      rowSelection: [],
      rowSelectValue: '',
      changeScore: null,
    };
    this.dataSource = [
      {
        pName: '基于xxxxxxx的项目管理系统1',
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
        pName: '基于xxxxxxx的项目管理系统2',
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
        pName: '基于xxxxxxx的项目管理系统3',
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
  getColumn = () => {
    return [
      {
        title: '项目名称',
        dataIndex: 'pName',
        key: 'pName',
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
        title: '评分',
        dataIndex: 'result',
        key: 'result',
        width: 120,
        render: (text, record) => {
          return (
            <Input
              disabled={
                this.props.type === 'judged' &&
                record.pName !== this.state.changeScore
              }
            />
          );
        },
      },
      {
        title: '备注',
        dataIndex: 'comment',
        key: 'comment',
        render: (text, record) => {
          return (
            <Input.TextArea
              disabled={
                this.props.type === 'judged' &&
                record.pName !== this.state.changeScore
              }
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
          );
        },
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => {
          if (this.props.type === 'judging') {
            return <a href="javascript:;">保存</a>;
          } else {
            return record.pName === this.state.changeScore ? (
              <a
                href="javascript:;"
                onClick={() => {
                  this.setState({ changeScore: null });
                }}
              >
                保存
              </a>
            ) : (
              <a
                href="javascript:;"
                onClick={() => {
                  this.setState({ changeScore: record.pName });
                }}
              >
                修改
              </a>
            );
          }
        },
      },
    ];
  };
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
            <a href="">download</a>
          </div>
        </div>
        <Table dataSource={this.dataSource} columns={this.getColumn()} />
        {this.props.type === 'judged' && (
          <div className="button-container">
            <Button
              onClick={() => {
                console.log('stop');
              }}
            >
              保存修改
            </Button>
            <Button
              //函数防抖
              onClick={_.throttle(this.submitResult, 2000, { leading: true })}
              type="primary"
            >
              提交结果
            </Button>
          </div>
        )}
      </div>
    );
  }
}

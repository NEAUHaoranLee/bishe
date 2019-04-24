import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actions } from 'store/store';
import { withRouter } from 'react-router-dom';
import { editDataFormatter } from 'src/pure';
import {
  message,
  Form,
  Select,
  Input,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Icon,
  Checkbox,
} from 'antd';
import './index.less';

class Project extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      first: true,
      second: true,
      third: true,
      file: {},
    };
  }
  componentDidMount() {
    this.props.getStudentProcess({ account: this.props.userAccount });

    if (this.props.match.params.id) {
      this.props.editProject({ key: this.props.match.params.id });
    }
  }
  componentWillReceiveProps(newProps) {
    if (this.props.editData !== newProps.editData) {
      console.log(1)
      const { pathFirst, pathSecond, pathThird } = newProps.editData.tableData;
      this.setState({
        // disabled: true,
        file: { pathFirst, pathSecond, pathThird },
      });
      this.props.form.setFieldsValue(
        editDataFormatter(newProps.editData.tableData),
      );
    }
  }
  formDataFormatter = (value) => {
    let formValue = value || this.props.form.getFieldsValue();
    let { pathFirst, pathSecond, pathThird } = formValue;

    for (const k in formValue) {
      formValue[k] = formValue[k] ? formValue[k] : '';
    }

    formValue.pathFirst = pathFirst
      ? `${pathFirst[0].response.data.dir}$*$${pathFirst[0].originFileObj.name}`
      : '';
    formValue.pathSecond = pathSecond
      ? `${pathSecond[0].response.data.dir}$*$${
          pathSecond[0].originFileObj.name
        }`
      : '';
    formValue.pathThird = pathThird
      ? `${pathThird[0].response.data.dir}$*$${pathThird[0].originFileObj.name}`
      : '';
    formValue.key = this.props.match.params.id || this.props.sProcess.key;
    formValue.leaderAccount = this.props.userAccount;

    return formValue;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(null, (err, values) => {
      if (!err) {
        const formValue = this.formDataFormatter(values);

        this.props
          .applyProject(formValue)
          .then(() => this.props.history.push('/student/my-project'));
      }
    });
  };
  normFile = (name) => {
    return (e) => {
      this.setState({
        [name]: e.fileList.length === 0,
      });
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    };
  };
  onSave = () => {
    const formValue = this.formDataFormatter();

    console.log(formValue);
    if (formValue.name) {
      this.props
        .saveProject(formValue)
        .then(() => this.props.history.push('/student/my-project'))
        .catch(() => message.error('保存失败，可能是当前流程已存在项目'));
    } else {
      message.error('咋也得填写项目名称和指导教师信息吧大哥！！');
    }
  };
  render() {
    const { getFieldDecorator, getFieldsValue } = this.props.form;
    const { disabled } = this.state;
    const formValue = getFieldsValue();
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <div className="from-container">
        <div className="title">编辑项目</div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="项目名称:">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入项目名称!' }],
              validateTrigger: false,
            })(
              <Input
                placeholder={formValue.projectName || '请输入项目名称'}
                disabled={disabled}
              />,
            )}
          </Form.Item>
          <Form.Item label="项目类型:">
            {getFieldDecorator('type', {
              rules: [{ required: true, message: '请选择项目类型!' }],
            })(
              <Select
                placeholder={formValue.projectType || '请选择项目类型'}
                disabled={disabled}
              >
                <Select.Option value="创新训练项目" key="1">
                  创新训练项目
                </Select.Option>
                <Select.Option value="创业训练项目" key="2">
                  创业训练项目
                </Select.Option>
                <Select.Option value="创业实践项目" key="3">
                  创业实践项目
                </Select.Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="项目负责人姓名:">
            {getFieldDecorator('leaderName', {
              rules: [{ required: true, message: '请输入项目负责人姓名!' }],
              validateTrigger: false,
            })(
              <Input
                placeholder={formValue.oName || '请输入项目负责人姓名'}
                disabled={disabled}
              />,
            )}
          </Form.Item>
          <Form.Item label="负责人所在学院:" wrapperCol={{ span: 6 }}>
            {getFieldDecorator('leaderCollege', {
              rules: [{ required: true, message: '请选择所在学院!' }],
            })(
              <Select
                placeholder={formValue.collage || '所在学院'}
                disabled={disabled}
              >
                <Select.Option value="电气与信息学院" key="1">
                  电气与信息学院
                </Select.Option>
                <Select.Option value="工程学院" key="2">
                  工程学院
                </Select.Option>
                <Select.Option value="经管学院" key="3">
                  经管学院
                </Select.Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="参与人数:" wrapperCol={{ span: 4 }}>
            {getFieldDecorator('memberNum', {
              rules: [{ required: true, message: '请选择参与项目人数!' }],
            })(
              <Select
                placeholder={formValue.projectMember || '参与项目人数'}
                disabled={disabled}
              >
                <Select.Option value="1" key="1">
                  1
                </Select.Option>
                <Select.Option value="2" key="2">
                  2
                </Select.Option>
                <Select.Option value="3" key="3">
                  3
                </Select.Option>
                <Select.Option value="4" key="4">
                  4
                </Select.Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="其他成员信息:">
            {getFieldDecorator('memberInf', {
              rules: [{ required: true, message: '请输入其他成员信息!' }],
              validateTrigger: false,
            })(
              <Input
                placeholder={
                  formValue.memberInfo || '张三/A00000000,李四/A00000001...'
                }
                disabled={disabled}
              />,
            )}
          </Form.Item>
          <Form.Item label="指导教师姓名:">
            {getFieldDecorator('teacherName', {
              rules: [{ required: true, message: '请输入指导教师姓名!' }],
              validateTrigger: false,
            })(
              <Input
                placeholder={formValue.tName || '请输入指导教师姓名'}
                disabled={disabled}
              />,
            )}
          </Form.Item>
          <Form.Item label="指导教师工号:" wrapperCol={{ span: 4 }}>
            {getFieldDecorator('account', {
              rules: [{ required: true, message: '请输入指导教师工号!' }],
              validateTrigger: false,
            })(
              <Input
                placeholder={formValue.oAccount || '请输入指导教师工号'}
                disabled={disabled}
              />,
            )}
          </Form.Item>
          {/* <Form.Item label="指导教师职称:" wrapperCol={{ span: 5 }}>
            {getFieldDecorator('teacherTitle', {
              rules: [{ required: true, message: '请输入指导教师职称!' }],
              validateTrigger: false,
            })(
              <Input
                placeholder={formValue.tLevel || '请输入指导教师职称'}
                disabled={disabled}
              />,
            )}
          </Form.Item> */}
          <Form.Item label="项目来源:" wrapperCol={{ span: 5 }}>
            {getFieldDecorator('source', {
              rules: [{ required: true, message: '请输入项目来源!' }],
              validateTrigger: false,
            })(
              <Input
                placeholder={formValue.pSource || '学生自拟/导师提供'}
                disabled={disabled}
              />,
            )}
          </Form.Item>
          <Form.Item label="项目所属一级学科代码:" wrapperCol={{ span: 4 }}>
            {getFieldDecorator('code', {
              rules: [{ required: true, message: '请输入一级学科代码!' }],
              validateTrigger: false,
            })(
              <Input placeholder={formValue.pCode || ''} disabled={disabled} />,
            )}
          </Form.Item>
          <Form.Item label="项目简介:">
            {getFieldDecorator('introduction')(
              <Input.TextArea
                rows={4}
                placeholder={formValue.pIntroduce || '200字以内'}
                disabled={disabled}
              />,
            )}
          </Form.Item>
          <Form.Item label="立项申请书">
            {getFieldDecorator('pathFirst', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile('first'),
            })(
              <Upload
                name="file"
                action="http://localhost:8080/student/update"
                type=".doc,.docx"
              >
                {this.state.first && (
                  <Button>
                    <Icon type="upload" /> 上传文件
                  </Button>
                )}
              </Upload>,
            )}
          </Form.Item>
          <Form.Item label="中期检查报告">
            {getFieldDecorator('pathSecond', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile('second'),
            })(
              <Upload
                name="file"
                action="http://localhost:8080/student/update"
                type=".doc,.docx"
              >
                {this.state.second && (
                  <Button>
                    <Icon type="upload" /> 上传文件
                  </Button>
                )}
              </Upload>,
            )}
          </Form.Item>
          <Form.Item label="结题报告">
            {getFieldDecorator('pathThird', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile('third'),
            })(
              this.state.file.pathThird ? (
                <div>{this.state.file.pathThird}</div>
              ) : (
                <Upload
                  name="file"
                  action="http://localhost:8080/student/update"
                  type=".doc,.docx"
                >
                  {this.state.third && (
                    <Button>
                      <Icon type="upload" /> 上传文件
                    </Button>
                  )}
                </Upload>
              ),
            )}
          </Form.Item>
          {/* <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button type="primary" htmlType="save">
                保存
              </Button>
            </Form.Item> */}
          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button onClick={this.onSave} className="save-button">
              保存
            </Button>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const Wrapped = Form.create({ name: 'project' })(Project);

export default connect(
  (state) => state,
  actions,
)(withRouter(Wrapped));

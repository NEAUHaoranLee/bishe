import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actions } from 'store/store';
import { withRouter } from 'react-router-dom';
import {
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
    }
  }
  componentDidMount() {
    if (this.props.match.params.id) {
      this.setState({
        disabled: true,
      })
    }
    this.props.form.setFieldsValue({ projectName: 'lalala' });
    console.log(this.props.match)
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(null, (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  onSave = () => {
    const formValue = this.props.form.getFieldsValue();
    console.log(formValue);
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
            {/* <span className="ant-form-text">China</span> */}
            {getFieldDecorator('projectName', {
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
            {getFieldDecorator('projectType', {
              rules: [{ required: true, message: '请选择项目类型!' }],
            })(
              <Select
                placeholder={formValue.projectType || '请选择项目类型'}
                disabled={disabled}
              >
                <Select.Option value="1" key="1">
                  创新训练项目
                </Select.Option>
                <Select.Option value="2" key="2">
                  创业训练项目
                </Select.Option>
                <Select.Option value="3" key="3">
                  创业实践项目
                </Select.Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="项目负责人姓名:">
            {getFieldDecorator('oName', {
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
            {getFieldDecorator('collage', {
              rules: [{ required: true, message: '请选择所在学院!' }],
            })(
              <Select
                placeholder={formValue.collage || '所在学院'}
                disabled={disabled}
              >
                <Select.Option value="1" key="1">
                  电气与信息学院
                </Select.Option>
                <Select.Option value="2" key="2">
                  工程学院
                </Select.Option>
                <Select.Option value="3" key="3">
                  经管学院
                </Select.Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="负责人学号:" wrapperCol={{ span: 4 }}>
            {getFieldDecorator('oAccount', {
              rules: [{ required: true, message: '请输入学号!' }],
              validateTrigger: false,
            })(
              <Input
                placeholder={formValue.oAccount || '请输入学号'}
                disabled={disabled}
              />,
            )}
          </Form.Item>
          <Form.Item label="参与人数:" wrapperCol={{ span: 4 }}>
            {getFieldDecorator('projectMember', {
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
            {getFieldDecorator('memberInfo', {
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
            {getFieldDecorator('tName', {
              rules: [{ required: true, message: '请输入指导教师姓名!' }],
              validateTrigger: false,
            })(
              <Input
                placeholder={formValue.tName || '请输入指导教师姓名'}
                disabled={disabled}
              />,
            )}
          </Form.Item>
          <Form.Item label="指导教师职称:" wrapperCol={{ span: 5 }}>
            {getFieldDecorator('tLevel', {
              rules: [{ required: true, message: '请输入指导教师职称!' }],
              validateTrigger: false,
            })(
              <Input
                placeholder={formValue.tLevel || '请输入指导教师职称'}
                disabled={disabled}
              />,
            )}
          </Form.Item>
          <Form.Item label="项目来源:" wrapperCol={{ span: 5 }}>
            {getFieldDecorator('pSource', {
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
            {getFieldDecorator('pCode', {
              rules: [{ required: true, message: '请输入一级学科代码!' }],
              validateTrigger: false,
            })(<Input placeholder={formValue.pCode || ''} disabled={disabled} />)}
          </Form.Item>
          <Form.Item label="项目简介:">
            {getFieldDecorator('pIntroduce')(
              <Input.TextArea
                rows={4}
                placeholder={formValue.pIntroduce || '200字以内'}
                disabled={disabled}
              />,
            )}
          </Form.Item>
          <Form.Item
            label="Upload"
            extra="longgggggggggggggggggggggggggggggggggg"
          >
            {getFieldDecorator('upload', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button>
                  <Icon type="upload" /> Click to upload
                </Button>
              </Upload>,
            )}
          </Form.Item>

          <Form.Item label="Dragger">
            <div className="dropbox">
              {getFieldDecorator('dragger', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
              })(
                <Upload.Dragger name="files" action="/upload.do">
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload.
                  </p>
                </Upload.Dragger>,
              )}
            </div>
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
              Submit
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

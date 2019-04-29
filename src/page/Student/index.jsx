import React, { PureComponent } from 'react';
import { Upload, message, Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'store/store';
import NowProcess from 'components/nowProcess';
import './index.less';

class Student extends PureComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getStudentProcess({ account: this.props.userAccount });
  }
  renderChildren = () => {
    const { sProcess } = this.props;
    console.log(sProcess);
    return (
      <div className="my-project">
        我的项目：
        {(sProcess.projectList || []).length ? (
          <div className="project-block">
            {sProcess.projectList.map((item, index) => {
              return (
                <div key={index}>
                  <span>{item.status}: </span>
                  {sProcess.isCollect === '收取材料' ? (
                    <Link to={`/student/edit-project/${item.key}`}>
                      {item.fileName}
                    </Link>
                  ) : (
                    <span>{item.fileName}</span>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <Link to="/student/new-project">
            <div className="add">+</div>
          </Link>
        )}
      </div>
    );
  };
  render() {
    return (
      <div className="student-container">
        <div className="content-container">
          <NowProcess
            renderChildren={this.renderChildren}
            data={this.props.sProcess}
          />
        </div>
      </div>
    );
  }
}
export default connect(
  (state) => state,
  actions,
)(Student);

import React, { PureComponent } from 'react';
import './index.less';

export default class NowProcess extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { renderChildren } = this.props;

    return (
      <div className="now-process">
        <div className="title">{'2019 SIPT 立项申请'}</div>
        <div className="content">
          <div className="status">
            <span>当前进度：</span>
            {'  收取材料'}
          </div>
          <div className="start-time">
            <span>开始时间：</span>
            {'  2019-1-30'}
          </div>
          <div className="end-time">
            <span>结束时间：</span>
            {'  2019-6-30'}
          </div>
          {renderChildren && renderChildren()}
        </div>
      </div>
    );
  }
}

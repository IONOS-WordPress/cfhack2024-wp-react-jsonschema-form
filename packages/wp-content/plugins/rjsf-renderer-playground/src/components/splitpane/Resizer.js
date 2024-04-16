import React, { Component } from 'react';

import { paneTypeProperties } from './PaneType';

const BORDER = '5px solid #e0e0e0';

export default class SplitPane extends Component {

  render() {
    const {
      resizeCursor,
      resizerBorderBeginProp,
      resizerBorderEndProp,
      resizerMargin,
    } = paneTypeProperties[this.props.type];
    const resizerStyle = {
      [resizerBorderBeginProp]: BORDER,
      [resizerBorderEndProp]: BORDER,
      margin: resizerMargin,
      cursor: resizeCursor,
      order: 2,
      ...this.props.style,
    };
    return (
      <div
        style={resizerStyle}
        className={this.props.className}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
      />
    );
  }

}

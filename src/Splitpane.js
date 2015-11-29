/**
 * Splitpane Component for uxcore
 * @author zhouquan.yezq
 *
 * Copyright 2014-2015, Uxcore Team, Alinw.
 * All rights reserved.
 */

 // thanks for https://github.com/fkling/esprima_ast_explorer/blob/master/src/SplitPane.js

var baseStyleHorizontal = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  boxSizing: 'border-box',
};

var baseStyleVertical = {
  position: 'absolute',
  left: 0,
  right: 0,
  boxSizing: 'border-box',
};


class Splitpane extends React.Component {

    constructor(props) {

        super(props);
        this.state={
          dividerPosition: 50
        };

    }

    _onMouseDown() {

        var vertical = this.props.vertical;
        var max = vertical ? global.innerHeight : global.innerWidth;
        global.document.body.style.cursor = vertical ? 'row-resize' : 'col-resize';
        var moveHandler = function(event) {
          event.preventDefault();
          this.setState({
            dividerPosition: ((vertical ? event.pageY : event.pageX) / max) * 100});
        }.bind(this);
        var upHandler = function() {
          document.removeEventListener('mousemove', moveHandler);
          document.removeEventListener('mouseup', upHandler);
          global.document.body.style.cursor = '';

          if (this.props.onResize) {
            this.props.onResize();
          }
        }.bind(this);

        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('mouseup', upHandler);
  }

  render() {
      var children = this.props.children;
      var dividerPos = this.state.dividerPosition;
      var styleA;
      var styleB;
      var dividerStyle;

      if (!Array.isArray(children) || children.filter(x => x).length !== 2) {
        return (
          <div className={this.props.className}>
            <div style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}>
              {this.props.children}
            </div>
          </div>
        );
      }

      if (this.props.vertical) {
        // top
        styleA = {
          ...baseStyleVertical,
          top: 0,
          height: dividerPos + '%',
          paddingBottom: 3,
        };
        // bottom
        styleB = {
          ...baseStyleVertical,
          bottom: 0,
          height: (100 - dividerPos) + '%',
          paddingTop: 3,
        };
        dividerStyle = {
          ...baseStyleVertical,
          top: dividerPos + '%',
          height: 5,
          marginTop: -2.5,
          zIndex: 100,
        };
      } else {
        // left
        styleA = {
          ...baseStyleHorizontal,
          left: 0,
          width: dividerPos + '%',
          paddingRight: 3,
        };
        // right
        styleB = {
          ...baseStyleHorizontal,
          right: 0,
          width: (100 - dividerPos) + '%',
          paddingLeft: 3,
        };
        dividerStyle = {
          ...baseStyleHorizontal,
          left: dividerPos + '%',
          width: 5,
          marginLeft: -2.5,
          zIndex: 100,
        };
      }

      return (
        <div className={this.props.className}>
          <div style={styleA}>
            {this.props.children[0]}
          </div>
          <div
            className={
              'splitpane-divider' + (this.props.vertical ? ' vertical' : '')
            }
            onMouseDown={this._onMouseDown.bind(this)}
            style={dividerStyle}
          />
          <div style={styleB}>
            {this.props.children[1]}
          </div>
        </div>
      )
    }
}

Splitpane.defaultProps = {
}

// http://facebook.github.io/react/docs/reusable-components.html
Splitpane.propTypes = {
}

Splitpane.displayName = "Splitpane";

module.exports = Splitpane;

/**
 * Splitpane Component Demo for uxcore
 * @author zhouquan.yezq
 *
 * Copyright 2014-2015, Uxcore Team, Alinw.
 * All rights reserved.
 */

let classnames = require('classnames');

let SplitPane = require('../src');

class Demo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
              <SplitPane
                className="splitpane"
                vertical={true}
                >
                     <div>Component 1</div>
                     <div>
                      <SplitPane
                      className="splitpane"
                      >
                        <div>Component 2</div>
                        <div>Component 3</div>
                      </SplitPane>
                     </div>
              </SplitPane>
            </div>
        );
    }
};

module.exports = Demo;

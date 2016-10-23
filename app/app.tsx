import * as React from 'react';
import * as ReactDOM from 'react-dom';

var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Hello, world! I am a CommentBox. new
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox />,
  document.getElementById('main')
);
var json_test_data = [
  {author: "Pete Hunt", text: "This is one comment"},
  {author: "Jordan Walke", text: "This is *another* comment"}
];

var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      data: {},
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        //console.error(this.props.url, status, err.toString());
        console.log(err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    var title = "1989's Chat";
    return (
      <div className="commentBox">
        <div className="commentWell col-md-8">
        <h3>{title}</h3>
          <hr/>
          <CommentList data={this.state.data} />
        </div>
        <div className="col-md-4">
        <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
        </div>
        
      </div>
    );
  }
});


var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <dl className="commentList dl-horizontal">
        {commentNodes}
      </dl>
    );
  }
});


var Comment = React.createClass({
  render: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return (
      <div className="comment">
        <dt className="commentAuthor">
          {this.props.author}
        </dt>
        <dd>
          <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
        </dd>
      </div>
    );
  }
});


var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var author = React.findDOMNode(this.refs.author).value.trim();
    var text = React.findDOMNode(this.refs.text).value.trim();
    if (!text || !author) {
      return;
    }

    this.props.onCommentSubmit({author: author, text: text});
    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';
    return;
  },
  render: function() {
    return (
      <form className="well commentForm" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Your name" ref="author"/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Say something..." ref="text"/>
        </div>
        <input type="submit" className="btn btn-primary" value="Post Comment" />
      </form>
    );
  }
});


React.render(
  <CommentBox url="myserver.php" pollInterval={2000} />,
  document.getElementById('content')
);
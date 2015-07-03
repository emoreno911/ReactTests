var SimpleList = React.createClass({
	getInitialState: function() {
	    return {
	        simpleList:
	          [
	              {
	                  row: 'cargando    ...'
	              }
	          ]
	    };
	},
	componentDidMount: function() {
	    $.ajax({
	          url: this.props.url,
	          dataType: 'json',
	          success: function(data) {
	          	  console.log(data);
	              this.setState({simpleList: data});
	          }.bind(this),
	             error: function(xhr, status, err) {
	              console.error(this.props.url, status, err.toString())
	          }.bind(this)
	    });
	},
    render: function() {
        return (
			<span>
				<p><strong>Pasos para dominar un nuevo lenguaje de programación:</strong></p>
				<SimpleListRow simpleList={this.state.simpleList}/>
			</span>
		);
    }
});
 
var SimpleListRow = React.createClass({
    render: function() {
        var rows = this.props.simpleList;
        return (
			<ol>
				{rows.map(function(element) {
					return (
						<li>{element.row}</li>
					);
				})}
			</ol>
		);
    }
});

React.render(
    <SimpleList url="tasks.json"/>,
    document.getElementById('simpleList')
)
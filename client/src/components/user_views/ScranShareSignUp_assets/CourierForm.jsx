var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var CourierForm = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function() {
    return {first_name: '', last_name: '', phone: '', err: 'error'};
  },
  handleTest: function(e){
    e.preventDefault();
    this.setState({error: "Test error"});
  },
  handleSubmit: function(e){
    e.preventDefault();
    var request = new XMLHttpRequest();
    console.log("POST", this.props.url+'couriers')
    request.open("POST", this.props.url+'couriers');
    request.setRequestHeader("Content-Type", "application/json");
    request.withCredentials = true;
    request.onload = function(){
      if(request.status === 200){
        this.setState({err: request.status});
        window.location.reload();
      }else {
        this.setState({err: request.status})
        console.log("error posting courier data", request.status)
      }
    }.bind(this)
    var data = {
      first_name:this.state.first_name,
      last_name:this.state.last_name,
      phone:this.state.phone
    }
    request.send(JSON.stringify(data));
  },
  render: function() {
    return (
      <div>
        <button value="none" onClick={this.props.selectType} type="submit" className="pure-button pure-button-primary"> <i className="fa fa-arrow-left" aria-hidden="true"> </i> Go Back! </button>

        <form className="pure-form pure-form-aligned">
        <fieldset>

          <div className="pure-control-group">
            <label for="first_name">First Name</label>
            <input valueLink={this.linkState('first_name')} id="first_name" type="text" placeholder="First Name"/>
          </div>

          <div className="pure-control-group">
            <label for="last_name">Last Name</label>
            <input valueLink={this.linkState('last_name')} id="last_name" type="text" placeholder="Last Name"/>
          </div>

          <div className="pure-control-group">
            <label for="phone">Phone Number</label>
            <input valueLink={this.linkState('phone')} id="phone" type="text" placeholder="Phone Number"/>
          </div>

          <div className="pure-controls">
          <button onClick={this.handleSubmit} type="submit" className="pure-button pure-button-primary"> <i className="fa fa-check" aria-hidden="true"></i> Submit</button>
          </div>

        </fieldset>
        </form>
      </div>
      )
  }
});

module.exports = CourierForm;


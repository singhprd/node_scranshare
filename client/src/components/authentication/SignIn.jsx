var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var classNames = require( 'classnames' ); 

var SignIn = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function(){
    return {email:"", password:"", error: false};
  },
  signIn:function(e){
    e.preventDefault();
    this.setState({error: false});
    var request = new XMLHttpRequest();
    request.open("POST", this.props.url);
    request.setRequestHeader("Content-Type", "application/json");
    request.withCredentials = true;
    request.onload = function(){
      if(request.status === 201){
        let user = JSON.parse(request.responseText)
        this.props.onSignIn(user);
      }else if(request.status === 401){
        this.setState({error:true});
      }
    }.bind(this)
    var data = {
      user:{
        email:this.state.email,
        password:this.state.password
      }
    }
    request.send(JSON.stringify(data));
  },
  render: function() {
    var btnClass = classNames({
      "pure-button": true,
      'pure-button-primary': true,
      "buttonError": this.state.error
    });
    return (
      <form onSubmit={this.signIn} className="pure-form pure-form-stacked">
        <input type="text" valueLink={this.linkState('email')} placeholder="Email" />
        <input type="password" valueLink={this.linkState('password')} placeholder="Password" />
        <button className={btnClass} onClick={this.signIn}>  Sign In </button>
      </form>
    );
  }
});

module.exports = SignIn;

var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var classNames = require( 'classnames' ); 

var SignUp = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function(){
    return {email:"", password:"", passwordConfirmation:"", error:false};
  },

  
  signIn:function(e){
    e.preventDefault();
    this.setState({error:false});
    var request = new XMLHttpRequest();
    request.open("POST", this.props.url);
    request.setRequestHeader("Content-Type", "application/json");
    request.withCredentials = true;
    request.onload = function(){
      if(request.status === 201){
        let user = JSON.parse(request.responseText)
        this.props.onSignUp(user);
      }else {
        this.setState({error:true});
      }
    }.bind(this)
    var data = {
      user:{
        email:this.state.email,
        password:this.state.password,
        password_confirmation: this.state.passwordConfirmation
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
      <input type="password" valueLink={this.linkState('passwordConfirmation')} placeholder="Password Confirmation" />
      <button className={btnClass} onClick={this.signIn}>  Sign Up </button>
      </form>
      );
  }
});

module.exports = SignUp;
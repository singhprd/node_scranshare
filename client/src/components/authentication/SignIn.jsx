var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var classNames = require( 'classnames' ); 

var SignIn = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function(){
    return {email:"", password:"", error: false, messageGiven:false};
  },
  signIn:function(e){
    e.preventDefault();
    var request = new XMLHttpRequest();
    request.open("POST", this.props.url);
    request.setRequestHeader("Content-Type", "application/json");
    request.withCredentials = true;
    this.setState({error:false});
    request.onload = function(){
      if(request.status === 201){
        let user = JSON.parse(request.responseText)
        this.props.onSignIn(user);
      }else if(request.status === 401){
        this.setState({error:true});
        this.setState({messageGiven:true});

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
    var errorMessage;
    var buttonText = "Sign In";
    if(this.state.messageGiven == true){
      errorMessage = "wrong email or password"
      buttonText = "try again?"
    }
    return (
      <div>
        <form onSubmit={this.signIn} className="pure-form pure-form-stacked">
          <input type="text" valueLink={this.linkState('email')} placeholder="Email" />
          <input type="password" valueLink={this.linkState('password')} placeholder="Password" />
          <button type="button" className={btnClass} onClick={this.signIn}>{buttonText}</button>
        </form>
        <p id="login-error-message">{errorMessage}</p>
      </div>
    );
  }
});

module.exports = SignIn;

var Promise = require('es6-promise').Promise;
var React = require('react');
var ReactDOM = require('react-dom');
var Main = require('./components/Main.jsx');
var url = "https://scransharerails.herokuapp.com/";

window.onload = function() {
  ReactDOM.render(
    <Main url={url}></Main>,
    document.getElementById('app')
  );
};
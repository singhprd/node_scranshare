var React = require('react');
var SignOut = require('../authentication/SignOut.jsx');
var CourierNavbar = require('../couriernavbar.jsx')
var GoogleMap = require('../GoogleMap');
var ShowAllJobs = require('../ShowAllJobs.jsx')
var JobList = require('../JobList.jsx')

var CourierView = React.createClass({
  getInitialState: function() {
    return {currentView: "mapview"}
  },
  changeView: function(view) {
    this.setState({currentView: view});
  },
  handleTakeJob:function(job){
    // optimistic load
    var jobs = this.props.jobs.map(function(each){
      if (each === job) {
        each.courier_id = this.props.currentUser.id;
        // console.log(each)
        return each;
      } else {
       return each; 
      }
    }.bind(this));
    this.props.forceUpdateState({jobs: jobs})

    // job.courier_id = this.props.currentUser.id;
    // this.props.forceUpdateState({jobs: job});
    // api post
    var updateUrl = this.props.url + "jobs/" + job.id;
    var object = {accepted: true};
    var request = new XMLHttpRequest();
    request.open("PUT", updateUrl, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.withCredentials = true;
    request.send(JSON.stringify(object));

    // this.props.fetchJobs();
  },
  // release job
  handleCancelJob:function(job){
    // optimistic load
    // console.log(this.props.jobs);
    var jobs = this.props.jobs.map(function(each){
      if (each.id === job.id) {
        each.courier_id = null;
        // console.log(each)
        return each;
      } else {
       return each; 
      }
    }.bind(this));
    // console.log(jobs);
    this.props.forceUpdateState({jobs: jobs});

    // Api request
    var updateUrl = this.props.url + "jobs/" + job.id;
    var object = {accepted: false};
    var request = new XMLHttpRequest();
    request.open("PUT", updateUrl, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.withCredentials = true;
    request.send(JSON.stringify(object))

    // this.props.fetchJobs();
  },

  handleCompleteJob:  function(job){
    // console.log("trying to send complete job to db")
    var updateUrl = this.props.url + "jobs/" + job.id;  
    var object = {completed: true};
    var request = new XMLHttpRequest();
    request.open("PUT", updateUrl, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.withCredentials = true;
    request.send(JSON.stringify(object))

    this.props.fetchJobs();
  },

  render: function() {
    var toDisplay
    switch(this.state.currentView){
      case "mapview":
        toDisplay = <GoogleMap jobs={this.props.jobs} onTakeJob={this.handleTakeJob} onCancelJob={this.handleCancelJob} onCompleteJob={this.handleCompleteJob}/>
      break;
      case "showalljobs":

        toDisplay = <JobList jobs={this.props.jobs} onTakeJob={this.handleTakeJob} onCancelJob={this.handleCancelJob} onCompleteJob={this.handleCompleteJob} address="true">Jobs</JobList>

      break;
      default:
        console.log("default")
    }
    
    return (
      <div> 
        <CourierNavbar changeView= {this.changeView} url={this.props.url} onSignOut={this.props.onSignOut}></CourierNavbar>
        {toDisplay}
      </div>
      )
  }
})


module.exports=CourierView;


var React = require('react');

var Address = React.createClass({
  render:function(){
    return(
      <div className = "address-box">
        <ul>
        <h4 className="address-header">{this.props.company.name}</h4>
        <p className="address-details">{this.props.company.contactDetails.address1}, {this.props.company.contactDetails.address2}, {this.props.company.contactDetails.address3} </p>
        <p className="address-details">{this.props.company.contactDetails.postcode}</p>
        <p className="address-details">Phone: {this.props.company.contactDetails.phone}</p>
        <a href ={"mailto:" + this.props.company.contactDetails.email}>{this.props.company.contactDetails.email}</a>
        </ul>
    </div>
    );
  }
});

module.exports = Address;
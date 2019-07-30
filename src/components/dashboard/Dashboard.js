import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import PropAtelier from "../propAtelier/propAtelier";
import Ajoutatelier from "../newAtelier/NewAtelier"
import './dashboard.css'
import Menu from "../design/menu/menu"

class Dashboard extends Component {

  
onLogoutClick = e => {
  e.preventDefault();
  this.props.logoutUser();
};
  render() {
    console.log('localStorage.local sur dashbord'+localStorage.id);
    
    // const { user } = this.props.auth;

    return (
      
      <div>
       <Menu/>
      <div className="container-fluid" id="dash">
      <div className=" valign-wrapper">
        <div className="container-fluid">
        <div className="row">
          <div class="vertical-menu">
            <a id="ajoutbouton" onClick={()=>{
              document.getElementById('ajoutatelier').style.display = "block"
              document.getElementById('tableau').style.display ="none"
            }} href="#dss">
                Ajouter
            </a>
            <a  id="listerbout" onClick={()=>{
                  document.getElementById('tableau').style.display = "block"
                  document.getElementById('ajoutatelier').style.display = "none"
              }} href="#dss">
                  Listes des ateliers
              </a>
            <a  id="deconnect"
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable  accent-3"
              href="#dss">
              Deconnecter
            </a>
          </div>

          <div className= "col-md-10">
          <Ajoutatelier/>
          <PropAtelier/>
          </div>
        </div>
        </div>
      </div>
      
      </div>

      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);

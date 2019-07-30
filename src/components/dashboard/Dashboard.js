import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import PropAtelier from "../propAtelier/propAtelier";
import Ajoutatelier from "../newAtelier/NewAtelier"

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
          <div className="col-md-2">
            <h4>
             Henri
            </h4>
            <button id="ajoutbouton" onClick={()=>{
              document.getElementById('ajoutatelier').style.display = "block"
              document.getElementById('tableau').style.display ="none"
            }}>
                Ajouter
            </button>
            <button  id="listerbout" onClick={()=>{
                  document.getElementById('tableau').style.display = "block"
                  document.getElementById('ajoutatelier').style.display = "none"
              }}>
                  Listes des ateliers
              </button>
            <button  id="deconnect"
              style={{
                width: "150px",
                borderRadius: "5px",
                
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable  accent-3"
            >
              Deconnecter
            </button>
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

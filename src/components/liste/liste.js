import React, { Component } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class ListTout extends Component {

    constructor(props) {
        super(props);
        this.state = { produit: [] };

    }
    componentDidMount() {
        axios.get('https://back-projet.herokuapp.com/api/users/newArticle')
            .then(response => {
                console.log('i am a response', response)
                this.setState({ produit: response.data });
                console.log('i am a produit', this.state.produit)
            })
            .catch(function (error) {
                console.log(error);
            })



    }

    liste() {
        return <div>
            <div className="container-fluid">

                {
                    (this.state.produit.length > 0) ? (this.state.produit.filter((params) => params.visib).map((obj) => {
                        return <div className="container-fluid">
                            <div id="ligne" className="card" key={obj._id}>
                                <div className="container">
                                    <center><img className="card " width="50%" height="5%"
                                        src={'https://back-projet.herokuapp.com/api/users/newArticleImage/' + obj.image}
                                        alt="pdp" /></center>
                                    
                                </div>
                                <center>
                                <div className="card-body card-body-cascade">

                                    <center><h2 id="description"><span id="nomproduit">{obj.titre}</span></h2></center>
                                    <div className="row">
                                        <div className="col-md-6">

                                            <p className="card-text"><strong><span id="description">Description</span></strong>&nbsp;&nbsp; <div id="point">{obj.description}</div> </p>
                                            <p className="card-text"><strong><span id="description">Date</span></strong>&nbsp;&nbsp; <div id="point">{obj.date}</div> </p>
                                            <p className="card-text"><strong><span id="description">Nombre de place disponible</span></strong>&nbsp;&nbsp; <div id="point">{obj.duree}</div> </p>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="card-text"><strong><span id="description">Horaire de debut</span></strong>&nbsp;&nbsp; <div id="point">{obj.debut}</div> </p>
                                            <p className="card-text" id="colonne2"><strong><span id="description">Durée de l'atelier</span></strong>&nbsp;&nbsp; <div id="point">{obj.duree}</div> </p>
                                            <p className="card-text"><strong><span id="description">Nombre de place reserve</span></strong>&nbsp;&nbsp; <div id="point">{obj.placeRes}</div> </p>
                                        </div>
                                    </div>
                                    <span className="spanprix">
                                        <strong>Prix: {obj.prix} £</strong>
                                    </span><br />
                                    
                                        <button class="btn btn-success" onClick={() => {
                                            confirmAlert({
                                                customUI: ({ onClose }) => {
                                                    return (
                                                        <center>
                                                            <div id="mail" className='custom-ui'>
                                                                <div >
                                                                    <h4> {obj.Titre}</h4>
                                                                    <input name="nom" onChange={this.handleChange}
                                                                        value={this.state.value} placeholder="Nom" /><br></br>
                                                                    <input name="prenom" placeholder="Prenom" onChange={this.handleChange} value={this.state.value} /><br></br>
                                                                    <input name="phone" placeholder="Numero téléphone" onChange={this.handleChange} value={this.state.value} /><br></br>
                                                                    <input name="email" placeholder="Email" onChange={this.handleChange} value={this.state.value} /><br></br>

                                                                    <button type="button" class="btn btn-warning" onClick={() => {
                                                                        axios.post("https://back-projet.herokuapp.com/api/users/particulier/" + obj._id, {
                                                                            nom: this.state.nom,
                                                                            prenom: this.state.prenom,
                                                                            phone: this.state.phone,
                                                                            email: this.state.email

                                                                        }).then(res => {
                                                                            console.log(res.data);
                                                                            axios.get("https://back-projet.herokuapp.com/api/users/newArticle").then(res => {

                                                                                this.setState({ profil: res.data })
                                                                                console.log(this.state.profil)

                                                                            })
                                                                        })

                                                                        onClose();
                                                                    }}
                                                                    >
                                                                        confirmer
                                                                </button>
                                                                    <button type="button" class="btn btn-danger" onClick={onClose}>Annuler</button>
                                                                </div>

                                                            </div></center>
                                                    );
                                                }
                                            });
                                        }} >S'inscrire</button>
                                    </div>

                                    </center>
                                </div>
                            </div>

                            })) : ('')
                        }
        
            </div>
        </div>
            }
    render() {
        return (
            <div>
                    {this.liste()}
                </div>
                );
            }
}
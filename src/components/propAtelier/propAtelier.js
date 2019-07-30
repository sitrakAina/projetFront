import React, { Component } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

export default class PropAtelier extends Component {

    constructor(props) {
        super(props);
        this.state = { profil: [] };

    }
    componentDidMount() {
        axios.get(`https://back-projet.herokuapp.com/api/users/newArticle/${localStorage.id}`)
            .then(response => {
                console.log('user-article ==== ', response)
                this.setState({ profil: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })



    }

    liste() {
        return <table className="table table-bordered" id="tableau">
            <thead>
                <tr>
                    <th>titre</th>
                    <th>prix</th>
                    <th>description</th>
                    <th>photo</th>
                    <th>Durée</th>
                    <th>Reservation</th>
                    <th>Date</th>
                    <th>P.disponible</th>
                    <th>actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    (this.state.profil.length > 0) ? (this.state.profil.map((obj) => {

                        return <tr key={obj._id}>
                            <td>{obj.titre}</td>
                            <td>{obj.prix}</td>
                            <td id="des">{obj.description}</td>
                            <td>
                                <img width="150px" height="50px" src={'https://back-projet.herokuapp.com/api/users/newArticleImage/' + obj.image} alt="pdp" />
                            </td>
                            <td>{obj.duree} </td>
                            <td>{obj.placeRes}</td>
                            <td>{obj.date}</td>
                            <td>{obj.place}</td>
                            <td>
                                <Link to={"/modifierAtl/" + obj._id}  class="btn btn-warning">Modifier</Link>
                           

                            {obj.visib === true ? (<button  class="btn btn-success" onClick={(e) => {
                                e.preventDefault()
                                axios.get(" https://back-projet.herokuapp.com/api/users/cacherAtl/" + obj._id).then(res => {
                                    axios.get('https://back-projet.herokuapp.com/api/users/newArticle/' + localStorage.id).then(res => {
                                        console.log(res.data)
                                        this.setState({ profil: res.data })
                                    })
                                    console.log(res.data)
                                })


                            }}></button>) : (<button   class="btn btn-warning" onClick={(e) => {
                                e.preventDefault()
                                console.log(obj._id)
                                axios.get("https://back-projet.herokuapp.com/api/users/affichAtl/" + obj._id).then(res => {
                                    axios.get('https://back-projet.herokuapp.com/api/users/newArticle/' + localStorage.getItem('id')).then(res => {
                                        console.log(res.data)
                                        this.setState({ profil: res.data })
                                    })
                                    console.log(res.data)
                                })

                            }}></button>)}</td>
                        </tr>

                    })) : ('')
                }
            </tbody>
        </table>
    }
    render() {
        return (
            <div className='app1'>
                {this.liste()}
            </div>
        );
    }
}
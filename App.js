import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import axios from "./axios";

import HomeScreen from "./Containers/HomeScreen";
import DetailScreen from "./Containers/DetailSreen";
import ActorScreen from "./Containers/ActorScreen";
import AddMovie from './Components/AddMovie';
import AddActor from './Components/AddActor';
import CreateUser from './Components/CreateUser';
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Sectionimg from "./Components/Section";

class App extends Component {
    state = {};

    _onLogin = () => {
        axios
            .post("/api/auth", {
                username: "admin",
                password: "123456"
            })
            .then(response => {
                console.log(response)
                this.setState({
                    username: response.data.username,
                    id: response.data.id
                })
            })
            .catch(err => console.error(err));
    };

    render() {
        let imgUrl = 'img/bg.jpg';
        return (
            <BrowserRouter>
                <div className="App">


                    <div className='Component-Bg'
                        style={{
                            backgroundImage: 'url(' + imgUrl + ')',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat',
                        }}>
                    </div>
                    <Route
                        exact
                        path="/"
                        render={props => {

                            return (<h5> Home Screen</h5> ,
                                <NavBar />);

                        }}
                    />
                    <Route
                        path="/movie"
                        render={props => {
                            return <HomeScreen
                                {...props}
                                username={this.state.username}
                                onLogin={this._onLogin}
                            />;
                        }}
                    />
                    <Route
                        path="/createNew"
                        render={props => {
                            return <AddMovie {...props}
                            username={this.state.username}
                            onLogin={this._onLogin}
                           
                             />
                        }}
                    />
                     <Route
                        path="/addNew"
                        render={props => {
                            return <AddActor {...props}
                            username={this.state.username}
                            onLogin={this._onLogin}
                           
                             />
                        }}
                    />
                    <Route
                        path="/addUser"
                        render={props => {
                            return <CreateUser {...props}
                            username={this.state.username}
                            onLogin={this._onLogin}
                           
                             />
                        }}
                    />

                    <Route
                        path="/movies/:movieId"
                        render={props => {
                            return <DetailScreen
                                {...props}
                                username={this.state.username}
                                onLogin={this._onLogin}
                            />;
                        }}
                    />
                    <Route
                        path="/actor"
                        render={props => {
                            return <ActorScreen
                                {...props}
                                username={this.state.username}
                                onLogin={this._onLogin}
                            />;
                        }}
                    />
                    <Sectionimg>   </Sectionimg>
                </div>

            </BrowserRouter>
        );
    }
}

export default App;
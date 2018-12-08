import React, { Component } from 'react';
import axios from "../axios";
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import "../App.css";

import NavBar from "../Components/NavBar";
class AddMovie extends Component {

    state = {
       title: '',
       description: '',
       image: '',
       duration: '',
       year: '',
       review:[],
       actor:[]
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const movieData = {
            title: this.state. title,
            description: this.state.description,
            image: this.state. image,
            duration: this.state.duration,
            year:   this.state. year,
            review:this.state.review,
            actor:this.state.actor
        }
        axios
            .post("api/movies",  movieData)
            .then(response => {
                console.log(response.data);
                if (response.data.success) {
                    window.location.href = "/";
                }
            })
            .catch(err => console.log(err))
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div>
            <NavBar
                   
            username={this.props.username}
            onLogin={this.props.onLogin}
            /> 
            <Container>
                      
                  
                    
                <h1 className="row12 col-12 text-light">Add New Movie's Information: </h1>
                <Form className="row32 col-6 text-light" onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label>Movie's Name: </Label>
                        <Input name="title" placeholder="Enter title" onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Description: </Label>
                        <Input name="description" placeholder="tell me" onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label> Image: </Label>
                        <Input name="image" type="file" placeholder="Enter a link" onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Duration: </Label>
                        <Input name="duration" type="text"  onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Year: </Label>
                        <Input name="year" type="number"  onChange={this.handleInputChange} />
                    </FormGroup>
                    <div className="d-flex justify-content-center">
                        <Button color="primary">Submit</Button>
                    </div>
                </Form>
            </Container>
            </div>
        );
    }
}

export default AddMovie;     
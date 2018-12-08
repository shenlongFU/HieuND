import React, { Component } from 'react';
import axios from "../axios";
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import "../App.css";

import NavBar from "../Components/NavBar";
class AddActor extends Component {

    state = {
       name: '',
      
       image: '',
       dob: '',
       nationality: ''
     
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const actorData = {
           name: this.state.name,
           
            image: this.state. image,
            dob: this.state.dob,
          
           nationality:this.state.nationality
        }
        axios
            .post("api/actors",  actorData)
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
                      
                  
                    
                <h1 className="row12 col-12 text-light">Add New Actor's Information: </h1>
                <Form className="row32 col-6 text-light" onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label>Actor's Name: </Label>
                        <Input name="name" placeholder="Enter name" onChange={this.handleInputChange} />
                    </FormGroup>
                    
                    <FormGroup>
                        <Label> Image: </Label>
                        <Input name="image" type="file" placeholder="Enter a link" onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Date of Birth: </Label>
                        <Input name="dob" type="text"  onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Nationality: </Label>
                        <Input name="nationality" type="text"  onChange={this.handleInputChange} />
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

export default AddActor;     
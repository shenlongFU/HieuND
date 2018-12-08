import React, { Component } from 'react';

import axios from "../axios";
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';

class CreateUser extends Component {

    state = {
        name: '',
        email: '',
       hashPassword: '',
       avatar: '',
       intro: '',
       review:['']
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            name: this.state.name,
            email: this.state.email,
            hashPassword: this.state.hashPassword,
            avatar: this.state.avatar,
            intro:   this.state.intro,
            review:this.state.review
        }
        axios
            .post("api/users",  userData)
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
            <Container>
                <h3 className="mt-5 ml-2">Add user Information: </h3>
                <Form className="mt-2" onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label>Name: </Label>
                        <Input name="name" placeholder="Enter name" onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Email: </Label>
                        <Input name="email" placeholder="Enter email" onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label> Password: </Label>
                        <Input name="password" type="password" placeholder="Enter pass" onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Introduction: </Label>
                        <Input name="intro" type="text" placeholder="About yourself" onChange={this.handleInputChange} />
                    </FormGroup>
                    <div className="d-flex justify-content-center">
                        <Button color="primary">Submit</Button>
                    </div>
                </Form>
            </Container>
        );
    }
}

export default CreateUser;     
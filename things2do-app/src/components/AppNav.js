import React from 'react';
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';

class AppNav extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            searchValue: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({searchValue: event.target.value});
    }

    handleSubmit(event){
        alert("You are searching for: " + this.state.searchValue);
        this.setState({searchValue: ""});
        event.preventDefault();
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand>
                    Things2Do
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="mynavbar-nav" />
                <Navbar.Collapse id="mynavbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link hred="#about">About</Nav.Link>
                    </Nav>
                    <Form inline onSubmit={this.handleSubmit}>
                        <FormControl type="text" value={this.state.searchValue} onChange={this.handleChange} placeholder="Search" className="mr-sm-2" />
                        <Button type="submit">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default AppNav;
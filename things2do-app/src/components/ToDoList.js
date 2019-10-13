import React from 'react';
import { Container, Row, Col, Form, FormControl, Button, FormLabel } from 'react-bootstrap';

const API_BASE = "http://localhost:3001";

var ToDo = {};

ToDo.ToDoList = class ToDoList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            todoList: null
        }

        this.handleItemAdded = this.handleItemAdded.bind(this);
        this.handleListUpdated = this.handleListUpdated.bind(this);
    }

    componentDidMount() {
        this.fetchToDoList();
    }

    handleItemAdded(event){
        this.fetchToDoList();

        this.forceUpdate();
    }

    handleListUpdated(event){
        this.fetchToDoList();

        this.forceUpdate();
    }

    fetchToDoList() {
        fetch(API_BASE + "/todo")
            .then(response => response.json())
            .then(data => this.setState({ todoList: data })
            );

        return this.state.todoList;
    }

    render() {
        return (
            <Container className="todoList" fluid="true">
                <Row className="todoList-Intro">
                    <Col>
                        <h1>Things2Do: Get stuff done!</h1>
                        <p>A simple todo list example application using React</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ToDo.ToDoPostForm />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ToDo.ToDoListContent 
                            todoList={this.state.todoList} 
                            onListUpdated={this.handleListUpdated}
                            />
                    </Col>
                </Row>
            </Container>
        );
    }
}

ToDo.ToDoPostForm = class ToDoPostForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: null,
            description: null,
            done: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        fetch(
            API_BASE + "/todo",
            {
                headers: { "Content-Type": "application/json; charset=utf-8" },
                method: "POST",
                body: JSON.stringify({
                    title: this.state.title,
                    description: this.state.description,
                    done: this.state.done
                })
            }
        );

        this.props.doItemAdded();

        event.prevendDefault();
    }

    render() {
        return (
            <Container className="todoPostForm">
                <Row>
                    <Col>
                        <h2>Add new ToDo item:</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <Form.Control type="text" name="title" placeholder="Title" onChange={(e) => this.setState({ title: e.target.value })} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control as="textarea" name="description" placeholder="Description" onChange={(e) => this.setState({ description: e.target.value })} />
                            </Form.Group>
                            <Form.Group textAlign="right">
                                <Button type="submit">Add Item</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>

        );
    }
}

ToDo.ToDoListContent = class ToDoListContent extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            seqNo: 0
        }

        this.handleItemDeleted = this.handleItemDeleted.bind(this);
    }

    handleItemDeleted(event){
        this.props.onListUpdated(this);

        this.setState({seqNo: this.state.seqNo + 1});
    }

    render() {
        return (
            <Container className="todoListContent">
                <Row>
                    <Col>
                        <h2>ToDo List:</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.renderList()}
                    </Col>
                </Row>
            </Container>
        );

    }

    renderList() {
        if (this.props.todoList != null && this.props.todoList.length > 0) {
            return (
                this.props.todoList.map(i =>
                    <ToDo.ToDoItem 
                        id={i.id} 
                        title={i.title} 
                        description={i.description} 
                        done={i.done} 
                        onDeleted={this.handleItemDeleted}
                        />
                )
            );
        }
        else {
            return (
                <p>Nothing to show</p>
            );
        }
    }
}

ToDo.ToDoItem = class ToDoItem extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            done: this.props.done
        }

        this.handleClickMarkDone = this.handleClickMarkDone.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);
    }

    handleClickMarkDone(event) {
        this.setState({done: true});

        fetch(
            API_BASE + "/todo/" + this.props.id,
            {
                headers: { "Content-Type": "application/json; charset=utf-8" },
                method: "PATCH",
                body: JSON.stringify({
                    done: true
                })
            }
        )
    }

    handleClickDelete(event) {
        fetch(
            API_BASE + "/todo/" + this.props.id,
            {
                method: "DELETE"
            }
        );

        this.props.onDeleted();
    }

    render() {
        return (
            <Container className={this.state.done ? "todoItem done" : "todoItem"}>
                <Row>
                    <Col>
                        <Row>
                            <Col className="todoItemTitle">
                                {this.props.title}
                            </Col>
                        </Row>
                        <Row>
                            <Col className="todoItemDescription">
                                {this.props.description}
                            </Col>
                        </Row>
                    </Col>
                    <Col className="todoItemActions">
                        {this.state.done !== true
                            ? <Button onClick={this.handleClickMarkDone}>Mark Done</Button>
                            : <b>Done!</b>
                        }
                        <Button variant="danger" onClick={this.handleClickDelete}>Delete</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ToDo.ToDoList;
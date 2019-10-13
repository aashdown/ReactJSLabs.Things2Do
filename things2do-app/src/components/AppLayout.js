import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import AppHeader from './AppHeader';
import AppNav from './AppNav';
import ToDoList from './ToDoList';

class AppLayout extends React.Component {
    render() {
        return (
            <Container fluid="true">
                <Row>
                    <Col>
                        <AppHeader />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <AppNav />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ToDoList />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default AppLayout;
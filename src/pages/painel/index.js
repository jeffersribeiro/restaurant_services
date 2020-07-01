import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import Card from "./components/card";

import ViewModal from "./components/modal";
import Billets from "./components/billet";
import { logout } from "../../services/auth";

class Painel extends Component {
 
  handleLogout = (e) => {
    logout();
    this.props.history.push("/");
  };

  render() {
    return (
      <Container className="h-100" fluid>
        <Row className="justify-content-between m-2">
          <ViewModal />
          <Button href="/" variant="primary" onClick={this.handleLogout}>
            Logout
          </Button>
        </Row>
        <Row className="mv-2">
          <Col>
            <Billets />
          </Col>
          <Col xs lg="3" md="auto">
            <Card />
          </Col>
        </Row>
        <Row className="m-2"></Row>
      </Container>
    );
  }
}

export default withRouter(Painel);

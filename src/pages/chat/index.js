import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container, Button, Row, Form } from "react-bootstrap";
import { database, auth } from "../../services/firebase";

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
      data: [],
      counter: 0,
    };
  }
  sendMessage = (e) => {
    e.preventDefault('chats/chat1');
    let { message,counter } = this.state;
    let userId = auth.currentUser.uid;
    database.ref(`chats/chat1/${counter}`).set({
      userId: userId,
      msg: message,
      date: `${new Date()}`,
    });
    this.setState({
      message: "",
      counter: this.state.counter + 1,
    });
  };

  componentDidMount() {
    database
      .ref(`chats/chat1`)
      .once("value")
      .then((res) => {
        this.setState({
          data: res.val(),
        });
      });
  }

  componentDidUpdate() {
    database
      .ref(`chats/chat1`)
      .once("value")
      .then((res) => {
       console.log(res.val())
      });

    database
      .ref(`chats/chat1`)
      .once("value")
      .then((res) => {
        this.setState({
          data: res.val(),
        });
      });
  }

  handleMessage(message) {
    this.setState({
      message,
    });
  }

  render() {
    return (
      <Container style={{ height: "100vh" }} fluid>
        <Row style={{ height: "80vh" }}>
          <ul>
            {this.state.data.map((e) => (
              <li>{e.msg}</li>
            ))}
          </ul>
        </Row>
        <Row className="justify-content-md-center">
          <Form onSubmit={this.sendMessage}>
            <Form.Group controlId="formBasicPassword">
              <Form.Control
                value={this.state.message}
                onChange={(e) => this.handleMessage(e.target.value)}
                placeholder="Message.."
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Chat);

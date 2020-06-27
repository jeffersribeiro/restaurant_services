import React, { Component } from "react";
import api from "../../../../services/api";
import { Container, Table } from "react-bootstrap";

function Item({ id, name, data, value }) {
  let DATA = new Date();
  let hour = DATA.getHours();
  let variant = "";
  if (hour >= 7 && hour <= 19) variant = "";
  else variant = "dark";
  return (
    <>
      <div className="table-responsive-xl">
        <Table responsive striped bordered hover variant={variant}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Data</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{id}</td>
              <td>{name}</td>
              <td>{data}</td>
              <td>{value}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
}

class Billets extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      variant:"",
      Messsage:""
    };
  }

  getAllBillets = async () => {
    try{
      await api.get("/billets").then((res) => {
        const { data } = res;
        this.setState({
          dataSource: data,
          variant:"primary",
          Messsage:"Todos os boletos foram carregados!"
        });
      });
    } catch(err){
      this.setState({
        variant:"danger",
        Messsage:"ops, você não tem boletos cadrastrados ou ouve um erro!"
      });
    }
  };

  componentDidMount() {
    this.getAllBillets();
  }

  render() {
    const { dataSource } = this.state;
    return (
      <Container className="mt-3" fluid>
        {dataSource.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            data={item.data}
            value={item.value}
          />
        ))}
      </Container>
    );
  }
}

export default Billets;

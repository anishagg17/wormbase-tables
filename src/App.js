import React, { Component } from "react";
import Axios from "axios";
import styled from "styled-components";
import Checkbox from "@material-ui/core/Checkbox";
import Pagination from "@material-ui/lab/Pagination";

const Flex = styled.div`
  widht: 90vw;
  // margin: 3vh auto;
  padding: 3vh 3vw 3vh 0vw;
  display: flex;
  background-color: #333333;
`;

const Stabel = styled.div`
  flex: 1;
  // padding: 5vw 50%;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  jusfify-content: flex-start;
  background-color: #424242;
  color: #fff;
  margin: 20px;
  height: fit-content;
`;

const Table = styled.div`
  flex: 3;
  background-color: #424242;
  color: #fff;
`;

const PaginationContainer = styled.div`
  // color: #fff;
  color: white;
  * {
    color: white !important;
  }
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
  height: 8vh;
  border-bottom: 1px solid rgba(81, 81, 81, 1);
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  // border: 1px solid #333;
  border-bottom: 1px solid rgba(81, 81, 81, 1);
  letter-spacing: 0.01071em;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  padding: 10px;
`;

const Id = styled.div`
  margin: 0px 2vw;
`;

const Desc = styled.div``;

export default class App extends Component {
  state = {
    selected: [],
    data: [],
    loading: true,
    page: 1,
    pageSize: 20,
    checkAll: false,
    showSelected: 5,
  };

  componentDidMount = () => {
    Axios.get("https://jsonplaceholder.typicode.com/todos").then(({ data }) => {
      this.setState({ data, loading: false });

      const selected = data.filter(item => item.completed);
      this.setState({ selected });
      console.log("data", data);
    });
  };
  handlePage = (event, value) => {
    console.log("event", event);
    console.log("value", value);
    this.setState({ page: value });
  };

  handleChange = id => {
    const { data } = this.state;
    let newData = [...data];
    for (let i in newData) {
      if (newData[i].id === id) {
        newData[i] = {
          ...newData[i],
          completed: !newData[i].completed,
        };
      }
    }
    const selected = newData.filter(item => item.completed);
    this.setState({ data: newData, selected });
  };

  selectAll = () => {
    const isChecked = this.state.checkAll;
    let newData = [...this.state.data];
    for (let i in newData) {
      newData[i] = {
        ...newData[i],
        completed: !isChecked,
      };
    }
    const selected = newData.filter(item => item.completed);
    this.setState({ data: newData, selected, checkAll: !isChecked });
  };

  render() {
    const { page, pageSize, checkAll, showSelected } = this.state;
    const selected = [...this.state.selected];
    const data = [...this.state.data];

    return (
      <Flex>
        <Stabel>
          <Row style={{ textAlign: "center" }}>Selected </Row>
          {selected.splice(0, showSelected).map(({ id, title, completed }) => (
            <Row key={id}>
              <Checkbox
                checked={completed}
                onChange={() => this.handleChange(id)}
                value="primary"
                color="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
              <Desc>{title}</Desc>
            </Row>
          ))}
        </Stabel>
        <Table>
          <Row>
            <Checkbox
              checked={checkAll}
              onChange={() => this.selectAll()}
              color="secondary"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
            <div>{checkAll ? "Des" : "S"}elect all</div>
          </Row>
          {data
            .splice((page - 1) * pageSize, pageSize)
            .map(({ id, title, completed }) => (
              <Row key={id}>
                <Checkbox
                  checked={completed}
                  onChange={() => this.handleChange(id)}
                  value="primary"
                  color="primary"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
                <Id>{id}</Id>
                <Desc>{title}</Desc>
              </Row>
            ))}
          <PaginationContainer>
            <Pagination
              count={Math.ceil(data.length / pageSize)}
              defaultPage={page}
              siblingCount={2}
              color="secondary"
              onChange={this.handlePage}
            />
          </PaginationContainer>
        </Table>
      </Flex>
    );
  }
}

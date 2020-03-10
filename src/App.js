import React, { Component } from "react";
import Axios from "axios";
import styled from "styled-components";
import Checkbox from "@material-ui/core/Checkbox";
import Pagination from "@material-ui/lab/Pagination";
import TableSkeleton from "./components/TableSkeleton";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import _TextField from "@material-ui/core/TextField";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import GetAppIcon from "@material-ui/icons/GetApp";
import sortFun from "./utils/sortFun";
import showFullDetails from "./utils/showFullDetails";

const Flex = styled.div`
  widht: 90vw;
  // margin: 3vh auto;
  padding: 3vh 3vw 3vh 0vw;
  display: flex;
  background-color: #333333;
  justify-content: space-between;
`;
const TextField = styled(_TextField)`
  * {
    color: white !important;
  }
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
  margin: 70px;
  height: fit-content;
  // width: 30vw;
  // flex-bias: 20%;
`;

const Table = styled.div`
  // flex-bias: 80%;
  // width: 60vw;
  flex: 2;

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
  button {
    margin-left: auto;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: white;
    :focus {
      outline: none;
      border: none;
    }
  }
`;

const Id = styled.div`
  margin: 0px 2vw;
  width: 25%;
`;

const Desc = styled.div``;

export default class App extends Component {
  state = {
    selected: [],
    data: [],
    sort: true,
    loading: true,
    page: 1,
    pageSize: 10,
    checkAll: false,
    showSelected: 5,
    query: "",
  };

  componentDidMount = () => {
    Axios.get(
      "https://cors-anywhere.herokuapp.com/http://rest.wormbase.org/rest/widget/gene/WBGene00000912/expression",
    )
      .then(({ data }) => {
        const { fields } = data;
        const { expressed_in } = fields;
        let { data: dsa } = expressed_in;
        // const selected = data.filter(item => item.completed);
        dsa = dsa.map(item => ({ ...item, completed: false, expanded: false }));
        this.setState({ data: dsa, loading: false });
        // console.log("data", dsa[1]);
      })
      .catch(error => console.log("error", error));
    // Axios.get("https://jsonplaceholder.typicode.com/todos")
    //   .then(({ data }) => {
    //     this.setState({ data, loading: false });

    //     const selected = data.filter(item => item.completed);
    //     this.setState({ selected });
    //     console.log("data", data);
    //   })
    //   .catch(error => console.log("error", error));
  };
  handlePage = (event, value) => {
    this.setState({ page: value });
  };

  handleChange = id => {
    let data = [...this.state.data];
    for (let i = 0; i < data.length; i++) {
      const { ontology_term } = data[i];
      if (ontology_term.id === id) {
        data[i] = { ...data[i], completed: !data[i].completed };
      }
    }
    const selected = data.filter(item => item.completed);
    this.setState({ data, selected });
  };
  handleExpand = id => {
    let data = [...this.state.data];
    for (let i = 0; i < data.length; i++) {
      const { ontology_term } = data[i];
      if (ontology_term.id === id) {
        data[i] = { ...data[i], expanded: !data[i].expanded };
      }
    }
    this.setState({ data });
  };
  handleSize = ({ target: { value } }) => {
    this.setState({ pageSize: value });
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
  handleQuery = e => {
    const val = e.target.value;
    this.setState({ query: val });
  };
  downloadFile = async () => {
    const { selected } = this.state;
    const fileName = "file";
    const json = JSON.stringify({ data: selected });
    const blob = new Blob([json], { type: "application/json" });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  render() {
    const {
      page,
      pageSize,
      checkAll,
      showSelected,
      loading,
      query,
      sort,
    } = this.state;

    const selected = [...this.state.selected];
    let data = [...this.state.data]
      .filter(({ ontology_term: { label } }) =>
        label.toLowerCase().includes(query.toLowerCase()),
      )
      .sort(({ ontology_term: a }, { ontology_term: b }) =>
        sortFun(a.label.toLowerCase(), b.label.toLowerCase(), sort),
      );
    if (query === "") data = data.splice((page - 1) * pageSize, pageSize);

    return (
      <Flex>
        <Stabel>
          {loading ? (
            <TableSkeleton no={20} />
          ) : (
            <>
              <Row style={{ textAlign: "center" }}>
                <>Download Selected</> &nbsp;&nbsp;&nbsp;
                <GetAppIcon onClick={this.downloadFile} />
              </Row>
              {selected.length > 0 ? (
                <>
                  {selected
                    .splice(0, showSelected)
                    .map(({ ontology_term, details, completed }) => (
                      <Row key={ontology_term.id}>
                        <Checkbox
                          checked={completed}
                          onChange={() => this.handleChange(ontology_term.id)}
                          value="primary"
                          color="primary"
                          inputProps={{ "aria-label": "primary checkbox" }}
                        />
                        <Desc>{ontology_term.label}</Desc>
                      </Row>
                    ))}
                </>
              ) : (
                <Row>No entries selected</Row>
              )}
            </>
          )}
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
            <div onClick={() => this.setState({ sort: !this.state.sort })}>
              {sort ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
            </div>
            <div id="filled-basic">
              <TextField
                label="Search ..."
                variant="filled"
                id="filled-basic"
                style={{ color: "#ffffff" }}
                onChange={this.handleQuery}
              />
            </div>
          </Row>
          {loading ? (
            <TableSkeleton no={35} />
          ) : (
            data.map(({ ontology_term, details, completed, expanded }) => (
              <Row key={ontology_term.id}>
                <Checkbox
                  checked={completed}
                  onChange={() => this.handleChange(ontology_term.id)}
                  value="primary"
                  color="primary"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
                <Id>{ontology_term.label}</Id>
                <Desc>
                  <>{details[0] && details[0].text && details[0].text.label}</>
                  <>{expanded && showFullDetails(ontology_term, details)}</>
                </Desc>
                <button onClick={() => this.handleExpand(ontology_term.id)}>
                  {expanded ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </button>
              </Row>
            ))
          )}
          {query === "" && (
            <PaginationContainer>
              <FormControl variant="outlined">
                <InputLabel id="demo-simple-select-outlined-label">
                  Page Size
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={pageSize}
                  onChange={this.handleSize}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                </Select>
              </FormControl>
              <Pagination
                count={Math.ceil(this.state.data.length / pageSize)}
                defaultPage={page}
                siblingCount={2}
                color="secondary"
                onChange={this.handlePage}
              />
            </PaginationContainer>
          )}
        </Table>
      </Flex>
    );
  }
}

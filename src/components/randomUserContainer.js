import React, { useState, useEffect } from "react";
import Container from "./Container";
import Row from "./Row";
import Col from "./Col";
import Card from "./Card";
import SearchForm from "./SearchForm";
import API from "../utils/API";

function RandomUserContainer() {
  const [results, setResults] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, [])
  
  async function getUsers(){
    const res = await API.getUsers();
    setResults( res.data.results );
    setUsers( res.data.results );
  };

  function handleInputChange( event ){
    console.log( `[handleInputChange] called`)
    const{name,value} = event.target;
    setUsers( results.filter(user => {
      return user.name.first.toLowerCase().indexOf(value.toLowerCase()) > -1 || user.name.last.toLowerCase().indexOf(value.toLowerCase()) > -1;
    }));
  }

  function compare(a, b) {
    var A = a.toUpperCase();
    var B = b.toUpperCase();
    return (A < B) ? -1 : (A > B) ? 1 : 0;
  }

  const sort = {
    "First": (a, b) => compare(a.name.first, b.name.first),
    "Last": (a, b) => compare(a.name.last, b.name.last),
    "Age": (a, b) => a.dob.age - b.dob.age,
    "Email": (a, b) => compare(a.email, b.email),
    "Phone": (a, b) => compare(a.phone, b.phone)
  }

  function handleSortClick( event ) {
    const clicked = event.target.innerHTML;
    let sortedUsers = JSON.parse(JSON.stringify(results.sort(sort[clicked])));
    setUsers( sortedUsers );
  }

  return (
    <Container>
      <Row>        
        <Col size="md">
          <Card heading="Employee Directory">
            <SearchForm
              handleInputChange={handleInputChange}
            />
          </Card>
        </Col>
      </Row>
      <br></br>
      <div style={{backgroundColor: "grey"}} class="p-4 border border-success text-white" >
      <Row>
        <Col size="1"><b>Picture</b></Col>
        <Col onClick={handleSortClick} size="2"><b>First</b></Col>
        <Col onClick={handleSortClick} size="2"><b>Last</b></Col>
        <Col onClick={handleSortClick} size="1"><b>Age</b></Col>
        <Col onClick={handleSortClick} size="3"><b>Email</b></Col>
        <Col onClick={handleSortClick} size="3"><b>Phone</b></Col>
      </Row>
      </div>
      <div style={{backgroundColor: "orange"}} class="p-4 border border-success text-white" >
      {users.map((item) => (
        <Row key={item.email}>
          <Col size="1"><img src={item.picture.thumbnail} alt="thumbnail" /></Col>
          <Col size="2">{item.name.first}</Col>
          <Col size="2">{item.name.last}</Col>
          <Col size="1">{item.dob.age}</Col>
          <Col size="3">{item.email}</Col>
          <Col size="3">{item.phone}</Col>
        </Row>
      ))} 
      </div>     
    </Container>
  );
}

export default RandomUserContainer;

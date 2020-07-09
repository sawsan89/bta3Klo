import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Layout from "./Layout";
import axios from "axios";
import StarRatingComponent from 'react-star-rating-component';
import BasicProfilePic from './basic-pf-pic.jpg';
import Image from 'react-bootstrap/Image'
import CardGroup from 'react-bootstrap/CardGroup'


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      posts: [],
      rating: 1,
      body: "",
      name: '',
      email: '',
      location: '',
      numOfPepole: '',
      rate: '',
      posts: []

    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleServiceAdd = this.handleServiceAdd.bind(this)
  };

  //change the value of body to new service
  handleServiceAdd(event) {
    this.setState({ body: event.target.value });

  }

  //send data to database to save
  handleSubmit(event) {
    event.preventDefault();
    const payload = {
      body: this.state.body
    }

    // data to server
    axios.post('http://localhost:5000/signup/update', payload)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      });
  }
  //get profile information
  profileDetails = (email) => {
    console.log(email);
    axios.get("http://localhost:5000/profile" + email)
      .then(res => {
        console.log(res);
        this.setState({
          name: this.state.name,
          email: this.state.email,
          location: this.state.location,
          numOfPepole: this.state.numOfPepole,
          rate: this.state.rate
        }
        );


      })
      .catch(err => console.log(err))
  }


  componentDidMount() {
    this.profileDetails(this.state.email);
    this.getService();
  }



  getService() {
    const that = this;
    axios
      .get("http://localhost:5000/profile")
      .then((response) => {
        console.log(response)
        that.setState({ posts: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  displayService = (posts) => {
    if (!posts.length) return null;

    return posts.map((post, index) => (
      <div key={index}>
        <h3>{post.body}</h3>
      </div>
    ))
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }
  service(event) {
    alert("You can Contact me in My Email taha.mohammad@gmail.com")
  }
  done(event) {
    alert("Thank you Please Rate Me ")
  }

  render() {

    const { currentUser } = this.state;
    console.log(this.state.currentUser)

    const { rating } = this.state;

    return (
      <>
        <div>
          <Image className='proImg' style={{ height: '250px', width: '300' }} src={BasicProfilePic} />
          <ListGroup horizontal>
            {/* <ListGroup.Item>Name:{this.state.name}</ListGroup.Item>
            <ListGroup.Item>location :{this.state.location}</ListGroup.Item>
            <ListGroup.Item>Rate:{this.state.rate}</ListGroup.Item>
            <ListGroup.Item>client:{this.state.numOfPepole}</ListGroup.Item> */}
            <ListGroup.Item>Name: Taha</ListGroup.Item>
            <ListGroup.Item>location: Mars</ListGroup.Item>
            <ListGroup.Item>Rate: 4.5</ListGroup.Item>
            <ListGroup.Item>client: 12</ListGroup.Item>
            <ListGroup.Item>Category: Teaching</ListGroup.Item>
          </ListGroup><br></br><br></br><br></br>
        </div><div id="Profile">
          <Layout>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Control type="text" value={this.state.service} onChange={this.handleServiceAdd} />
              </Form.Group>
              {/* <Button color="primary" size="sm" onClick={() => this.handleClick}>Add Service</Button> */}
              <Button color="primary" size="sm" type="submit">Add Service</Button>
            </Form>
            <div className="fromService">{this.displayService(this.state.posts)}</div>

            <div>
              {this.state.posts.map(post => {
                return (
                  <Card bg="Secondary"
                    text={post.toLowerCase() === 'light' ? 'dark' : 'white'}
                    style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Text>
                        <div>{post}</div>
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <br></br><br></br><br></br>
                    </Card.Footer>
                  </Card>
                )
              }
              )}
              <br></br><br></br>
            </div>

            <div>
              <CardGroup>
                <Card
                  bg="Secondary" text="dark"
                  style={{ width: '18rem' }}
                >
                  <Card.Header>Teaching Math</Card.Header>
                  <Card.Body>
                    <Card.Title>Math </Card.Title>
                    <Card.Text>
                      I teach Math classes from 5th grade till 10th grade
      </Card.Text>
                  </Card.Body>
                </Card>{"  "}
                <Card
                  bg="Secondary" text="dark"
                  style={{ width: '18rem' }}
                >
                  <Card.Header>Teaching Science</Card.Header>
                  <Card.Body>
                    <Card.Title>Science </Card.Title>
                    <Card.Text>
                      I teach Science for classes from 3rd grade till 7th grade
      </Card.Text>
                  </Card.Body>
                </Card>
              </CardGroup>
              <br></br>
              <Button color="primary" onClick={this.service} size="sm">Hire Me!!</Button>{" "}
              <Button color="primary" onClick={this.done} size="sm">Done</Button>{" "}
              <br></br>
              <div id="rate">
                <StarRatingComponent
                  name="rate1"
                  starCount={5}
                  value={rating}
                  onStarClick={this.onStarClick.bind(this)}
                />
              </div>
            </div>

          </Layout>
        </div>
      </>
    );
  }
}

export default Profile;
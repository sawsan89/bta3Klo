import  React, {Component } from 'react';

import logo from './Logo.png';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
//import  Card from 'react-bootstrap/CardGroup';
//import  {Alert} from 'react-bootstrap';
//import Alert from 'react-bootstrap/alert-warning';
//import Alert from "react-bootstrap/Alert"
class FrontPage extends Component {
   
    
       constructor(){
        super();
       
        this.state = {
      value: "teacher",

      users:[],
      val:[]
      
    };
        this.handleChange = this.handleChange.bind(this)
        
        this.handleSubmit1 = this.handleSubmit1.bind(this);
        
  
  
    };


handleSubmit1(event) {

    alert("Your service  is: " + this.state.value );
   
    event.preventDefault();
    console.log(this.state.value)
    //console.log("orieb")
    

  //FrontPage//connect server with client 
   axios.get
   ("http://localhost:5000/search")
    .then((res) => {
        console.log(this.state.value)
          console.log(res)
         // console.log(this.state.users)
          this.setState({
            users:res.data
          })
    }).catch((error) => {
        console.log(error)
    });

//////randomly //for one user
//  axios.get
//     ("http://localhost:5000/search", this.state.value)
//      .then((res) => {
//          console.log(this.state.value)
          
//            console.log(res.data.length)
//            var x=Math.floor(Math.random()*res.data.length); 
//            console.log(res.data[x])
//            var arr=[]
//            arr.push(res.data[x])
//            this.setState({
//              val:arr
//            })
//      }).catch((error) => {
//          console.log(error)
//      });







    
  
  }
 componentDidMount(){
  axios.get
  ("http://localhost:5000/search")
   .then((res) => {
       console.log(this.state.value)
        
         console.log(res.data.length)
         var x=Math.floor(Math.random()*res.data.length); 
         console.log(res.data[x])
         var arr=[]
         arr.push(res.data[x])
         this.setState({
           val:arr
         })
   }).catch((error) => {
       console.log(error)
   });

 }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };
  
//make select input 
    render() { 
        return (
            <>
            <div>
<br></br><br></br>

<Form onSubmit={this.handleSubmit1}>

//element to show random data
<div>
{this.state.val.map(v => 

  {
  return (

    
    <CardDeck>


<Card>
   
    <Card.Body>
      <Card.Title>service</Card.Title>
      <Card.Text>
      <div>{v.name}</div>
<div>{v.email}</div>
<div>{v.service}</div>
<br></br><br></br><br></br>
      </Card.Text>
    </Card.Body>
    <Card.Footer color="red">
      
    </Card.Footer>
  </Card>

</CardDeck>



  )
}




 
)}
<br></br><br></br><br></br>


</div>  



//////////////////////////select  //////////////////////




  <Form.Group controlId="exampleForm.SelectCustom">
    <Form.Label>Custom select</Form.Label>
    <Form.Control as="select" custom value={this.state.value} onChange={this.handleChange}>
      <option value="teacher">teacher</option>
      <option value="smith">smith</option>
      <option value="carpenter">carpenter</option>
      <option value="photographer">photographer</option>
      <option value="nurse">nurse</option>
    </Form.Control>
  </Form.Group>
  <Button type="submit"  className="mb-2">
    Submit
  </Button>
</Form>

<div>

{this.state.users.map(user => 

  {
    //service: "smith"
if(user.service==this.state.value){
  return (

    
    <CardDeck>


<Card>
   
    <Card.Body>
      <Card.Title>service</Card.Title>
      <Card.Text>
      <div>{user.name}</div>
<div>{user.email}</div>
<div>{user.service}</div>
<br></br><br></br><br></br>
      </Card.Text>
    </Card.Body>
    <Card.Footer color="red">
      
    </Card.Footer>
  </Card>

</CardDeck>



  )
}



  } 
 
)}
<br></br><br></br><br></br>



</div>

<div>




/////additional

<CardDeck>
  <Card>
    <Card.Img variant="top" src="holder.js/100px160" />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
      
<br></br><br></br><br></br>
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer>
  </Card>
  <Card>
    <Card.Img variant="top" src="holder.js/100px160" />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        This card has supporting text below as a natural lead-in to additional
        content.{' '}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer>
  </Card>
  <Card>
    <Card.Img variant="top" src="holder.js/100px160" />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        This is a wider card with supporting text below as a natural lead-in to
        additional content. This card has even longer content than the first to
        show that equal height action.
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer>
  </Card>
</CardDeck>


</div>


</div>
  <br></br><br></br>

            
          
            </>
        );
    }
}

export default FrontPage

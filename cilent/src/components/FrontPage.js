import  React, {Component } from 'react';

import logo from './Logo.png';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
class FrontPage extends Component {
   
    
       constructor(){
        super();
       
        this.state = {
      value: "teacher",
      users:[],
      val:[],
      val2:[],
      val3:[]
      
    };
        this.handleChange = this.handleChange.bind(this)
        
        this.handleSubmit1 = this.handleSubmit1.bind(this);
        
  
  
    };


handleSubmit1(event) {

    alert("Your service  is: " + this.state.value );
   
    event.preventDefault();
    console.log(this.state.value)
    //console.log("orieb")
    

  //FrontPage//connect server with client  using axsios to retrive all data 
   axios.get
   ("http://localhost:5000/search")
    .then((res) => {
        console.log(this.state.value)
        console.log(res)
        //  console.log(this.state.users)
          this.setState({
            users:res.data
          })
    }).catch((error) => {
        console.log(error)
    });
  
  }



  //this part to when i refresh my page its retrive  to me 2 randomly card of data 
//res.data[x]....element(object )to map i pushed  this object i array after that i render 



 componentDidMount(){
  axios.get
  ("http://localhost:5000/search")
   .then((res) => {
      
        
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

   axios.get
  ("http://localhost:5000/search")
   .then((res) => {
       console.log(this.state.value)
        
         console.log(res.data.length)
         var x=Math.floor(Math.random()*res.data.length); 
         console.log(res.data[x])
         var arr2=[]
         arr2.push(res.data[x])
         this.setState({
           val2:arr2
         })
   }).catch((error) => {
       console.log(error)
   });


   
   axios.get
  ("http://localhost:5000/search")
   .then((res) => {
       console.log(this.state.value)
        
         console.log(res.data.length)
         var x=Math.floor(Math.random()*res.data.length); 
         console.log(res.data[x])
         var arr3=[]
         arr3.push(res.data[x])
         this.setState({
           val3:arr3
         })
   }).catch((error) => {
       console.log(error)
   });


 }

 //handle chande value for select (droplist input )
  handleChange = event => {
    this.setState({ value: event.target.value });
  };
  
//make select input  inside form using bootstrap v4
    render() { 
        return (
            <>
            <div>
<br></br><br></br>

<Form onSubmit={this.handleSubmit1}>
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

{/*
this div after i select value i need to retrive data when condtion its correct


*/}
<div>

{this.state.users.map(user => 

  {
    //when we update the data i maked user.catogry
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
            <div>{user.location}</div>
            <br></br><br></br><br></br>
    </Card.Text>
    </Card.Body>
    <Card.Footer color="red">
    </Card.Footer>
    <br></br><br></br><br></br>
      </Card>
    </CardDeck>
  )
}
  } 
)}
<br></br><br></br><br></br>
</div>
<br></br><br></br><br></br>


{/*randomly information  */}


<div style={h1}>
{/*this div to render first randomly iformation */}
<div style={h2}>
{this.state.val.map(v => 
  {
  return (
<CardDeck>
  <Card>
    <Card.Img variant="top" src="https://tse3.mm.bing.net/th?id=OIP.iZsAXH5tvmQw7csH95do0QHaHa&pid=Api&P=0&w=300&h=300" />
    <Card.Body>
      <Card.Title>randomly card</Card.Title>
      <Card.Text>
      <div>{v.name}</div>
      <div>{v.email}</div>
      <div>{v.location}</div>
      <div>{v.service}</div>
      </Card.Text>
    </Card.Body>
    <Card.Footer>
    <br></br><br></br><br></br>
    </Card.Footer>
  </Card>
  
</CardDeck>

  )
}
)}
<br></br><br></br><br></br> 
</div> 


{/*this div to render  second randomly iformation */}
<div style={h2}>
{this.state.val2.map(v2 => 

  {
  return (
<CardDeck>
  <Card>
    <Card.Img variant="top" src="https://tse3.mm.bing.net/th?id=OIP.iZsAXH5tvmQw7csH95do0QHaHa&pid=Api&P=0&w=300&h=300" />
    <Card.Body>
      <Card.Title>randomly card</Card.Title>
      <Card.Text>
      <div>{v2.name}</div>
      <div>{v2.email}</div>
      <div>{v2.location}</div>
      <div>{v2.service}</div>
      </Card.Text>
    </Card.Body>
    <Card.Footer>
    <br></br><br></br><br></br>
    </Card.Footer>
  </Card>
  
</CardDeck>
  )
}
)}
<br></br><br></br><br></br>
</div>  

{/*this div to render third randomly iformation */}

<div style={h2}>
{this.state.val3.map(v3 => 

  {
  return (
<CardDeck>
  <Card>
    <Card.Img variant="top" src="https://tse3.mm.bing.net/th?id=OIP.iZsAXH5tvmQw7csH95do0QHaHa&pid=Api&P=0&w=300&h=300" />
    <Card.Body>
      <Card.Title>randomly card</Card.Title>
      <Card.Text>
      <div>{v3.name}</div>
      <div>{v3.email}</div>
      <div>{v3.location}</div>
      <div>{v3.service}</div>
      </Card.Text>
    </Card.Body>
    <Card.Footer>
    <br></br><br></br><br></br>
    </Card.Footer>
  </Card>
  
</CardDeck>
  )
}
)}
<br></br><br></br><br></br>
</div>  




</div>


</div>
  <br></br><br></br>
           </>
        );
    }
}

export default FrontPage



const h1={
  "width":" 80%",
 " minHeight":"300px",
  "margin":"0 auto",
  "display": "-webkit-flex",/* Safari */     
  "display": "flex", /* Standard syntax */
  

}

const h2={
 "padding": "10px",
  "background":"white",
 " -webkit-flex": "1",/* Safari */
  "-ms-flex":" 1", /* IE 10 */
  "flex": "1" ,/* Standard syntax */
  "background": "#48D1CC"
}
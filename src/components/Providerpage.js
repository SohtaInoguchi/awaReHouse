import "../input.css";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import Chat from "./Chat";
import axios from "axios";
import { VictoryBar,
  VictoryChart,
  VictoryTooltip,
  VictoryAxis } from "victory";

import { Badge, Accordion, Card } from "react-bootstrap";

let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
let yyyy = today.getFullYear();

if (dd > 21) {
  mm++;
  dd = 21;
  today = mm + "/" + dd + "/" + yyyy;
} else {
  dd = 21;
  today = mm + "/" + dd + "/" + yyyy;
}

function Providerpage({ user, email2 }) {

  // const [displayProviderTable, setDisplayProviderTable] = useState(false);
  const [providerItems, setProviderItems] = useState([]);
  const [providerAddress, setProviderAddress] = useState("");
  const [storageFloor, setStorageFloor] = useState("");
  const [chartData, setChartData] = useState();
  const [chartVisible, setChartVisible] = useState(false);
  
  const retrievePayments = async (req,res) => {
    try {
      await axios.get(`/payments/${email2}`)
      .then((res) => {
        if (res.data.length<=12) {
          let final = [];
          res.data.forEach((e)=>{
          let obj = {};
          obj["x"]=e["covered_month"].slice(0,3);
          obj["y"]=e["amount_jpy"];
          obj["label"]=`JPY ${String(e.amount_jpy).slice(0,(String(e.amount_jpy).length)-3)},${String(e.amount_jpy).slice(-3)}`;
          final.push(obj)
        })
          setChartData(final)
        } else {
          while (res.data.length>12){
            res.data.shift()
          }
          let final = [];
          res.data.forEach((e)=>{
          let obj = {};
          obj["x"]=e["covered_month"].slice(0,3);
          obj["y"]=e["amount_jpy"];
          obj["label"]=`JPY ${String(e.amount_jpy).slice(0,(String(e.amount_jpy).length)-3)},${String(e.amount_jpy).slice(-3)}`;
          final.push(obj)
          setChartData(final)
          })
        } 
      })
    } catch{
        console.log("NOPE! Payments cannot be retrieved");
    }
  }
 
  const retrieveProviderAddress = async (req,res) => {
    try {
      await axios.get(`/providers/${email2}`)
      .then((res) => {
        // setProviderAddress(res.data[0].adress);
        setProviderAddress(res.data[0].adress);
        setStorageFloor(res.data[0].floor)
      })
    } catch{
        console.log("NOPE! Provider address data not retrieved");
    }
  }

  useEffect(()=>{
    retrieveProviderAddress()
    retrievePayments()
  },[])
  
  const retrieveProviderItems = (req,res) => {
    axios.post("/providerItems", { address: providerAddress }).then((res) => setProviderItems(res.data));
  }
  
  const renderListOfStorage = () => {
    return (
      <section id="box-list">
      {
        providerItems.map((item, idx) => {
          return (
            <Card key={item.box_id} className="m-10 max-w-sm">
              <Card.Img key={item.box_id} variant="top" src={require("../pictures/plain-shipping-boxes-packhelp-kva.jpeg")}/>
                <Card.Body key={`${item.box_id}e`}>
                  <Accordion key={`${item.box_id}h`} defaultActiveKey="0">
                   <Accordion.Item key={item.box_id} eventKey="1">
                    <Accordion.Header key={item.box_id}>
                    Click to see the detail of box {item.box_id}
                    </Accordion.Header>
                    <Accordion.Body key={`${item.box_id}f`}>
                      <div key={item.box_id}>
                        <li key={item.box_id} className="box-detail">Location: {providerAddress}</li>
                        <li key={`${item.box_id}a`} className="mx-0 box-detail">Weight: {item.weight_in_kg}kg</li>
                        <li key={`${item.box_id}b`} className="mx-0 box-detail">Floor: {storageFloor}</li>
                        <li key={`${item.box_id}c`} className="mx-0 box-detail">Should be retrieved in {item.expected_retrieval_season}.</li>
                      </div>
                    </Accordion.Body>
                   </Accordion.Item>
                  </Accordion>
                </Card.Body>
            </Card>
          )
        })
      }
      </section>
    );

  }
  
  const check = (e) => {
    e.preventDefault();
    console.log(providerItems);
  }
  
  useEffect(()=>{
    retrieveProviderAddress()
    // retrieveProviderItems();
  }, [])

 useEffect(()=>{
setChartVisible(true)
 },[chartData])
  
      useEffect(() => {
    retrieveProviderItems();
  }, [providerAddress])

  return (
    <div id="provider-page-wrapper">
      <aside id="badge-wrapper">
      <Badge bg="light" id="provider-visitor-date">Next stuff visit will be 02/02/22</Badge>
        <Badge bg="light" id="provider">
          <ul id="provider-info">
            <li>Welcome {user}</li>
            <li>Your next pay day is: {today}</li>
            <li>Number of box: {providerItems.length}</li>
            <li>Next payment amount: ¥{1077 * providerItems.length}</li>
          </ul>
        </Badge>
      </aside>
      <Badge bg="light" id="provider-visitor-date">LIST OF STORED BOXES</Badge>
      <button onClick={check}>Check Items</button>
      {/* {providerItems ? renderListOfStorage() : <>You don't have any box.</>} */}
      {providerItems.length !== 0 ? renderListOfStorage() : <section className="text-2xl m-11 font-mono text-yellow-50">You don't have any box.</section>}
      <div>
        { chartVisible === false ? <></> :
        <div className="chart">
        <VictoryChart
          responsive={false}
          animate={{
            duration: 500,
            onLoad: { duration: 200 }
          }}
          domainPadding={{ x: 20 }}
        >
          <VictoryAxis  
          animate={{
            duration: 500,
            onLoad: { duration: 200 }
          }}
          style={{ data: { fill: "#000000" } }} 
          />
          <VictoryAxis 
          dependentAxis  
          animate={{
            duration: 500,
            onLoad: { duration: 200 }
          }}
          style={{ data: { fill: "#000000" } }}
          />
          <VictoryBar
          animate={{
            duration: 500,
            onLoad: { duration: 200 }
          }}
            barRatio={1}
            cornerRadius={0}
            style={{ data: { fill: "#2035d4" } }}
            alignment="middle"
            labelComponent={<VictoryTooltip/>}
            data={chartData}
            events={[{
              target: "data",
              eventHandlers: {
                onMouseOver: () => {
                  return [
                    {
                      target: "data",
                      mutation: () => ({style: {fill: "gold", width: 30}})
                    }, {
                      target: "labels",
                      mutation: () => ({ active: true })
                    }
                  ];
                },
                onMouseOut: () => {
                  return [
                    {
                      target: "data",
                      mutation: () => {}
                    }, {
                      target: "labels",
                      mutation: () => ({ active: false })
                    }
                  ];
                }
              }
            }]}
          />
        </VictoryChart>
        </div>}      
      <button>Add more storage capacity</button><br/>
      {/* <button
        onClick={(e) => {
          window.confirm("Are you sure about to quit the provider?");
        }}
      > */}
      <button onClick={check}>
        Stop being a provider
      </button>
      <br />
      <Chat />
    </div>
    </div>
  );
}

export default Providerpage;

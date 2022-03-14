import "../input.css";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import Chat from "./Chat";
import axios from "axios";
import { VictoryBar,
  VictoryChart,
  VictoryTooltip,
  VictoryAxis, 
  VictoryLabel,
  Rect,
} from 'victory';
import DatePicker from "react-datepicker";
import { Badge, Accordion, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Badge, Accordion, Card, Button } from "react-bootstrap";

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
  const [chartVisible, setChartVisible] = useState();
  const [boxNumberNull, setBoxNumberNull] = useState();
  const [moreStorage, setMoreStorage] = useState(false);
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [floorAddition, setFloorAddition] = useState("");
  const [available, setAvailable] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [thanksMessage, setThanksMessage] = useState(false);
  
  
  const retrievePayments = async (req,res) => {
    try {
      await axios.get(`/payments/${email2}`)
      .then((res) => {
        if (res.data.length===0){
          setChartVisible(false)
          setBoxNumberNull(true)
        } else if (res.data.length<=12) {
          let final = [];
          res.data.forEach((e)=>{
          let obj = {};
          obj["x"]=e["covered_month"].slice(0,3);
          obj["y"]=e["amount_jpy"];
          obj["label"]=`JPY ${String(e.amount_jpy).slice(0,(String(e.amount_jpy).length)-3)},${String(e.amount_jpy).slice(-3)}`;
          final.push(obj)
        })
        setChartVisible(true)  
        setBoxNumberNull(false)
          setChartData(final)
        } else {
          while (res.data.length > 12) {
            res.data.shift();
          }
          let final = [];
          res.data.forEach((e)=>{
          let obj = {};
          obj["x"]=e["covered_month"].slice(0,3);
          obj["y"]=e["amount_jpy"];
          obj["label"]=`JPY ${String(e.amount_jpy).slice(0,(String(e.amount_jpy).length)-3)},${String(e.amount_jpy).slice(-3)}`;
          final.push(obj)
          setBoxNumberNull(false)
          setChartVisible(true)  
          setChartData(final)
          })
        } 
      })
    } catch{
        console.log("NOPE! Payments cannot be retrieved");
    }
  };

  const retrieveProviderAddress = async (req, res) => {
    try {
      await axios.get(`/providers/${email2}`).then((res) => {
        // setProviderAddress(res.data[0].adress);
        setProviderAddress(res.data[0].adress);
        setStorageFloor(res.data[0].floor);
      });
    } catch {
      console.log("NOPE! Provider address data not retrieved");
    }
  };

  useEffect(() => {
    retrieveProviderAddress();
    retrievePayments();
  }, []);

  const retrieveProviderItems = (req, res) => {
    axios
      .post("/providerItems", { address: providerAddress })
      .then((res) => setProviderItems(res.data));
  };

  function signOut() {
    window.localStorage.removeItem("firstName_provider");
    window.localStorage.removeItem("email_provider");
    window.localStorage.removeItem("token_provider");
    navigate("/");
  }

  const renderListOfStorage = () => {
    return (
      <section id="box-list">
        {providerItems.map((item, idx) => {
          return (
            <Card className="m-10 max-w-sm">
              <Card.Img variant="top" src={require("../pictures/plain-shipping-boxes-packhelp-kva.jpeg")}/>
              <Card.Body>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                    Click to see the detail of box {item.box_id}
                    </Accordion.Header>
                    <Accordion.Body>
                      <div key={`${idx}x`}>
                        <li key={`${idx}a`} className="box-detail">Location: {providerAddress}</li>
                        <li key={`${idx}b`} className="mx-0 box-detail">Weight: {item.weight_in_kg}kg</li>
                        <li key={`${idx}c`} className="mx-0 box-detail">Floor: {storageFloor}</li>
                        <li key={`${idx}d`} className="mx-0 box-detail">Should be retrieved in {item.expected_retrieval_season}.</li>
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
  };

  const checkItems = (e) => {
    e.preventDefault();
    console.log(providerItems);
  };

  useEffect(() => {
    retrieveProviderAddress();
    // retrieveProviderItems();
  }, []);

 useEffect(()=>{
    setChartVisible(true)
 },[chartData])
  
      useEffect(() => {
    retrieveProviderItems();
  }, [providerAddress]);

  const createLocation = (e) => {
    setLocation(e.target.value);
  };

  const createCapacity = (e) => {
    setCapacity(e.target.value);
  };

  const createFloorAddition = (e) => {
    setFloorAddition(e.target.value);
  };

  const handleDateSelect = (date) => {
    setStartDate(date);
    setSelectedDate(date);
    setIsSelected(true);
}

const submitHandler = (e) => {
  e.preventDefault();
  setMoreStorage(false);
  setThanksMessage(true);
  setTimeout(()=>{setThanksMessage(false)},5000);
  console.log(location, capacity, available, floorAddition, selectedDate)
}

  return (
    <div id="provider-page-wrapper">
      <aside id="badge-wrapper">
        <Badge bg="light" id="provider-visitor-date">
          Next stuff visit will be 02/02/22
        </Badge>
        <Badge bg="light" id="provider">
          <ul id="provider-info">
            <li>Welcome {user}</li>
            <li>Your next pay day is: {today}</li>
            <li>Number of box: {providerItems.length}</li>
            <li>Next payment amount: ¥{1077 * providerItems.length}</li>
          </ul>
        </Badge>
      </aside>
      <Badge bg="light" id="provider-visitor-date">
        LIST OF STORED BOXES
      </Badge>
      {/* <button onClick={checkItems}>Check Items</button> */}
      {providerItems ? renderListOfStorage() : <></>}
      <div>
        { chartVisible === true && boxNumberNull === false ? 
          <div className="chart">
            <VictoryChart
              responsive={false}
              animate={{
                duration: 500,
                onLoad: { duration: 200 },
              }}
              domainPadding={{ x: 20 }}
            >  
          <VictoryLabel text="Your monthly income over the past 12 months" x={225} y={30} textAnchor="middle" style={[
        { fill: "#000000", fontSize: 15 },
      ]}/>
          <VictoryAxis  
          animate={{
            duration: 500,
            onLoad: { duration: 250 }
          }}
          style={{ data: { fill: "#000000" } }} 
          />
          <VictoryAxis 
          dependentAxis  
          animate={{
            duration: 500,
            onLoad: { duration: 250 }
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
        </div> : <>You do not have yet any payment history <br></br></>}      
      <button onClick={()=>{setMoreStorage(!moreStorage)}}>Add more storage capacity</button>
      {moreStorage === false ? <></> : <div className="formMoreStorage">
      <form >
            <br></br>
            Please give us some details about the additional storage capacity you plan to bring online
            <br></br>
            <br></br>
            <label >
              Where is this new storage capacity located?
              <input
                type="text"
                name="location"
                placeholder="storage address"
                value={location}
                onChange={createLocation}
              />
              <br></br>
              What is the storage capacity offered (in m3)?
              <input
                type="text"
                name="capacity"
                placeholder="storage capacity"
                value={capacity}
                onChange={createCapacity}
              />
              <br></br>
              On which floor is this new storage capacity located?
              <input
                type="text"
                name="floor"
                placeholder="storage floor"
                value={floorAddition}
                onChange={createFloorAddition}
              />
              <br></br>
              <p style={{ display: "inline" }}>
                Check if this new storage facility is already available
              </p>
              <input
                type="checkbox"
                className="isAvailable"
                onChange={()=>setAvailable(!available)}
              />
              <br></br>
              If the storage facility is not yet available, when do you expect it to become available (please select a date below)?
              <DatePicker 
            selected={startDate} 
            onSelect={date => handleDateSelect(date)} 
            />
            </label>
            <br></br>
            <br></br>
            <input
              type="submit"
              value="Submit"
              style={{ cursor: "pointer" }}
              onClick={submitHandler}
            />
            <br></br>
            <button onClick={()=>{setMoreStorage(!moreStorage)}}>Cancel</button>
          </form>
        </div>}
        {thanksMessage === true ? <h4>Thank you for your submission, our staff will keep in touch in the coming days</h4> : <></>}
      <button
        onClick={(e) => {
          window.confirm("Are you sure about to quit the provider?");
        }}
      >
        Stop being a provider
      </button>
      <br />
      <Chat />
    </div>
    </div>
  );
}

export default Providerpage;

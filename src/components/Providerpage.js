import "../input.css";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import Chat from "./Chat";
import axios from "axios";
import {
  VictoryBar,
  VictoryChart,
  VictoryTooltip,
  VictoryAxis,
  VictoryLabel,
  Rect,
} from "victory";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { Badge, Accordion, Card, Button, Modal } from "react-bootstrap";
import StopProviderModal from "./StopProviderModal";

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
  const [pendingItems, setPendingItems] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [isQuitProvider, setIsQuitProvider] = useState(false);

  
  const navigate = useNavigate();

  const retrievePayments = async (req, res) => {
    try {
      await axios.get(`/payments/${email2}`).then((res) => {
        if (res.data.length === 0) {
          setChartVisible(false);
          setBoxNumberNull(true);
        } else if (res.data.length <= 12) {
          let final = [];
          res.data.forEach((e) => {
            let obj = {};
            obj["x"] = e["covered_month"].slice(0, 3);
            obj["y"] = e["amount_jpy"];
            obj["label"] = `JPY ${String(e.amount_jpy).slice(
              0,
              String(e.amount_jpy).length - 3
            )},${String(e.amount_jpy).slice(-3)}`;
            final.push(obj);
          });
          setChartVisible(true);
          setBoxNumberNull(false);
          setChartData(final);
        } else {
          while (res.data.length > 12) {
            res.data.shift();
          }
          let final = [];
          res.data.forEach((e) => {
            let obj = {};
            obj["x"] = e["covered_month"].slice(0, 3);
            obj["y"] = e["amount_jpy"];
            obj["label"] = `JPY ${String(e.amount_jpy).slice(
              0,
              String(e.amount_jpy).length - 3
            )},${String(e.amount_jpy).slice(-3)}`;
            final.push(obj);
            setBoxNumberNull(false);
            setChartVisible(true);
            setChartData(final);
          });
        }
      });
    } catch {
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
      .then((res) => {
        let finalStored = [];
          for (let i = 0; i <= res.data.length; i++){
            if (res.data[i]["pending"]===false){
              finalStored.push(res.data[i])
            } 
            setProviderItems(finalStored)
            let pending = res.data.length-finalStored.length
            setPendingItems(pending)
        }
      });
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
              <Card.Img
                variant="top"
                src={require("../pictures/plain-shipping-boxes-packhelp-kva.jpeg")}
              />
              <Card.Body>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      Click to see details for Box <h4 className="boxColor">{item.box_id}</h4>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div key={`${idx}x`}>
                        <li key={`${idx}a`} className="box-detail">
                          <div className="boxHighlight">Storage location:</div> {providerAddress}
                        </li>
                        <li key={`${idx}b`} className="mx-0 box-detail">
                        <div className="boxHighlight">Box weight:</div> {item.weight_in_kg}kg
                        </li>
                        <li key={`${idx}c`} className="mx-0 box-detail">
                        <div className="boxHighlight">Storage floor:</div> {storageFloor}
                        </li>
                        <li key={`${idx}d`} className="mx-0 box-detail"><div className="boxHighlight">Expected retrieval period:</div>
                          {" "}
                          {item.expected_retrieval_season}
                        </li>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card.Body>
            </Card>
          );
        })}
      </section>
    );
  };

  useEffect(() => {
    retrieveProviderAddress();
  }, []);

  useEffect(() => {
    setChartVisible(true);
  }, [chartData]);

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
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setMoreStorage(false);
    setThanksMessage(true);
    setTimeout(() => {
      setThanksMessage(false);
    }, 5000);
    console.log(location, capacity, available, floorAddition, selectedDate);
  };
  function signOut() {
    window.localStorage.removeItem("firstName_provider");
    window.localStorage.removeItem("email_provider");
    window.localStorage.removeItem("token_provider");
    navigate("/");
  }


  const renderProviderQuitMessage = () => {
    return (
      <h2>
        <Badge bg="success">
        <h4>Your request has been registered. <br></br>We hope to welcome you back as a provider soon.</h4>
        </Badge>
      </h2>
    )
  }

  return (
    // <div id="provider-page-wrapper">
    <div id={modalShow ? "provider-page-modal-show" : "provider-page-wrapper"}>
      <Button className="SignOutButton" onClick={signOut}>Sign Out</Button>
      <aside id="badge-wrapper">
        <Badge bg="light" id="provider-visitor-date">
           <h5 className="incomingBoxes">Number of incoming box(es): <h4 className="pendingItems">{pendingItems}</h4></h5>
           <h5 className="incomingBoxes">Incoming day: <h5 className="incomingDate">03/22/2022</h5></h5>
        </Badge>
        <Badge bg="light" id="provider">
            <h5>Welcome back, <h4 className="providerName">{user}</h4></h5>
        </Badge>
      </aside>
{/* <<<<<<< HEAD */}
      {/* <Badge bg="light" id="provider-visitor-date">
        LIST OF STORED BOXES
      </Badge> */}
{/* ======= */}
      <div className="listBoxes"> <Badge bg="light" id="provider-visitor-date">
        LIST OF STORED BOX(ES)
        <h6>Number of box(es) in storage: <h5 className="storedBoxes">{providerItems.length}</h5></h6>
      </Badge></div>
{/* >>>>>>> 07c05ed3e2b23012e565d3d2d50e8aa0bd502b9a */}
      {providerItems ? renderListOfStorage() : <></>}
      <div>
      <div className="listpayments"> <Badge bg="light" id="provider-visitor-date">
        FINANCIAL INFORMATION
      </Badge></div>
      <div className="listpayments"> <Badge bg="light" id="provider-visitor-date">
      <h6>Next payment date: <h5 className="financialHighlight">{today}</h5></h6>
      <h6>Next payment amount: <h5 className="financialHighlight">¥{1077 * providerItems.length}</h5></h6>
      </Badge></div>
        {chartVisible === true && boxNumberNull === false ? (
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
          </div>
        ) : (
          <h4 className="noPayments">
            You do not have yet any payment history <br></br>
          </h4>
        )}
        <div className="containerBottom">
        <button
          onClick={() => {
            setMoreStorage(!moreStorage);
          }}
         className="btn-one">
          Add more storage capacity
        </button>
        {moreStorage === false ? (
          <></>
        ) : (
          <div className="formMoreStorage">
            <form>
              <h5 className="topFormtop">Please give us some details...</h5>
              <label>
                <h6 className="topForm">Where is this new storage capacity located?</h6>
                <input
                  type="text"
                  name="location"
                  placeholder="storage address"
                  value={location}
                  onChange={createLocation}
                />
                <h6  className="topForm">What is the storage capacity offered (in m3)?</h6>
                <input
                  type="text"
                  name="capacity"
                  placeholder="storage capacity"
                  value={capacity}
                  onChange={createCapacity}
                />
                <h6  className="topForm">On which floor is this new storage capacity located?</h6>
                <input
                  type="text"
                  name="floor"
                  placeholder="storage floor"
                  value={floorAddition}
                  onChange={createFloorAddition}
                />

                <h6  className="topForm">Please indicate from when this additional capacity will be available</h6>
                <DatePicker
                  selected={startDate}
                  onSelect={(date) => handleDateSelect(date)}
                />
              </label>
              <br></br>
              <button
              className="btn-three"
                style={{ cursor: "pointer" }}
                onClick={submitHandler}
              >Submit</button>
              <button className="btn-three" onClick={()=>{setMoreStorage(!moreStorage)}}>Cancel</button>
          </form>
          </div>)}
        {thanksMessage === true ? <h4 className="thanksMessage">Thank you for your submission, our staff will keep in touch in the coming days</h4> : <></>}

        <button className="btn-two" onClick={() => setModalShow(true)}>
        Stop being a provider
      </button>
      {
      isQuitProvider ? 
      renderProviderQuitMessage() : 
      <></>
      }
      <StopProviderModal
        show={modalShow}
        onHide={setModalShow}
        setIsQuitProvider={setIsQuitProvider}
        id="modal-show-background">
      </StopProviderModal>
      </div>
      <Chat />
    </div>
    </div>
  );
}

export default Providerpage;

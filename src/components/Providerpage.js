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
            obj["label"] = `¥ ${String(e.amount_jpy).slice(
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
        
            <Card className="m-10-max-w-sm">
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
                          <div className="boxHighlight">Storage location:<p className="boxHighlight2"> {providerAddress}</p></div>
                        <div className="boxHighlight">Box weight: <p className="boxHighlight2">{item.weight_in_kg}kg</p></div>
                        
                        <div className="boxHighlight">Storage floor:<p className="boxHighlight2"> {storageFloor}</p></div> 
                        <div className="boxHighlight">Expected retrieval period:<p className="boxHighlight2">
                          {" "}
                          {item.expected_retrieval_season}
                          </p></div>
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
        <h4>Your request has been registered. <br></br>We hope to welcome you back soon as a provider.</h4>
      </h2>
    )
  }

  return (
    <div className="page">
      <div className="welcomeAndByeContainer">
      <h5>Welcome back, <h4 className="providerName">{user}</h4></h5>
      <button className="SignOutButton" onClick={signOut}>Sign Out</button>
      </div>
      <div className="topContainer">
      <div className="innerTopContainer">
        <div className="innerInner1">
      <img
      className="pictureFinancial"
      src={require("../pictures/financial.jpg")}
      />
      <h6>Next payment date: <h5 className="financialHighlight">{today}</h5>
      <h6>Next payment amount: <h5 className="financialHighlight">¥ {(String(1077 * providerItems.length).slice(0,1)+",")+(String(1077 * providerItems.length).slice(1,4))}</h5></h6></h6></div>
      <div className="innerInner2">
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
          <h5 className="noPayments">
            You do not have yet any payment history <br></br>
          </h5>
        )}
        </div>
        </div>
        </div>
      <div className="secondContainer">
           <div className="secondContainerTop">
           <h5>Boxes in storage: <h6 className="storedBoxes">{providerItems.length}</h6></h5>
           <h5> Incoming boxes: <h6 className="pendingItems">{pendingItems}</h6></h5>
           <h5>Incoming day: <h6 className="pendingItems">03/22/2022</h6></h5>
           <img
           className="pictureDeliveries"
            src={require("../pictures/deliveries.webp")}
            />
           </div>
      </div>
      
      <div className="secondContainerBottom">
        <h5 className="storedBoxesLabel" >STORED BOXES:</h5>
      {providerItems ? renderListOfStorage() : <></>}
      </div>

      <div className="containerForBottomButtons">
      <img
      className="pictureChange"
      src={require("../pictures/change.jpg")}
      />
      <div className="bottomButtons">
      <div className="moreStorageButton">
      <button
          onClick={() => {
            setMoreStorage(!moreStorage);
          }}
         className="btn-one">
          Add more storage capacity
        </button>
                  
      </div>

          <div className="stopProviderButton">
          <button className="btn-two" onClick={() => setModalShow(true)}>
        Stop being a provider
      </button>
      <StopProviderModal
        show={modalShow}
        onHide={setModalShow}
        setIsQuitProvider={setIsQuitProvider}
        id="modal-show-background">
      </StopProviderModal>
      </div>
      </div>
    </div>

    {moreStorage === false ? (
          <></>
        ) : (
          <div className="moreStorage">
            <form>
              <h5 className="topFormtop">Please give us some details.</h5>
              <label>
                <h6 className="topForm">Where is this new storage capacity located?</h6>
                <input
                  type="text"
                  name="location"
                  placeholder="address"
                  value={location}
                  onChange={createLocation}
                />
                <h6  className="topForm">What is the storage capacity offered (in m3)?</h6>
                <input
                  type="text"
                  name="capacity"
                  placeholder="capacity"
                  value={capacity}
                  onChange={createCapacity}
                />
                <h6  className="topForm">On which floor is this new storage capacity located?</h6>
                <input
                  type="text"
                  name="floor"
                  placeholder="floor"
                  value={floorAddition}
                  onChange={createFloorAddition}
                />

                <h6  className="topForm">Please indicate from when this additional capacity will be available</h6>
                <DatePicker
                  selected={startDate}
                  onSelect={(date) => handleDateSelect(date)}
                />
              </label>

              <button
              className="btn-three"
                style={{ cursor: "pointer" }}
                onClick={submitHandler}
              >Submit</button>
              <button className="btn-three" onClick={()=>{setMoreStorage(!moreStorage)}}>Cancel</button>
          </form>
          </div>)}
          {thanksMessage === true ? <h4 className="thanksMessage">Thank you for your submission, our staff will keep in touch in the coming days.<br></br><button className="goBack" onClick={()=>{setThanksMessage(false)}}>Go back</button></h4> : <></>}
          {
          isQuitProvider ? 
          <div className="leaveSuccess">{renderProviderQuitMessage()}<br></br><button className="goBack" onClick={()=>{setIsQuitProvider(false)}}>Go back</button></div> : 
      <></>
      }
      <Chat />

    </div>
  );
}

export default Providerpage;

import "../input.css";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import Chat from "./Chat";
import axios from "axios";
import { VictoryBar,
  VictoryChart,
  VictoryTooltip,
  VictoryAxis } from 'victory';


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

  const [displayProviderTable, setDisplayProviderTable] = useState(false);
  const [providerItems, setProviderItems] = useState("");
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
    axios.post("/providerItems", { providerAddress }).then((res) => setProviderItems(res.data));
  }

  useEffect(()=>{
    retrieveProviderItems()
  },[displayProviderTable])

 useEffect(()=>{
setChartVisible(true)
 },[chartData])
  
  return (
    <div>
      <h1>Welcome {user}</h1>
      <h3>Next visit will be 02/02/22</h3>
      <br></br>
      <button onClick={()=>{
        setDisplayProviderTable(!displayProviderTable);
        }}>LIST OF STORED BOXES</button>
      <br></br>
      {displayProviderTable === true ? <ol>
        Here is a detailed list of the {providerItems.length} box(es) currently stored at {providerAddress}:
        {providerItems.map((item, idx) => {
          return (
            <ul key={idx}>
              <li key={`${idx}d`}> Box: {item.box_id} - Weight: {item.weight_in_kg}kg - Floor: {storageFloor} - Should be retrieved in {item.expected_retrieval_season}.</li>

              {item.fragile === true ? (
                <li key={`${idx}e`}> Box {item.box_id} is recorded as fragile. </li>
              ) : (
                <></>
              )}
              {item.heavy === true ? (
                <li key={`${idx}e`}> Box {item.box_id} is recorded as heavy. </li>
                ) : (
                  <></>
                  )}
            </ul>
          );
        })}
      </ol> : <></>}
      <h4>Your next pay day is: {today}</h4>
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
          // events={[{
          //   target: "data",
          //   eventHandlers: {
          //     onClick: () => {
          //       return [
          //         {
          //           target: "data",
          //           mutation: (props) => {
          //             const fill = props.style && props.style.fill;
          //             return fill === "black" ? null : { style: { fill: "black"} };
          //           }
          //         }
          //       ];
          //     }
          //   }
          // }]}
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
      <h4>Your amount of money made: </h4>
      <h4>You will make 12900 yen this month</h4>
      <button>Add more storage capacity</button>

      <br />
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
  );
}

export default Providerpage;

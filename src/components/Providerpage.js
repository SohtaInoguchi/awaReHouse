import "../input.css";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import Chat from "./Chat";
import axios from "axios";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, LabelList } from 'recharts';

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
  const [retrievedPayments, setRetrievedPayments] = useState();
  const [thisMonthObject, setThisMonthObject] = useState();

  
  const retrievePayments = async (req,res) => {
    try {
      await axios.get(`/payments/${email2}`)
      .then((res) => {
        if (res.data.length<=12) {
          setRetrievedPayments(res.data)
        } else {
          while (res.data.length>12){
            res.data.shift()
          }
          setRetrievedPayments(res.data)
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

  const incomingPayment = (providerItems.length)*1077;
  const latestObj = {covered_month:"This month", amount_jpy: incomingPayment};

  useEffect(()=>{
    retrieveProviderItems()
  },[displayProviderTable])
  
  function CustomTooltip({ payload, label, active }) {
    if (active) {
      return (
        <div>
          <p className="label">{`${label} : JPY ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  }


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
      <BarChart width={600} height={300} data={retrievedPayments} margin={{ top: 15, right: 30, left: 20, bottom: 5 }}>
    <XAxis dataKey="covered_month" stroke="#000000" tick={{fontSize: 0}} />
    <YAxis tick={{fontSize: 12}}/>
    <Tooltip content={<CustomTooltip />} wrapperStyle={{ background: "lightblue"}} />
    {/* <Legend width={100} wrapperStyle={{ top: 40, left: 75, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} /> */}
    {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 2" /> */}
    <Bar dataKey="amount_jpy" fill="#094aed" barSize={50}/>
    <Bar dataKey="pv" fill="#12c5e0" barSize={50} />
  </BarChart>
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

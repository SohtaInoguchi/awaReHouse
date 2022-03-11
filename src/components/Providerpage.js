import "../input.css";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import Chat from "./Chat";
import axios from "axios";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const data = [{name: 'September 2020', uv: 400, pv: 2400}, {name: 'October 2020', uv: 600, pv: 1200}, {name: 'November 2020', uv: 200, pv: 1800}, {name: 'December 2020', uv: 900, pv: 1700}];

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
  },[])
  
  const retrieveProviderItems = (req,res) => {
    axios.post("/providerItems", { providerAddress }).then((res) => setProviderItems(res.data));
  }

  useEffect(()=>{
    retrieveProviderItems()
  },[displayProviderTable])

  

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
      <BarChart width={600} height={300} data={data}>
    <XAxis dataKey="name" stroke="#000000" />
    <YAxis />
    <Tooltip wrapperStyle={{ width: 150, backgroundColor: '#ccc' }} />
    <Legend width={100} wrapperStyle={{ top: 40, left: 75, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <Bar dataKey="uv" fill="#094aed" barSize={50} />
    <Bar dataKey="pv" fill="#094aed" barSize={50} />
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

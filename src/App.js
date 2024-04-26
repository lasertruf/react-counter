import React, { useState } from 'react';
import axios from 'axios';
import "./App.css"
const App = () => {
  const [timestamp, setTimestamp] = useState('');
  const [data, setData] = useState(null);
  const [count, setCount] = useState(null);

  const url = 'http://13.235.244.86/api'
  const addTimestamp = async () => {
    try {
      const response = await axios.post(`${url}/data`, { data: new Date() });
      setTimestamp(response.data.data.data);
      setData(response.data.data._id)
    } catch (error) {
      console.error('Error adding timestamp:', error);
    }
  };

  const updateTimestamp = async () => {
    try {
      let timestamp = new Date();
      const response = await axios.put(`${url}/data/${data}`, { data: timestamp });
      setTimestamp(timestamp.toISOString());
    } catch (error) {
      console.error('Error updating timestamp:', error);
    }
  };

  const getCount = async () => {
    try {
      const response = await axios.get(`${url}/count`);
      setCount(response.data.counts)
    } catch (error) {
      console.error('Error updating timestamp:', error);
    }
  };



  return (
    <div style={{margin:"8px"}}>
      <h3>Timestamp: {timestamp}</h3>
      <div style={{display:'flex',gap:'4px'}}>
        <button onClick={addTimestamp}><span>Add Timestamp</span></button>
        <button disabled={!data} onClick={updateTimestamp}><span>Update Timestamp</span></button>
      </div>
      <hr></hr>
      <div style={{display:'flex',gap:'8px', margin:'4px 0 4px 0', alignItems:'center'}}>
      <button onClick={getCount}><span>Get Count</span></button>
      </div>
      {count && <div style={{fontSize:"14px",margin:"0 0 0 2px"}}><div>{"Add count:" + count.addCount}</div> <div>{"Update count:" + count.updateCount}</div></div>}

    </div>
  );
};

export default App;

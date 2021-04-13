import React, { useState } from 'react'
import axios from 'axios';
import { baseUrl } from '../http-service';

export default function StatsPage() {
    const [start, setStart] = useState(0);
    const [limit, setLimit] = useState(0);
    const [object, setObject] = useState({
        payload: ''
    });
    const [size, setSize] = useState(0);

    const updateStart = (start) => {
        const num = document.getElementById("start").value;
        setStart(num);
    }
    const updateLimit = (limit) => {
        const num = document.getElementById("limit").value;
        setLimit(num);
    }
    const getStats = (start, limit) => {
        axios({
            url: baseUrl + "stats/",
            method: 'GET',
            params: {
                start: start,
                limit: limit
            }
        }).then(res => {
            // console.log(res.data);
            console.log("resoluc:" + JSON.stringify(res.data.payload));
            setObject({ payload: res.data.payload });
            setSize(res.data.size);
        }, (error) => {
            console.log(error);
        });
    }
    return (
        <div>
            <div style={{ marginTop: "3%" }}><b>SHOW STATS</b></div>
            <div className="statDiv">
                <input type="number" min="1" max="10000" placeholder="Enter Start" className="statButton" id="start" onChange={() => updateStart()} />
                <input type="number" min="1" max="10000" placeholder="Enter Limit" className="statButton" id="limit" onChange={() => updateLimit()} />

            </div>
            <button onClick={() => getStats(start, limit)} className="cardButton">Show</button>
           <div className="statContentDiv">
            <p> Total Size: {size}</p>
            <div >
                {
                    Object.keys(object.payload).map((key, i) => (
                        <p key={i}>
                            <span>IIN: {key} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span>Hits: {object.payload[key]}</span>
                        </p>
                    )
                    )
                }
            </div>
            </div>
        </div>
    )
}

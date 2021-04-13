import React, { useState } from 'react'
import Header from '../shared/Header/Header'
import { baseUrl } from '../http-service';
import './StartPage.scss'
import axios from 'axios';
import StatsPage from './StatsPage';

export default function StartPage() {
    const [cardNumber, setCardNumber] = useState("");
    const [scheme, setScheme] = useState("");
    const [type, setType] = useState("");
    const [bank, setBank] = useState("");


    const updateCardNumber = (number) => {
        const num = document.getElementById("cardnumber").value;
        setCardNumber(num);
    }
  


    const verifyCard = (val) => {
        axios({
            url: baseUrl + "verify/" + val,
            method: 'GET',
        }).then(res => {
            // console.log(res.data);
            console.log("resoluc:" + res.data.payload.bank);
            setScheme(res.data.payload.scheme);
            setType(res.data.payload.type);
            setBank(res.data.payload.bank);
        }, (error) => {
            console.log(error);
        });
    }

   

    return (
        <div>
            <Header />
            <div className="cardDiv">
                <textarea
                    rows="1"
                    cols="50" placeholder="CardNumber"
                    id="cardnumber"
                    onChange={() => updateCardNumber()}
                    className="enterBox"
                ></textarea>

                <button onClick={() => verifyCard(cardNumber)} className="cardButton">Submit</button>
                <div className="contentDiv">
                    <div>
                        <div className="content">Scheme</div>
                        <p style={{ borderBottom: "1px solid" }}>{scheme}</p>
                    </div>
                    <div>
                        <div className="content">Type </div>
                        <p style={{ borderBottom: "1px solid" }}>{type}</p>
                    </div>
                    <div>
                        <div className="content">Bank </div>
                        <p style={{ borderBottom: "1px solid" }}>{bank}</p>
                    </div>
                </div>
            </div>

            <StatsPage />

        </div>
    )
}
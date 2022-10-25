// import './App.css';
import React, { useState, useEffect, ChangeEvent } from 'react';

import api from "./services/api";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import { AiOutlineLinkedin } from 'react-icons/ai';
import { FaGithub } from 'react-icons/fa';
import { GoMail } from 'react-icons/go';

export default function App() {

  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    api
      .get("/currencies.json")
      .then((response) => setApiData(response.data))
      .catch((err) => {
        console.error("Não encontrado. " + err);
      });
  }, []);

  const countries_list = Object.entries(apiData)

  const [currentMoney, setCurrentMoney] = useState("brl");
  const [toBeMoney, setToBeMoney] = useState("usd");
  const [percentage, setPercentage] = useState([0,0]);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [initialAmount, setInitialAmount] = useState(0);

  const update = String(Object.values(percentage)[0]);

  // console.log('percentage array' + Object.values(percentage));
  // console.log('percentage' + Object.values(percentage)[0]);    //retornando o dado que eu preciso (URL com valores convertidos)
  // console.log('currentdMoney' + currentMoney);
  // console.log('tobeMoney' + toBeMoney);
  // console.log('amount' + initialAmount);
  // console.log(countries_list.length);

  const handleCurrentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentMoney(event.target.value);
  };
  const handleToBeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setToBeMoney(event.target.value);
  };
  const handleInitialAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInitialAmount(parseFloat(event.target.value));
  };

  useEffect(() => {
    api
      .get(`currencies/${currentMoney}/${toBeMoney}.json`)
      .then((response) => setPercentage(response.data))
      .catch((err) => {
        console.error("Não encontrado. " + err);
      });
  }, [currentMoney, toBeMoney]);

  const handleConvertionChange = () => {
    setConvertedAmount(initialAmount * Object.values(percentage)[1]);
  }
  
  return (
    <>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '30ch' },
        }}
        noValidate
        autoComplete="off"
        className="content"
      >
        <h1>Currency converter</h1>
        <TextField
          id="amount"
          label="Amount to convert:"
          variant="outlined"
          type="number"
          value={initialAmount.toFixed(2)}
          onChange={handleInitialAmountChange}
          className="values"
        />

        <div className="options">
          <TextField
            id="standard-select-currency"
            select
            label="Convert from (initial currency)"
            value={currentMoney}
            onChange={handleCurrentChange}
            // helperText=""
            variant="standard"
            className="select"
          >
            {countries_list.map(([key, data], index) => (
              <MenuItem key={index} value={key} className="item" >
                {data}
              </MenuItem>
            ))}
          </TextField>

          <Button variant="contained" onClick={handleConvertionChange} disableElevation className="button"> 
           Convert now
          </Button>

          <TextField
            id="standard-select-currency"
            select
            label="Convert to (new currency)"
            value={toBeMoney}
            onChange={handleToBeChange}
            // helperText=""
            variant="standard"
            className="select"
          >
            {countries_list.map(([key, data], index) => (
              <MenuItem key={index} value={key} className="item" >
                {data}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <TextField
          id="converted-amount"
          label="Converted amount:"
          variant="outlined"
          type="number"
          value={convertedAmount.toFixed(2)}
          className="values"
          InputProps={{
            readOnly: true,
          }}
        />

        <p>{`Convertion updated at: ${update.replace(/-/g, '/')}`}</p>
      </Box>
    
      <footer>
        <div>
          <img src="./img/code.ico" alt="Code icon" height="50em" className="codeIcon"/>
          <h6>Gabriel Brito - 2022</h6>
        </div>
        <div>
          <div>
            <h6 className="footers">Codes: </h6>
            <a href="https://github.com/briitogabriel" target="_blank" rel="noreferrer"><FaGithub /></a>
          </div>
          <div>
            <h6 className="footers">Networking: </h6>
            <a href="https://www.linkedin.com/in/brittogabriel/" target="_blank" rel="noreferrer"><AiOutlineLinkedin /></a>
          </div>
          <div>
            <h6 className="footers">Contact: </h6>
            <a href="mailto:gabriel.brito.a@hotmail.com?subject=Olá, Gabriel!" target="_blank" rel="noreferrer"><GoMail /></a>
          </div>
        </div>
      </footer> 
    </>
  );
}
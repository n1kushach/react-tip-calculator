import "./App.css";
import Logo from "./images/logo.svg";
import DollarSign from "./images/icon-dollar.svg";
import PeopleIcon from "./images/icon-person.svg";
import { TipButton } from "./components/TipButton/TipButton";
import { useReducer, useState } from "react";

export const ACTIONS = {
  BILL_INPUT: "bill-input",
  SELECT_TIP: "select-tip",
  SELECT_PEOPLE: "select-people",
  CALCULATE: "calculate",
  RESET: "reset"
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.BILL_INPUT:
        return {
          ...state,
          selectBill: Number(action.payload),
        };
    case ACTIONS.SELECT_TIP:
      return {
        ...state,
        selectTip: Number(action.payload.substring(0, action.payload.length - 1)),
      } 
    case ACTIONS.SELECT_PEOPLE:
      return {
        ...state,
        numberOfPeople: Number(action.payload)
      }
    case ACTIONS.CALCULATE:
      return {
        ...state,
        tipAmount: evaluateTip(state.selectBill, state.selectTip, state.numberOfPeople),
        total: evaluateTotal(state.selectBill, state.selectTip, state.numberOfPeople)
      }   
    case ACTIONS.RESET:
      return {
        selectBill : 0,
        selectTip: 0,
        numberOfPeople: 0,
        tipAmount: 0,
        total: 0,
      }  
  }
}

const evaluateTip = (bill, tip, people) => {
  return (bill * (tip / 100) / people) 
}

const evaluateTotal = (bill, tip, people) => {
  let tipAmount = bill * (tip / 100) / people;
  return (bill / people) + tipAmount;
}

function App() {
  const [state, dispatch] = useReducer(reducer, {
    selectBill: 0,
    selectTip: 0,
    numberOfPeople: 0,
    tipAmount: 0,
    total: 0,
  });

  console.log(state);

  return (
    <div className="App">
      <img src={Logo} alt="Logo with company text..."></img>
      <div className="main">
        <div className="left">
          <h3 className="main-h3">Bill</h3>
          <div className="bill">
            <img className="dollar" src={DollarSign}></img>
            <input
              onChange={(event) =>
                dispatch({
                  type: ACTIONS.BILL_INPUT,
                  payload: event.target.value,
                })
              }
              type="text"
              className="input"
              placeholder="0"
            ></input>
          </div>
          <h3 className="main-h3">Select Tip %</h3>
          <div className="tip-grid">
            <TipButton dispatch={dispatch} amount="5%"/>
            <TipButton dispatch={dispatch} amount="10%"/>
            <TipButton dispatch={dispatch} amount="15%"/>
            <TipButton dispatch={dispatch} amount="25%"/>
            <TipButton dispatch={dispatch} amount="50%"/>
            <button className="tip-grid-item">Custom</button>
          </div>
          <h3 className="main-h3">Number of People</h3>
          <div className="bill">
            <img className="dollar" src={PeopleIcon}></img>
            <input onChange={(event) => dispatch({type: ACTIONS.SELECT_PEOPLE, payload: event.target.value})} className="input" placeholder="5"></input>
          </div>
        </div>
        <div className="right">
          <div className="rightbox">
            <div className="rightbox-top">
              <div className="flex-col">
                <h3 className="rightbox-h3">Tip Amount</h3>
                <p className="rightbox-p">/ person</p>
              </div>
              <h1 className="rightbox-h1">{state.tipAmount}</h1>
            </div>
            <div className="rightbox-mid">
              <div className="flex-col">
                <h3 className="rightbox-h3">Total</h3>
                <p className="rightbox-p">/ person</p>
              </div>
              <h1 className="rightbox-h1">{state.total}</h1>
            </div>
            <div className="btn">
              <button onClick={() => dispatch({type: ACTIONS.CALCULATE})} className="rightbox-submit">CALCULATE</button>
              <button onClick={() => dispatch({type: ACTIONS.RESET})} className="rightbox-submit">RESET</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

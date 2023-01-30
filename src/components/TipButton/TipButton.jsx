import React from 'react';
import "../../App.css";
import { ACTIONS } from '../../App';

export const TipButton = ({amount, dispatch}) => {
  return (
    <button onClick={(event) => dispatch({type: ACTIONS.SELECT_TIP, payload: event.target.innerHTML})} className="tip-grid-item">{amount}</button>
  )
}


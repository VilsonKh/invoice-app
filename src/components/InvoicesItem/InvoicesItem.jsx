//styles
import './InvoicesItem.scss';
//components
import StatusElem from '../StatusElem/StatusElem';
//img
import arrowRight from '../../assets/icon-arrow-right.svg';
//libs
import { Link, useLinkClickHandler, useParams } from "react-router-dom";
//hooks
import { useContext } from 'react';
import darkContext from '../../context/dark/darkContext';

const InvoicesItem = ({ number, name, dateDue, amount, status}) => {
  const {dark} = useContext(darkContext);
  
  let price = amount.toLocaleString("en-US");
  let dateText = new Date(dateDue).toLocaleDateString('en-GB',{month: "short", day: 'numeric', year: 'numeric'});
  
  return (
    <div  key={number} number={number} className={`invoicesList__item d-flex justify-content-between ${dark ? ' dark-header' : ""}`}>

    <div className={`invoicesList__item-left ${dark ? 'dark-header' : ''}`}>
      <p className="item__number">
        <span>#</span>
        {number}
      </p>
      <p className="item__date">
        Due <span>{dateText}</span>
      </p>
      <p className="item__amount">
        £ <span>{price}</span>
      </p>
    </div>
    <div className="invoicesList__item-right">
      <p className="item__name">{name}</p>
      <StatusElem status={status}></StatusElem>
      <img className="item__arrowRight" src={arrowRight} alt="" />
    </div>

</div>
  )
}

export default InvoicesItem
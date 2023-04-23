import leftArrow from "../assets/icon-arrow-left.svg";
import "../styles/NewInvoice.scss";

const ButtonBack = (props) => {
  return (
    <div className="addInvoice__button-container">
					<img src={leftArrow} alt="" />
					<button onClick={props.onHide}>Go back</button>
				</div>
  )
}

export default ButtonBack
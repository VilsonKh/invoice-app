import leftArrow from "../assets/icon-arrow-left.svg";
import "../styles/NewInvoice.scss";

const ButtonBack = ({onHide, onHidePreview}) => {

 

  return (
    <div className="addInvoice__button-container">
					<img src={leftArrow} alt="" />
					<button>Go back</button>
				</div>
  )
}

export default ButtonBack
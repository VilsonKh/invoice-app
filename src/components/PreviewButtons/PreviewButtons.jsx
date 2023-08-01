import { useContext } from "react"
import invoiceContext from "../../context/invoice/invoiceContext"
import darkContext from "../../context/dark/darkContext"
import { updateInvoiceStatus } from "../../firebase/service"

const PreviewButtons = ({status}) => {
  const {dark} = useContext(darkContext)
  const {setIsEditInvoice, currentInvoiceId, setDeleteConf} = useContext(invoiceContext)
  console.log(status)
  return (
    <div className={`invoicePreview__groupButtons invoicePreview__statusButtons `}>
    <button onClick={() => setIsEditInvoice(true)} className={`invoicePreview__btn-edit ${dark ? "dark-light dark-font_purple" : ""}`}>
      Edit
    </button>

    <button onClick={() => setDeleteConf(true)} className="invoicePreview__btn-delete">
      Delete
    </button>
    <button
      onClick={() => updateInvoiceStatus(currentInvoiceId)}
      style={status === "paid" ? { opacity: "0.5" } : null}
      disabled={status === "paid" ? true : false}
      className="invoicePreview__btn-paid"
    >
      Mark as Paid
    </button>
  </div>

  )
}

export default PreviewButtons
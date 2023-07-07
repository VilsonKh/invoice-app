import React, { useContext } from 'react'
import darkContext from '../../context/dark/darkContext'

const EditInvoiceButtons = () => {

  const {dark} = useContext(darkContext)
  return (
<div className="editInvoice__buttons">
{/* onClick={() => setEditInvoice(false)}  */}
    <button  className={`editInvoice__cancel ${dark ? "dark-light dark-font" : ""}`}>
      Cancel
    </button>
    <button className="editInvoice__save" type="submit" form="newInvoice">
      Save Changes
    </button>
  </div>
  )
}

export default EditInvoiceButtons

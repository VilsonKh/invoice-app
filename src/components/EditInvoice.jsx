import invoiceContext from '../context/invoice/invoiceContext';
import '../styles/EditInvoice.scss';
import ButtonBack from './ButtonBack';
import {useContext} from 'react'
import Form from './Form';



const EditInvoice = () => {
  const {currentInvoice} = useContext(invoiceContext)

  return (
    <div className='editInvoice container'>
      <ButtonBack></ButtonBack>
      <h1>Edit <span>#</span> {currentInvoice}</h1>
      <Form></Form>
      <div className="editInvoice__buttons">
        <button className='editInvoice__cancel'>Cancel</button>
        <button className='editInvoice__save' type='submit' form='newInvoice'>Save Changes</button>
      </div>
    </div>
  )
}

export default EditInvoice
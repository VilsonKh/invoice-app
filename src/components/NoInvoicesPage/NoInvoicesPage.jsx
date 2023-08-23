//styles
import './NoInvoicesPage.scss';
//assets
import illustrationEmpty from '../../assets/illustration-empty.svg';
//context
import darkContext from '../../context/dark/darkContext';
//hooks
import { useContext } from 'react'

//component renders when there is no data in database
const NoInvoicesPage = () => {
  const {dark} = useContext(darkContext)
  return (
    <div className='container'>
      <div className='nothingPage__container'>
        <img className='nothingPage__img' src={illustrationEmpty} alt="noInvoiceImage" />
        <p className={`nothingPage__heading ${dark ? "dark-font" : ''}`}>There is nothing here</p>
        <p className='nothingPage__text'>Create an invoice by clicking the <span style={{'fontWeight': 'bold'}}>New</span> button and get started</p>
      </div>
    </div>
  )
}

export default NoInvoicesPage
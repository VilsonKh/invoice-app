import { Link } from "react-router-dom"

const Page404 = () => {
  return (
    <div>
      <p style={{"fontSize": '1.5rem', 'textAlign': 'center'}}>The page you are looking for may have been moved, deleted, or possibly never existed.</p>
      <p style={{"fontSize": '10rem', 'color': '#7C5DFA', 'textAlign': 'center'}}>404</p>
      <Link style={{'display': 'block', 'textAlign': 'center', 'textDecoration': 'none', 'color': 'inherit'}} to="/">Back to main page</Link>
    </div>
  )
}

export default Page404
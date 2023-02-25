import {AiOutlineArrowDown} from "react-icons/ai";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="container-sm text-center mt-5">
      <h1>Page not Found :(</h1>
      <h5>Go to Home Page?</h5>
      <div className="mb-2"><AiOutlineArrowDown size={30} color="green" /></div>
      <Link to="/"><button type="button" className="btn btn-outline-success">Home Page</button></Link>
    </div>
  )
}

export default PageNotFound;
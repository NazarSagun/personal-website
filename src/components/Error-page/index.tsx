import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error: any = useRouteError();
  console.log(error);

  return (
    <div>
      <h1>Ooops!</h1>
      {error.message || error.statusText}
    </div>
  )
}

export default ErrorPage;
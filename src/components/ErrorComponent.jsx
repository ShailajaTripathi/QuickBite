import React from 'react'
import { useRouteError } from 'react-router'
const ErrorComponent = () => {
    const err= useRouteError();
    console.log(err,"errrrrrrror");
  return (
    <div><h2>
       {err?.status} : {err?.error?.message}
    </h2></div>
  )
}

export default ErrorComponent
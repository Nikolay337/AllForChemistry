import React from 'react'

function ErrorPage() {

  setTimeout(() => {
    window.location.href = '/home';
  }, 2000);

  return (
    <div>Oops! Something went wrong!</div>
  )
}

export default ErrorPage
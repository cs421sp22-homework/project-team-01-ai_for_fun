import * as React from "react";
import "../bootstrap-4.3.1-dist/css/bootstrap.min.css";
import "../bootstrap-4.3.1-dist/css/bootstrap.css";
// importing material UI components

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
    integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
    crossorigin="anonymous"></link>

export default function Introduction() {
    return (

        <header className={'text-center text-black py-5'}>
            <h1 className={'display-4 font-weight-bold mb-4'}>AI For Fun</h1>
            <p>This is an applicaiton that would like to implement AI model in human face, for bring fun exprience to you.</p>
        </header>

    )
}
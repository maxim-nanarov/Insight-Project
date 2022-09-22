import React, { useEffect, useState } from "react";
import axios from "axios";
import "./app.scss";

function App() {
  const [message, setMessage] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    setInterval(() => {
      axios.get("/data");
    }, 120000);

    axios.get("/GetData").then((res) => {
      setMessage(res.data);
    });
  }, [message]);

  let count = 0;

  if (message.length !== 0) {
    let a = message.map((title) => {
      count++;
      if (input === "") {
        return (
          <>
            <div className="Blog" key={count}>
              <div>
                <h3>{title.title}</h3>
                <h5>{title.author}</h5>
                <p>{title.content}</p>
                <div>{title.date}</div>
              </div>
            </div>
            <br></br>
          </>
        );
      } else if (title.title.includes(input)) {
        return (
          <>
            <div className="Blog" key={count}>
              <div>
                <h3>{title.title}</h3>
                <h5>{title.author}</h5>
                <p>{title.content}</p>
                <div>{title.date}</div>
              </div>
            </div>
            <br></br>
          </>
        );
      }
      return <></>;
    });

    function handleAnswerChange(event) {
      setInput(event.target.value);
    }

    return (
      <>
        <div className="sideNavBar">
          <label>My Dark Web</label>
        </div>
        <div className="MidBar">
          <h1>My Dark Web</h1>
          <input
            key="testing"
            placeholder="Search"
            onChange={handleAnswerChange}
            type="text"
          ></input>
        </div>
        <div className="main">{a}</div>
      </>
    );
  } else {
    return (
      <div className="loading">
        <h1>Loading</h1>
        <div class="container">
          <div class="rotating first"></div>
          <div class="rotating second"></div>
          <div class="rotating third"></div>
        </div>
      </div>
    );
  }
}

export default App;

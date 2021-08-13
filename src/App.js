import { indexOf } from "lodash";
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const api_url = "https://jsonplaceholder.typicode.com/todos";
  const [data, setData] = useState([]);
  const [description, setDescription] = useState("");
  const [update, setUpdate] = useState({
    description: "",
    number: 0,
    id: 0,
  });
  useEffect(() => {
    handleFetchData();
  }, []);
  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setUpdate({
      ...update,
      [e.target.name]: value,
    });
  };

  const handleFetchData = async () => {
    let res = await fetch(api_url);
    let resData = await res.json();
    if (resData) {
      setData([...resData]);
    } else {
      alert("Server error");
    }
  };

  const handleDelete = async (id, index) => {
    await fetch(api_url + `/${id}`, {
      method: "DELETE",
    });
    data.splice(index, 1);
    setData([...data]);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    let res = await fetch(api_url, {
      method: "POST",
      body: JSON.stringify({
        title: description,
        complete: false,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    let dataJson = await res.json();
    if (dataJson) {
      console.log("Post resquest data ", dataJson);
      data.unshift(dataJson);
      console.log(typeof dataJson);
      console.log(typeof data);

      setData([...data]);

      console.log("Post resquest data ", data);
    } else {
      console.log("error put");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { description, id, number } = update;
    let res = await fetch(api_url + `/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        id,
        title: description,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    let dataJson = await res.json();
    if (dataJson) {
      data[number - 1] = dataJson;
      setData([...data]);
      console.log("put resquest data ", dataJson);
    } else {
      console.log("error put");
    }
  };

  console.log("->", data);
  return (
    <div className="App">
      <h1>ToDO List</h1>
      <div>
        <form>
          <input
            id="des-input"
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What do you need to do ?"
            required
          />
          <button id="add-btn" type="submit" onClick={(e) => handleCreate(e)}>
            Add a task
          </button>
        </form>
        <form>
          <input
            id="des-input"
            type="text"
            name="description"
            value={update.description}
            onChange={handleChange}
            placeholder="want to update"
            required
          />
          <input
            type="number"
            name="id"
            value={update.id}
            onChange={handleChange}
          />
          <input
            type="number"
            name="number"
            value={update.number}
            onChange={handleChange}
          />
          <button id="add-btn" type="submit" onClick={(e) => handleUpdate(e)}>
            Update
          </button>
        </form>
      </div>
      {data.map((item, index) => {
        return (
          <div key={index}>
            <div>
              <p>
                <b>No. </b> : {index + 1}
              </p>
            </div>
            <div>
              <p>
                <b>Id </b> : {item.id}
              </p>
            </div>
            <div>
              <p>
                <b>Task </b> : {item.title}
              </p>
            </div>
            <div>
              <p>
                <b>Completed</b> : {item.completed === false ? "False" : "True"}
              </p>
            </div>
            <div>
              <button onClick={() => handleDelete(item.id, index)}>
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const api_url = "https://jsonplaceholder.typicode.com/todos";
  const [data, setData] = useState([]);
  const [description, setDescription] = useState("");
  const [update, setUpdate] = useState({
    description: "",
    number: -1,
    id: -1,
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
    if (description.length <= 0) {
      alert("New Task Field is Emplty");
    } else {
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
        data.unshift(dataJson);
        setData([...data]);
      } else {
        alert("Server Error!");
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { description, id, number } = update;
    if (description.length > 0 || id !== -1 || number !== -1) {
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
      } else {
        alert("Server Error!");
      }
    } else {
      if (description.length <= 0) {
        alert("Update Field Empty!");
      } else if (number === -1) {
        alert("Task No Field Empty");
      } else if (id === -1) {
        alert("Task ID Field Empty");
      }
    }
  };

  return (
    <div className="App position-relative">
      <nav className="navbar navbar-dark bg-dark  fixed-top ">
        <h1 className="display-4">ToDo List</h1>
      </nav>
      <div className="main">
        <div className="form_container  position-fixed ">
          <form className="new_task_form ">
            <div>
              <h1 className="display-5">New Task</h1>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="What do you need to do ?"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <label v-for="floatingInput">What do you need to do ?</label>
            </div>

            <div className="d-grid gap-2 col-6 mx-auto">
              <button
                className="btn btn-primary"
                id="add-btn"
                type="submit"
                onClick={(e) => handleCreate(e)}
              >
                Add a task
              </button>
            </div>
          </form>
          <hr />
          <form className="update_task_container">
            <div>
              <h1 className="display-5">Update Task</h1>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="des-input"
                type="text"
                name="description"
                value={update.description}
                onChange={handleChange}
                placeholder="What's the update"
                required
              />
              <label v-for="floatingInput">What's the update</label>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="des-input"
                type="number"
                name="id"
                placeholder="Enter Task No :"
                value={update.id}
                onChange={handleChange}
                required
              />
              <label v-for="floatingInput">Enter Task No : </label>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="des-input"
                type="number"
                name="number"
                placeholder="Enter Task ID :"
                value={update.number}
                onChange={handleChange}
                required
              />
              <label v-for="floatingInput">Enter Task ID : </label>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
              <button
                className="btn btn-primary"
                id="add-btn"
                type="submit"
                onClick={(e) => handleUpdate(e)}
              >
                Update
              </button>
            </div>
          </form>
        </div>
        <div className="display_container ">
          {data.map((item, index) => {
            return (
              <div className="card card_item" key={index}>
                <div className="card-header card_header_no_id">
                  <h5 className="display-6">Task No : {index + 1}</h5>
                  <p>
                    <b>ID </b> : {item.id}
                  </p>
                </div>
                <div className="card-body">
                  <div>
                    <h4 className="card-title">Task : {item.title}</h4>
                  </div>
                  <div>
                    <p className="card-text ">
                      Completed : {item.completed === false ? "False" : "True"}
                    </p>
                  </div>
                  <div className="delete_btn_container">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDelete(item.id, index)}
                    >
                      Complete / Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

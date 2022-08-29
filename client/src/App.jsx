import React from "react";
import axios from "axios";
import Register from "./components/register/Register";
import Login from "./components/login/Login";

function App() {
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState(0);
  const [country, setCountry] = React.useState("");
  const [position, setPosition] = React.useState("");
  const [wage, setWage] = React.useState(0);
  const [newWage, setNewWage] = React.useState(0);
  const [show, setShow] = React.useState(false);
  const [employees, setEmployees] = React.useState(null);
  React.useEffect(() => {
    const getData = async () => {
      const data = await axios.get("http://localhost:5000/employees");
      setEmployees(data.data.data);
    };
    getData();
  }, [employees]);
  const submitForm = () => {
    const newEmp = axios.post("http://localhost:5000/create", {
      name,
      age,
      country,
      position,
      wage,
    });
    setEmployees([...employees, newEmp]);
  };

  const updateEmployee = (id) => {
    axios
      .put("http://localhost:5000/update", {
        id,
        wage: newWage,
      })
      .then(() => {
        setEmployees(
          employees.map((val) => {
            return val.id === id
              ? {
                  name: val.name,
                  age: val.age,
                  country: val.country,
                  position: val.position,
                  wage: newWage,
                }
              : val;
          })
        );
      });
  };

  const deleteEmployee = (id) => {
    axios.delete(`http://localhost:5000/delete/${id}`);
    setEmployees(
      employees.filter((val) => {
        return val.id !== id;
      })
    );
  };
  return (
    <div className="container mt-5">
      {/* <Register /> */}
      <Login />
      <form style={{ maxWidth: "600px" }} className="mx-auto p-4">
        <h3 className="text-center">Form</h3>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="country" className="form-label">
            Country
          </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="position" className="form-label">
            Position
          </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="wage" className="form-label">
            Wage
          </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setWage(e.target.value)}
          />
        </div>
        <button className="btn btn-success my-3" onClick={submitForm}>
          Add employee
        </button>
      </form>
      <hr />
      <button className="btn btn-warning" onClick={(e) => setShow(!show)}>
        Show Employee
      </button>
      {show && (
        <div className="">
          {employees.map((employee, i) => (
            <div className="card mt-3 p-3" key={i}>
              <p>{employee.name}</p>
              <p>{employee.age}</p>
              <p>{employee.country}</p>
              <p>{employee.position}</p>
              <p>{employee.wage}</p>
              <div className="d-flex gap-3">
                <div className="form-group">
                  <label htmlFor="newWage">Wage</label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setNewWage(e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-secondary h-50 mt-4"
                  onClick={() => updateEmployee(employee.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger h-50 mt-4"
                  onClick={() => deleteEmployee(employee.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

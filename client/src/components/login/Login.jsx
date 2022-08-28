import React from "react";
import axios from "axios";
function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const submitLogin = async (e) => {
    e.preventDefault();
    const newUser = await axios.post("http://localhost:5000/login", {
      email,
      password,
    });
    console.log(newUser.data);
  };
  return (
    <div>
      <div className="container bg-info p-4">
        <form>
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-success" onClick={submitLogin}>
            Apply
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

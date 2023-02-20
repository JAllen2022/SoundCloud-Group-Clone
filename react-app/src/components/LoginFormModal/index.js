import React, { useState } from "react";
import { login } from "../../store/session";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
      history.push('/songs')
    }
  };

  return (
    <div className='modal-container'>
      <div className='modal-form-container'>
        <h1 className='modal-form-title'>Sign in</h1>
        <form onSubmit={handleSubmit}>
          <ul className='errors'>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label className='input-label'>
            Email
            <input
              className='input-item'
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='Your email address'
            />
          </label>
          <label className='input-label'>
            Password
            <input
              className='input-item'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button id='modal-btns' type="submit">Log In</button>
          <button
              id="modal-btns"
              type="submit"
              onClick={(e) => {
                setEmail("demo@aa.io");
                setPassword("password");
              }}
            >
              Demo User
            </button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormModal;

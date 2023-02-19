import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [displayName, setDisplayName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(displayName, email, password));
			console.log("what is displayName", displayName)
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div  className="modal-container">
			<h1 className="modal-form-title">Sign Up</h1>
			<div  className="modal-form-container">
				<form onSubmit={handleSubmit}>
					<ul className="errors-container">
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
						/>
					</label>
					<label className='input-label'>
						Display Name
						<input
							className='input-item'
							type="text"
							value={displayName}
							onChange={(e) => setDisplayName(e.target.value)}
							required
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
					<label className='input-label'>
						Confirm Password
						<input
							className='input-item'
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</label>
					<button id="modal-btns" type="submit">Sign Up</button>

				</form>
			</div>

		</div>
	);
}

export default SignupFormModal;

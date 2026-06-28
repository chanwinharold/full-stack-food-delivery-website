import "./Signup.css";
import Button from '../../components/Button/Button';
import IconClose from '../../assets/components/IconClose';
import {apiRequest} from "../../services/api.js";
import {useState, useContext} from "react";
import {useNavigate} from "react-router";
import AlertContext from "../../contexts/AlertContext/AlertContext.js";
import Alert from "../../components/AlertPopup/Alert.jsx";


function Signup() {
	const [inputs, setInputs] = useState({
		username: "",
		email: "",
		password: ""
	})
	const [, setData] = useState(null)
	const { setShowAlert, setStatus, setDetail, showAlert, status, detail } = useContext(AlertContext)
	const navigate = useNavigate();

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setInputs(values => ({...values, [name]: value}))
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		const data = await apiRequest("/auth/signup", "POST", inputs)
		setData(data); setShowAlert(true); setStatus(data.status); setDetail(data.detail);

		if (data.status === 201) {
			navigate("/login")
		}
	}

	return (
		<form onSubmit={handleSubmit} className="py-6 max-w-118.75 m-auto my-16 bg-neutral-950 rounded-default grid">

			{showAlert ? <Alert setter={setShowAlert} status={status}>{detail}</Alert> : null}

			<div className="px-6 pb-6 border-b border-neutral-800 flex items-center justify-between">
				<h1 className="text-xl text-secondary-100 font-bold">
					Sign Up
				</h1>
				<a href="/">
					<IconClose />
				</a>
			</div>

			<fieldset className="px-6 py-6 border-b border-neutral-800 grid gap-6">
				<legend className="hidden" aria-hidden={true}>
					credentials
				</legend>

				<div className="input-field">
					<label htmlFor="name">Your name</label>
					<input
						type="text"
						name="username"
						id="name"
						placeholder="John Doe"
						value={inputs.username}
						onChange={handleChange}
						required={true}
						minLength={3}
						maxLength={20}
					/>
				</div>
				<div className="input-field">
					<label htmlFor="email">Your email</label>
					<input
						type="email"
						name="email"
						id="email"
						placeholder="john@example.com"
						value={inputs.email}
						onChange={handleChange}
						required={true}
						maxLength={50}
					/>
				</div>
				<div className="input-field">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						id="password"
						placeholder="......"
						value={inputs.password}
						onChange={handleChange}
						required={true}
						minLength={5}
						maxLength={20}
					/>
				</div>
				<Button
					className={
						"w-full btn-primary inline-flex justify-center rounded-sm"
					}
					type={"submit"}
				>
					Create account
				</Button>

				<div className="flex gap-2 items-center text-sm text-secondary-500">
					<input type="checkbox" name="privacy check" id="privacy" required={true}/>
					<label htmlFor="privacy">
						By continuing, I agree to the terms of use & privacy
						policy.
					</label>
				</div>
			</fieldset>

			<div className="px-6 pt-6 inline-flex justify-center items-center gap-2 text-sm text-secondary-500">
				Already have an account ?{" "}
				<a className="text-primary-600" href="/login">
					Login here
				</a>
			</div>
		</form>
	);
}

export default Signup
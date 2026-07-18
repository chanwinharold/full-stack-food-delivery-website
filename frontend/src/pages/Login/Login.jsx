import "./Login.css";
import Button from "../../components/Button/Button";
import IconClose from '../../assets/components/IconClose';
import Alert from "../../components/AlertPopup/Alert.jsx";
import {useContext, useState} from "react";
import {Link, useNavigate} from "react-router";
import AlertContext from "../../contexts/AlertContext/AlertContext.js";
import {apiRequest} from "../../services/api.js";

function Login() {
	const { setShowAlert, setStatus, setDetail, showAlert, status, detail } = useContext(AlertContext)
    const [inputs, setInputs] = useState({email: "", password: ""})
    const navigate = useNavigate();

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setInputs(values => ({...values, [name]: value}))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = await apiRequest("/auth/login", "POST", inputs)
        setShowAlert(true); setStatus(data.status); setDetail(data.detail);

        if (data.status === 200) {
            navigate("/")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="pb-6 max-w-118.75 m-auto my-16 bg-neutral-950 rounded-default grid">

            {showAlert ? <Alert setter={setShowAlert} status={status}>{detail}</Alert> : null}

            <div className="px-6 flex flex-col gap-2 items-center justify-between relative">
                <h1 className="text-3xl pt-8 text-secondary-100 font-bold">Login</h1>
                <span className="text-xs text-secondary-200">Welcome back to Tomato.</span>

                <Link to={"/"} className="absolute right-4 top-4">
                    <IconClose />
                </Link>
            </div>

            <fieldset className="px-6 py-6 grid gap-6">
                <legend className="hidden" aria-hidden={true}>
                    credentials
                </legend>

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

                <div className="flex gap-2 items-center text-sm text-secondary-500">
                    <input type="checkbox" name="privacy check" id="privacy" required={true}/>
                    <label htmlFor="privacy">
                        I agree to the Terms of Service and Privacy Policy
                    </label>
                </div>

                <Button
                    type={"submit"}
                    className={"w-full btn-primary inline-flex justify-center rounded-sm"}
                >
                    Login
                </Button>
            </fieldset>

            <div className="px-6 pt-6 inline-flex justify-center items-center gap-2 text-sm text-secondary-500">
                Create a new account ?{" "}
                <Link className="text-primary-600" to={"/signup"}>
                    Click here
                </Link>
            </div>
        </form>
    );
}

export default Login;

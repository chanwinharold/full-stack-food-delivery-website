import "./Login.css";
import Button from "../../components/Button/Button";
import IconClose from '../../assets/components/IconClose';
import Alert from "../../components/AlertPopup/Alert.jsx";
import {useContext} from "react";
import AlertContext from "../../contexts/AlertContext/AlertContext.js";

function Login() {
	const { setShowAlert, setStatus, setDetail, showAlert, status, detail } = useContext(AlertContext)

    return (
        <form className="pb-6 max-w-118.75 m-auto my-16 bg-neutral-950 rounded-default grid">

            {showAlert ? <Alert setter={setShowAlert} status={status}>{detail}</Alert> : null}

            <div className="px-6 flex flex-col gap-2 items-center justify-between relative">
                <h1 className="text-3xl pt-8 text-secondary-100 font-bold">Login</h1>
                <span className="text-xs text-secondary-200">Welcome back to Tomato.</span>

                <a href="/" className="absolute right-4 top-4">
                    <IconClose />
                </a>
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
                    />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="......"
                    />
                </div>

                <div className="flex gap-2 items-center text-sm text-secondary-500">
                    <input type="checkbox" name="privacy check" id="privacy" />
                    <label htmlFor="privacy">
                        I agree to the Terms of Service and Privacy Policy
                    </label>
                </div>

                <Button
                    className={"w-full btn-primary inline-flex justify-center rounded-sm"}
                >
                    Login
                </Button>
            </fieldset>

            <div className="px-6 pt-6 inline-flex justify-center items-center gap-2 text-sm text-secondary-500">
                Create a new account ?{" "}
                <a className="text-primary-600" href="/signup">
                    Click here
                </a>
            </div>
        </form>
    );
}

export default Login;

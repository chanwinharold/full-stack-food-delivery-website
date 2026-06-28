import { useNavigate } from "react-router";
import "./Button.css";

function Button({ children, link, className, type }) {
	const Navigate = useNavigate();

	const handleNavigate = () => {
		Navigate(link)
	}

	return (
		<button type={type || "button"} onClick={!type ? handleNavigate : null} className={`btn ${className}`}>
			{children}
		</button>
	);
}

export default Button;

export function BtnGoBack({to, className, children}) {
	const Navigate = useNavigate();

	const handleBackTo = () => {
		Navigate(to)
	}

	return (
		<button onClick={handleBackTo} className={`inline-flex gap-2 items-center cursor-pointer ${className}`}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className={"lucide lucide-arrow-left-icon lucide-arrow-left"}
			>
				<path d="m12 19-7-7 7-7" />
				<path d="M19 12H5" />
			</svg>
			<span className="text-sm">{children}</span>
		</button>
	);
}

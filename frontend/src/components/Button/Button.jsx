import "./Button.css";

function Button({ children, link, className }) {
	return (
		<a href={link} className={`btn ${className}`}>
			{children}
		</a>
	);
}

export default Button;

import React from "react";

export function BtnGoBack({to, className, children}) {
	return (
		<a className={`inline-flex gap-2 items-center ${className}`} href={to}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-arrow-left-icon lucide-arrow-left"
			>
				<path d="m12 19-7-7 7-7" />
				<path d="M19 12H5" />
			</svg>
			<span className="text-sm">{children}</span>
		</a>
	);
}

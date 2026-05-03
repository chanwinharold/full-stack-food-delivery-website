import "./Button.css";


function Button({ children, link, className }) {
  return (
    <a href={link} className={`btn ${className}`}>
      {children}
    </a>
  );
}

export default Button;

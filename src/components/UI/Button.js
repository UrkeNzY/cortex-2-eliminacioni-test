import classes from "./Button.module.css";

const Button = (props) => {
  const buttonClasses = `${classes.button} ${props.className}`;
  return (
    <button className={buttonClasses} onClick={props.onClick}>
      {props.text}
    </button>
  );
};

export default Button;

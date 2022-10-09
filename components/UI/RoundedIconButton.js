import IconButton from "./IconButton";
import styles from "./RoundedIconButton.module.css";

function RoundedIconButton({ children, ...props }) {
  return (
    <IconButton className={styles.btnIconRounded} {...props}>
      {children}
    </IconButton>
  );
}

export default RoundedIconButton;

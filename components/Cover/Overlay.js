import styles from "./Overlay.module.css";

function Overlay({ children: Icon, show, position, onClick }) {
  const positions = {
    "bottom-right": "bottomRight",
    "bottom-left": "bottomLeft",
  };

  const overlayClasses = styles.overlay + " " + styles[positions[position]];

  if (!show) {
    return null;
  }

  return (
    <div className={overlayClasses} role="button" onClick={onClick}>
      <Icon.type {...Icon.props} className={styles.icon} />
    </div>
  );
}

export default Overlay;

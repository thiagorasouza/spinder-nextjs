import Layout from "../Layout/Layout";
import styles from "./BasicPage.module.css";

function BasicPage(props) {
  return (
    <Layout verticallyCenter>
      <div className={styles.container} style={{ maxWidth: props.maxWidth }}>
        <div className={styles.title}>
          <props.icon.type className={styles.titleIcon} />
          <span className={styles.titleText}>{props.title}</span>
        </div>
        <div className={styles.body}>{props.children}</div>
      </div>
    </Layout>
  );
}

export default BasicPage;

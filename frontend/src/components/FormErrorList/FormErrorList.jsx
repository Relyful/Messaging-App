import styles from './FormErrorList.module.css';

export default function ErrorList({ errData }) {
  const errList = errData.map((errMsg) => (
    <li key={errMsg} className={styles.errMessage}>
      {`${errMsg}`}
    </li>
  ))

  return (<ul className={styles.errList}>
    {errList}
  </ul>)
}
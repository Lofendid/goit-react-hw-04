import css from './ErrorMessage.module.css';

export default function ErrorMessage({ msg }) {
  let editMsg;

  switch (true) {
    case msg.includes('.'):
      editMsg = msg;
      break;

    case msg.includes('!'):
      editMsg = msg;
      break;

    default:
      editMsg = msg + '!';
      break;
  }

  return <p className={css.errMsg}>{editMsg}</p>;
}

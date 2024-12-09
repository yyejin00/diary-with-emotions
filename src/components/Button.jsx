import "./Button.css";
const Button = ({ text, type, onClick }) => {
  return (
    <button onClick={onClick} className={`Button Button_${type}`}>
      {text}
    </button>
  );
};
export default Button;
//className={`Button Button_${type}`} 백틱과 $,{}를 이용해서 props로 받은 type를 clasName(스타일)로 적용되게한다. 이렇게 되면 type에서 들어오는 값에 따라 스타일이 달라진다.

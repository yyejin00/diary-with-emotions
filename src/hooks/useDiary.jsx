import { useContext, useState, useEffect } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";
//중복되는 코드를 일반함수로 빼기엔 useState나 useEfect 함수가 제기능을 하지 않을 것임 리액트 훅스는 일반 js에서는 이용할 수 없고, hooks로 빼서 커스텀 훅으로 만들어준다.

const useDiary = (id) => {
  const data = useContext(DiaryStateContext);
  const [currentDiaryItem, setCurrentDiaryItem] = useState();
  const nav = useNavigate();
  useEffect(() => {
    //getCurrentDiaryItem 함수
    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(id)
    );
    if (!currentDiaryItem) {
      window.alert("존재하지 않은 일기입니다.");
      nav("/", { replace: true });
    }
    setCurrentDiaryItem(currentDiaryItem);
  }, [id]);

  return currentDiaryItem;
};
export default useDiary;

import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import { useState, useContext } from "react";
import { DiaryStateContext } from "../App";
import { DiaryDispatchContext } from "../App";

//해당 달에 있는 일기만 빼오기 위해서는 이번달 시작과 이번달 끝을 알아야한다.
const getMonthlyData = (pivotDate, data) => {
  //이번달 첫날
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime();
  //pivotDate.getMonth() + 1,0 다음달의 0일, 그러니까 통상적으로 이번달의 마지막날을 의미한다.
  const endTime = new Date( //이번달 마지막날
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59
  ).getTime();
  return data.filter(
    (item) => beginTime <= item.createdDate && item.createdDate <= endTime
  );
};
const Home = () => {
  //context는
  const data = useContext(DiaryStateContext);
  const [pivotDate, setPivotDate] = useState(new Date());

  const monthlyData = getMonthlyData(pivotDate, data);

  //년도는 알아서 바뀐다.
  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };
  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  return (
    <div>
      {/* 월에 +1을 하는 이유는 0부터 month 를 세서 그냥 붙여야됨 별이유없음*/}
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월 `}
        leftChild={<Button onClick={onDecreaseMonth} text={"<"} />}
        rightChild={<Button onClick={onIncreaseMonth} text={">"} />}
      />
      <DiaryList data={monthlyData} />
    </div>
  );
};
export default Home;

import "./DiaryList.css";
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DiaryList = ({ data }) => {
  const nav = useNavigate();
  const [sortType, setSortType] = useState("latest");

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };
  const getSortedDate = () => {
    return data.toSorted((a, b) =>
      sortType === "oldest"
        ? Number(a.createdDate) - Number(b.createdDate)
        : Number(b.createdDate) - Number(a.createdDate)
    );
  };
  const sortedData = getSortedDate();

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={onChangeSortType}>
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된 순</option>
        </select>
        <Button
          onClick={() => nav(`/new`)}
          text={"새로운 일기 작성하기"}
          type={"POSITIVE"}
        />
      </div>
      {/*객체의 여러 프로퍼티를 이름 그대로 받아온다는 뜻인듯 {...item}*/}
      <div className="list_wrapper">
        {sortedData.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};
export default DiaryList;

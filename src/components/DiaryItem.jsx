import "./DiaryItem.css";
import { getEmotionImage } from "../util/get-emotion-images";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
const DiaryItem = ({ id, emotionId, createdDate, content }) => {
  const nav = useNavigate();

  return (
    <div className="DiaryItem">
      {/*이모션이 둥그렇게 되어있는데 바탕 컬러를 이모지랑 똑같게 해주기*/}
      <div
        onClick={() => nav(`/diary/${id}`)}
        className={`img_section img_section_${emotionId}`}
      >
        <img src={getEmotionImage(emotionId)} alt="diary_img" />
      </div>
      <div className="info_section" onClick={() => nav(`/diary/${id}`)}>
        <div className="created_date">
          {new Date(createdDate).toLocaleDateString()}
        </div>
        <div className="content">{content}</div>
      </div>
      <div className="button_section">
        <Button onClick={() => nav(`/Edit/${id}`)} text={"수정"} />
      </div>
    </div>
  );
};
export default DiaryItem;

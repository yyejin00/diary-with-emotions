import "./DiaryItem.css";
import { getEmotionImage } from "../util/get-emotion-images";
import Button from "./Button";
const DiaryItem = () => {
  const emotionId = 2;
  return (
    <div className="DiaryItem">
      {/*이모션이 둥그렇게 되어있는데 바탕 컬러를 이모지랑 똑같게 해주기*/}
      <div className={`img_section img_section_${emotionId}`}>
        <img src={getEmotionImage(2)} alt="diary_img" />
      </div>
      <div className="info_section">
        <div className="created_date">{new Date().toLocaleDateString()}</div>
        <div className="content">
          이노래는 its about you baby. only you. youyouyouyouyouyouyou 내가 힘들
          때 울 것 같을 때 기운도이제 나지않을 때, its you! 날 걱정하니 its you
          날 웃게하니 말안해 돼.
        </div>
      </div>
      <div className="button_section">
        <Button text={"수정"} />
      </div>
    </div>
  );
};
export default DiaryItem;

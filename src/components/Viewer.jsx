import "./Viewer.css";
import { getEmotionImage } from "../util/get-emotion-images";
import { emotionList } from "../util/constants";
const Viewer = ({ emotionId, content }) => {
  const emotionItem = emotionList.find(
    (item) => String(item.emotionId) === String(emotionId)
  );
  return (
    <div className="viewer">
      <section className="img_section">
        <h4>그때의 감정</h4>
        {/* 동적인 클래스 이름 설정 박스의 컬러도 변화시키기 위해서*/}
        <div className={`emotion_img_wrapper emotion_img_wrapper_${emotionId}`}>
          <img className="emotion_img" src={getEmotionImage(emotionId)} />
          <div>{emotionItem.emotionName}</div>
        </div>
      </section>
      <seciton className="content_section">
        <h4>그때의 일기</h4>
        <div className="content_wrapper">
          <p>{content}</p>
        </div>
      </seciton>
    </div>
  );
};
export default Viewer;

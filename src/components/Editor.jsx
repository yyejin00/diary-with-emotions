import "./Editor.css";
import EmotionItem from "./EmotionItem";
import Button from "./Button";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const emotionList = [
  {
    emotionId: 1,
    emotionName: "화남",
  },
  {
    emotionId: 2,
    emotionName: "지침",
  },
  {
    emotionId: 3,
    emotionName: "슬픔",
  },
  {
    emotionId: 4,
    emotionName: "좋음",
  },
  {
    emotionId: 5,
    emotionName: "행복",
  },
  {
    emotionId: 6,
    emotionName: "뿌듯",
  },
];
const getStringedDate = (targetDate) => {
  //날짜 -> yyyy-mm-dd
  let year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let day = targetDate.getDate();
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  return `${year}-${month}-${day}`;
};
const Editor = ({ initData, onSubmit }) => {
  const [input, setInput] = useState({
    createdDate: new Date(), //타임스탬프 값
    emotionId: 4,
    content: "",
  });
  const nav = useNavigate();

  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        createdDate: new Date(Number(initData.createdDate)), //문자열에서 타임스탬프 값으로 변환해주기
      });
    }
  }, [initData]);

  //input에서 클릭한 값을 적용하는 함수
  const onChangeInput = (e) => {
    /*  console.log(e.target.name); // 어떤 요소에 입력이 들어온것인지 확인
    console.log(e.target.value); //입력된 값이 무엇인지 확인
 */
    //날짜가 함수로 문자열로 바꿨기때문에 문자열인 날짜가 들어오기때문에 변경시켜주어아햔다.
    let name = e.target.name;
    let value = e.target.value;
    if (name === "createdDate") {
      value = new Date(value);
    }
    setInput({
      ...input,
      [e.target.name]: value,
    });
  };
  const onClickSubmitButton = () => {
    onSubmit(input);
  };

  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        {/* input태그에 날짜를 value에 적용할 때는 날짜를 문자열로 변환시켜서 값을 넣어줘야한다.getStringedDate 함수를 이용해서 input.created라는 숫자date를 문자열로 변환  */}
        <input
          name="createdDate"
          onChange={onChangeInput}
          value={getStringedDate(input.createdDate)}
          type="date"
        ></input>
      </section>
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => (
            <EmotionItem
              onClick={() => {
                onChangeInput({
                  //onchangelInput 함수는 e 이벤트 객체를 인수로 갖기 때문에 아래와 같이 target 객체를 불러올수있다.
                  target: {
                    name: "emotionId",
                    value: item.emotionId,
                  },
                });
              }}
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === input.emotionId}
            />
          ))}
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea
          name="content"
          value={input.content}
          onChange={onChangeInput}
          placeholder="오늘은 어떤 하루를 보냈나요?"
        ></textarea>
      </section>
      <section className="button_section">
        <Button onClick={() => nav(-1)} text={"취소하기"} />
        <Button
          onClick={onClickSubmitButton}
          text={"작성하기"}
          type={"POSITIVE"}
        />
      </section>
    </div>
  );
};
export default Editor;

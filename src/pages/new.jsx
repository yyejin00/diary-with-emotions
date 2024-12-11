import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";
const New = () => {
  const { onCreate } = useContext(DiaryDispatchContext);
  const nav = useNavigate();

  const onSubmit = (input) => {
    // 날짜를 타임스탬프 형식으로 저장하게 만든다. .getTime()
    onCreate(input.createdDate.getTime(), input.emotionId, input.content);
    //버튼을 누르고 게시물을 생성했을 때 home 페이지(이전페이지)로 '/'이용해서 보내고, 뒤로가기 방지를 위해 replace:true를 해서 작성했던 form에 접근을 금지시킨다.
    nav("/", { replace: true });
  };

  return (
    <div>
      <Header
        title={"새 일기 작성"}
        leftChild={<Button text={"<뒤로가기"} onClick={() => nav(-1)} />}
      />
      <Editor onSubmit={onSubmit} />
    </div>
  );
};
export default New;

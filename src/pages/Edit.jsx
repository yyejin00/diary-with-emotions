import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import useDiary from "../hooks/useDiary";

const Edit = () => {
  const nav = useNavigate();
  const params = useParams();
  const currentDiaryItem = useDiary(params.id);
  const { onDelete } = useContext(DiaryDispatchContext);

  const onClickDelete = () => {
    if (
      window.confirm("일기를 삭제하게 되면 복구할 수 없어요. 삭제할까요?")
      //확인 : ture 취소 : false
    ) {
      //app의 onDelete()함수 활성화 시키기
      onDelete(params.id);
      //경고창만뜨고 실행되지 않는다. edit의 return문이 실행되기 전에 이미 실행되었기 때문에 (mount 전)그 부분을 고쳐야한다.
      //mount 후에 일어날 수 있도록해야한다.
      //위에 onClickDelete함수의 nav는 이벤트 헨들러이기 때문에 클릭이 되어야 활동되기 때문에 이 상황과 다르다.
      nav("/", { replace: true });
    }
  };
  const { onUpdate } = useContext(DiaryDispatchContext);
  const onSubmit = (input) => {
    if (window.confirm("일기를 수정할까요?")) {
      onUpdate(
        input.id,
        input.createdDate.getTime(),
        input.emotionId,
        input.content
      );
      nav("/", { replace: true });
    }
  };

  return (
    <div>
      <Header
        title={"일기 수정"}
        leftChild=<Button text={"<뒤로가기"} onClick={() => nav(-1)} />
        rightChild=<Button
          onClick={onClickDelete}
          text={"삭제하기"}
          type={"NEGATIVE"}
        />
      />
      <Editor onSubmit={onSubmit} initData={currentDiaryItem} />
    </div>
  );
};
export default Edit;

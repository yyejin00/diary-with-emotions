import { useState, useReducer, useRef, createContext } from "react";
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Notfound from "./pages/Notfound";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import "./App.css";
import Edit from "./pages/Edit";
import { getEmotionImage } from "./util/get-emotion-images";

const mockData = [
  {
    id: 1,
    createdDate: new Date("2024-12-09").getTime(),
    emotionId: 5,
    content:
      "하얀눈이 내려올 때면 온 세상이 물들을 때면, 눈꽃이 피어나 또 빛이나,눈이 부신 너처럼~ 쿵💥쿵💥 가슴이 왜 이렇게 가쁘니 yeah, 꾹꾹 참아도 자꾸 네 생각이 나잖아",
  },
  {
    id: 2,
    createdDate: new Date("2024-12-08").getTime(),
    emotionId: 2,
    content: "2번 일기 내용",
  },
  {
    id: 3,
    createdDate: new Date("2024-11-08").getTime(),
    emotionId: 3,
    content: "2번 일기 내용",
  },
];
function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE": //현재 state 배열에서 dispatch 액션객체에서 data의 id 값과 일치하는 데이터만 수정하면된다.
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
    case "DELETE":
      return state.filter((item) => String(item.id) !== String(action.id)); // data의 id 값과 일치하는 데이터만 filter로 제거하도록 한다.
    default:
      return state;
  }
}
//DiaryStateContext를 통해서 data state 값을 공급받는다.
export const DiaryStateContext = createContext();
//data state를 변경하는, 일기를 수정하는 함수
export const DiaryDispatchContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3); //앞으로 생성될 id를 저장해둔다. 더미데이터(mockData)와 접치지않는 id 3으로 설정
  // 새로운 일기 추가
  const onCreate = (createdDate, emotionId, content) => {
    //새로운 일기를 추가하는 기능
    //new페이지에서 일기를 추가했을 때 onCreate를 실행되도록 설정 실행되면 위 useReducer에 data에 추가하도록 한다.
    dispatch({
      //액션객체
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 수정
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: { id, createdDate, emotionId, content },
    });
  };

  //기존 일기 삭제

  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    });
  };

  const nav = useNavigate();
  const onClickButton = () => {
    nav("/new");
  };
  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/Edit/:id" element={<Edit />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </> //와일드 카드 swith문의 default 문과같다.
  );
}

export default App;

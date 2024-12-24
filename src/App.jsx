import { useEffect, useState, useReducer, useRef, createContext } from "react";
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Notfound from "./pages/Notfound";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import "./App.css";
import Edit from "./pages/Edit";
import { getEmotionImage } from "./util/get-emotion-images";
//웹 스토리지를 이용해서 원래있던 mockData를 저장했기때문에 상수로 둘필요가 없어졌다.
/* const mockData = [
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
]; */
function reducer(state, action) {
  let nextState;
  switch (action.type) {
    case "INIT": //다른 case와 달리 nextState 변수 return이 아니다. action.data 값은 로컬스토리지에서 가져온 값이기 때문에 nextState로 값을 변경할 필요없다. 아래에 localStrage 값을
      return action.data;
    case "CREATE": {
      nextState = [action.data, ...state];
      break;
    }
    case "UPDATE": {
      //현재 state 배열에서 dispatch 액션객체에서 data의 id 값과 일치하는 데이터만 수정하면된다.
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
      break;
    }
    case "DELETE": {
      nextState = state.filter((item) => String(item.id) !== String(action.id)); // data의 id 값과 일치하는 데이터만 filter로 제거하도록 한다. localStorage.setItem("diary", JSON.stringify(nextState));으로 다른 case에서 받아온 값을 변경하기때문에
      break;
    }
    default:
      return state;
  }
  localStorage.setItem("diary", JSON.stringify(nextState));
  return nextState;
}
//DiaryStateContext를 통해서 data state 값을 공급받는다.
export const DiaryStateContext = createContext();
//data state를 변경하는, 일기를 수정하는 함수
export const DiaryDispatchContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0); //앞으로 생성될 id를 저장해둔다. 더미데이터(mockData)와 접치지않는 id 3으로 설정

  useEffect(() => {
    const storedData = localStorage.getItem("diary");
    //undefined나 null일 경우
    if (!storedData) {
      setIsLoading(false);

      return;
    }

    const parsedData = JSON.parse(storedData);
    //id를 부여할때 가장id가 큰 값에서 +1하여 id를 부여시켜 중복은 막는다.
    //
    if (!Array.isArray(parsedData)) {
      setIsLoading(false);
      return;
    }
    let maxId = 0;
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });
    idRef.current = maxId + 1;
    dispatch({
      type: "INIT",
      data: parsedData,
    });
    setIsLoading(false);
  }, []);
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

  if (isLoading) return <div>Loading...</div>;

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

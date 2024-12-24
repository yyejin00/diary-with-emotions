import { useEffect } from "react";
const usePageTitle = (title) => {
  //페이지 이동할 때마다, amount 할 때 태그의 이름(title태그)이 바뀌어야하기 때문에 useEffect를 사용해야한다. +모듈화
  useEffect(() => {
    //돔요소나타내는 표기 앞에 $ 사인
    const $title = document.getElementsByTagName("title")[0];
    $title.innerText = title;
  }, [title]);
};
export default usePageTitle;

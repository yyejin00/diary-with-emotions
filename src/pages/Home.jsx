import { useSearchParams } from "react-router-dom";
const Home = () => {
  const [params, setParams] = useSearchParams();
  //params에는 쿼리스트링의 값들, setParams에는 쿼리스트링을 변경할 수 있는 함수가 있다.
  return <div>home sweet home🎪</div>;
};
export default Home;

import { useParams } from "react-router-dom";
const Diary = () => {
  const params = useParams();
  console.log(params);

  return (
    <div>
      <div>Diary📒</div>
      <div>{params.id}번쨰 일기!</div>
    </div>
  );
};
export default Diary;

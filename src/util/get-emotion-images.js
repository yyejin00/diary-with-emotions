//이미지 불러오는 파일 별도의 모듈로 관리해주기
import angry from "./../assets/angry.png";
import soso from "./../assets/notbad.png";
import proud from "./../assets/proud.png";
import sad from "./../assets/sade.png";
import happy from "./../assets/veryhappy.png";
import sosad from "./../assets/verysad.png";

export function getEmotionImage(emotionId) {
  switch (emotionId) {
    case 1:
      return angry;
    case 2:
      return sosad;
    case 3:
      return sad;
    case 4:
      return soso;
    case 5:
      return happy;
    case 6:
      return proud;
    default:
      return null;
  }
}

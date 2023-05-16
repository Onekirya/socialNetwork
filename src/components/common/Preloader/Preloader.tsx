import { FC } from "react";
import preloader from "../../../assets/preloader.gif"

let Preloader: FC = () => {
  return (
    <div>
      <img src={preloader} />
    </div>
  );
};

export default Preloader;
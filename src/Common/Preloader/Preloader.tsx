import { LinearProgress } from "@material-ui/core";
import s from './Preloader.module.css'


const Preloader = () => {
     // return <div><img alt={"preloader"} src={preloader}/></div>
     return <div>
          <LinearProgress style={{ width: "100vw" }} />
          <div className={s.screen}></div>
     </div>

}

export default Preloader
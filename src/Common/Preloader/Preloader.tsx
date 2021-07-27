import { LinearProgress } from "@material-ui/core";
import React from "react";
import s from './Preloader.module.css'


const Preloader = React.memo(() => {
     return <div>
          <LinearProgress style={{ width: "100vw" }} />
          <div className={s.screen}></div>
     </div>

})

export default Preloader
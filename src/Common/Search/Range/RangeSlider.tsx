import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../../Redux/store';
import { responsePacksType } from '../../../api/packs-api';
import { setRangeAC } from '../../../Redux/packs-reducer';

const useStyles = makeStyles({
  root: {
    width: 600,
  },
});


export default function RangeSlider() {
  const dispatch = useDispatch()
  const { min, max } = useSelector<AppStateType, responsePacksType>(state => state.packs)

  const classes = useStyles();
  const [values, setValue] = React.useState<number[]>([min, max]);

  const handleChange = (e: any, values: number | number[]) => {
    //@ts-ignore   //!<<<<---------------
    dispatch(setRangeAC(values[0], values[1]));
    setValue(values as number[]);
  };

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Cards range
      </Typography>
      <Slider
        value={values}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
      />
    </div>
  );
}
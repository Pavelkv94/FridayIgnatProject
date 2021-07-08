import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { useDispatch, useSelector } from 'react-redux';
import { setRangeCardsAC } from '../../../Redux/cards-reducer';
import { setRangePacksAC } from '../../../Redux/packs-reducer';

const useStyles = makeStyles({
  root: {
    width: 600,
    marginLeft: 30,
    marginRight: 30,
  },
});

type PropsRangeType = {
  min: number
  max: number
  target: "packs" | "cards"
}
export default function RangeSlider(props: PropsRangeType) {
  const dispatch = useDispatch()

  const classes = useStyles();
  const [values, setValue] = React.useState<number[]>([props.min, props.max]);

  const handleChange = (e: any, values: number | number[]) => {
    if (props.target === "packs") {
      //@ts-ignore   //!<<<<---------------
      dispatch(setRangePacksAC(values[0], values[1]));
      setValue(values as number[]);
    } else {
      //@ts-ignore   //!<<<<---------------
      dispatch(setRangeCardsAC(values[0], values[1]));
      setValue(values as number[]);
    }
  }

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Range
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
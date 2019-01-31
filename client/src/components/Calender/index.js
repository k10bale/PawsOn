import { Calendar } from 'react-widgets'
import React from "react";
import { differenceInCalendarQuarters } from 'date-fns';


let { Calendar } = ReactWidgets;

let widget = (
  <Calendar 
    dateFormat={dt => String(dt.getDate())}
  />
)

render(widget);

export default Calender;
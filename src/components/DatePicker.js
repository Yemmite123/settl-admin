import React from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
const Date = ({ date, setDate, name }) => {
  const convertDate = (date) => {
    setDate(date.setHours(0, 0, 0, 0));
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        autoOk
        variant="inline"
        inputVariant="outlined"
        format="MM/dd/yyyy"
        margin="normal"
        label={name}
        value={date}
        onChange={convertDate}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </MuiPickersUtilsProvider>
  );
};
export default Date;

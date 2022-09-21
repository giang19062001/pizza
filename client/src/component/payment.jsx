import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function Payment(props) {
    const handleChange = (e) =>{
        props.parentCallback(e.target.value)
    }
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">
        Phương thức thanh toán
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        defaultValue="offline"
        onChange={handleChange}
      >
        <FormControlLabel
          value="offline"
          control={<Radio />}
          label="Thanh toán khi nhận hàng"

        />
        <FormControlLabel
          value="online"
          control={<Radio />}
          label="Thanh toán qua Paypal"
        />
      </RadioGroup>
    </FormControl>
  );
}

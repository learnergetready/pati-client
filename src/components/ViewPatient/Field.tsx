import { KeysOfNewEntry, HealthCheckRating } from "../../types";
import { assertNever } from "../../utils";
import { $enum } from "ts-enum-util";
import { InputLabel, MenuItem, Select, TextField } from "@mui/material";

const Field = ({field}: {field: string}) => {
  const _unformatedDate = new Date();
  const currentDate = _unformatedDate.toISOString().substring(0,10);
  const castKey = field as KeysOfNewEntry;
  switch (castKey) {
    case "date":
      return <><InputLabel>Date</InputLabel>
      <TextField
        fullWidth 
        type="date"
        name="date"
        defaultValue={currentDate}
      /></>;
    case "description":
        return <><TextField
        label="Description"
        fullWidth
        name="description"
      /></>;
    case "diagnosisCodes":
      return <><TextField
      label="Diagnosis codes"
      fullWidth
      name="diagnosisCodes"
    /></>;
    case "healthCheckRating":
      return <><InputLabel style={{ marginTop: 20 }}>Health check rating</InputLabel>
      <Select
        label="Health check rating"
        fullWidth
        name="healthCheckRating"
        defaultValue={0}
      >
      {$enum(HealthCheckRating).map((value, key) =>
        <MenuItem
          key={key}
          value={value}
        >
          {key
        }</MenuItem>
      )}
      </Select></>;
    case "specialist":
      return <><TextField
      label="Specialist"
      fullWidth
      name="specialist"
    /></>;
    case "discharge":
      return <><InputLabel>Discharge</InputLabel>
      <TextField
      fullWidth
      name="dischargeCriteria"
      />
      <TextField
        fullWidth 
        type="date"
        name="dischargeDate"
      />
      </>;
    case "employerName":
      return <><TextField
      label="Employer name"
      fullWidth
      name="employerName"
    /></>;
    case "sickLeave":
      return <><InputLabel>Sick leave: starting</InputLabel>
      <TextField
        fullWidth 
        type="date"
        name="sickLeaveStartDate"
      />
      <InputLabel>Sick leave: ending</InputLabel>
      <TextField
        fullWidth 
        type="date"
        name="sickLeaveEndDate"
      /></>;
    case "type":
      break;
    default:
      return assertNever(castKey);
  }
};

export default Field;
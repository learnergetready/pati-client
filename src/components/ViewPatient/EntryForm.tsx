import { Box, Button, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Discharge, NewEntry, SickLeave } from "../../types";
import Field from "./Field";

interface Props {
  addEntry: (patientId: string, newEntry: NewEntry) => Promise<void>;
}

const EntryForm = ({addEntry}: Props ) => {
    const [visible, setVisibility] = useState(false);
    const [selectedEntryType, setEntryType] = useState<NewEntry['type']>("HealthCheck");
    const { patientId } = useParams();

    const handleChange = (e: SelectChangeEvent) => {
      setEntryType(e.target.value as NewEntry['type']);
    };

    const onSubmit = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
          date: {value: string};
          description: {value: string};
          specialist: {value: string};
          diagnosisCodes: {value: string};
          healthCheckRating: {value: number};
          type: {value: NewEntry['type']};
          dischargeCriteria: {value: Discharge['criteria']};
          dischargeDate: {value: Discharge['date']};
          employerName: {value: string};
          sickLeaveStartDate: {value: SickLeave['startDate']};
          sickLeaveEndDate: {value: SickLeave['endDate']};
        };

        switch (target.type.value) {
          case "HealthCheck":
            const healthCheckEntry: NewEntry = {
              type: target.type.value,
              date: target.date.value,
              description: target.description.value,
              specialist: target.specialist.value,
              healthCheckRating: target.healthCheckRating.value
            };
            if (target.diagnosisCodes.value) {
              healthCheckEntry.diagnosisCodes = target.diagnosisCodes.value.split(",").map(c => c.trim());
            }
            if (!patientId) {
              throw new Error("Error. Patient id not found!");
            }
            addEntry(patientId, healthCheckEntry);
            break;
          case "Hospital":
            const hospitalEntry: NewEntry = {
              type: target.type.value,
              date: target.date.value,
              description: target.description.value,
              specialist: target.specialist.value,
              discharge: {
                criteria: target.dischargeCriteria.value,
                date: target.dischargeDate.value
              }
            };
            if (target.diagnosisCodes.value) {
              hospitalEntry.diagnosisCodes = target.diagnosisCodes.value.split(",").map(c => c.trim());
            }
            if (!patientId) {
              throw new Error("Error. Patient id not found!");
            }
            addEntry(patientId, hospitalEntry);
            break;
          case "OccupationalHealthcare":
            const occupationalEntry: NewEntry = {
              type: target.type.value,
              date: target.date.value,
              description: target.description.value,
              specialist: target.specialist.value,
              employerName: target.employerName.value,
            };
            if (target.diagnosisCodes.value) {
              occupationalEntry.diagnosisCodes = target.diagnosisCodes.value.split(",").map(c => c.trim());
            }
            if (target.sickLeaveStartDate.value) {
              occupationalEntry.sickLeave = {
                startDate: target.sickLeaveStartDate.value,
                endDate: target.sickLeaveEndDate.value
              };
            }
            if (!patientId) {
              throw new Error("Error. Patient id not found!");
            }
            addEntry(patientId, occupationalEntry);
            break;
          default:
            break;
        }
    
        
    };

    const onCancel = (event: React.SyntheticEvent): void => {
      event.preventDefault();
      setVisibility(false);
    };
    
    if (!visible) {
        return <Button onClick={() => setVisibility(true)} variant="contained" color="primary">Add entry</Button>;
    }

    return (<Box>
        <form onSubmit={onSubmit}>
        <InputLabel id="entryType" style={{ marginTop: 20 }}>Entry type</InputLabel>
      <Select
        labelId="entryType"
        fullWidth
        label="Entry type"
        name="type"
        defaultValue={"HealthCheck" as NewEntry['type']}
        onChange={handleChange}
      >
        <MenuItem key="1" value={"HealthCheck" as NewEntry['type']}>Health check</MenuItem>
        <MenuItem key="2" value={"Hospital" as NewEntry['type']}>Hospital</MenuItem>
        <MenuItem key="3" value={"OccupationalHealthcare" as NewEntry['type']}>Occupational</MenuItem>
      </Select>
        <Field field="date" />
        <Field field="description" />
        <Field field="diagnosisCodes" />
        <Field field="specialist" />
        {selectedEntryType === "HealthCheck" && <Field field="healthCheckRating" />}
        {selectedEntryType === "Hospital" && <Field field="discharge" />}
        {selectedEntryType === "OccupationalHealthcare" && <><Field field="employerName" /><Field field="sickLeave" /></>}
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>);
};

export default EntryForm;
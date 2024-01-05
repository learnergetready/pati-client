import { Box, Button, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { HealthCheckRating, NewEntry } from "../../types";
import { $enum } from "ts-enum-util";

interface Props {
  addEntry: (patientId: string, newEntry: NewEntry) => Promise<void>;
}

const EntryForm = ({addEntry}: Props ) => {
    const [visible, setVisibility] = useState(false);
    const { patientId } = useParams();

    const _unformatedDate = new Date();
    const currentDate = _unformatedDate.toISOString().substring(0,10);

    const onSubmit = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
          date: {value: string};
          description: {value: string};
          specialist: {value: string};
          diagnosisCodes: {value: string};
          healthCheckRating: {value: number};
      };

        const newEntry: NewEntry = {
            type: "HealthCheck",
            date: target.date.value,
            description: target.description.value,
            specialist: target.specialist.value,
            healthCheckRating: Number(target.healthCheckRating.value),
        };
        if (target.diagnosisCodes.value) {
          newEntry.diagnosisCodes = target.diagnosisCodes.value.split(",").map(c => c.trim());
        }
        if (!patientId) {
          throw new Error("Error. Patient id not found!");
        }
        addEntry(patientId, newEntry);
        
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
        <InputLabel>Date</InputLabel>
        <TextField
          placeholder="YYYY-MM-DD"
          fullWidth 
          type="date"
          name="date"
          defaultValue={currentDate}
        />
        <TextField
          label="Description"
          fullWidth
          name="description"
        />
        <TextField
          label="Diagnosis codes"
          fullWidth
          name="diagnosisCodes"
        />
        

        <InputLabel style={{ marginTop: 20 }}>Health check rating</InputLabel>
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
        </Select>

        <TextField
          label="Specialist"
          fullWidth
          name="specialist"
        />

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
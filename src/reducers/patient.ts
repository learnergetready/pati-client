import { createSlice } from "@reduxjs/toolkit";
import patientService from "../services/patients";
import { AppDispatch } from "../main";
import { Patient, PatientFormValues } from "../types";


const patientSlice = createSlice({
    name: "patients",
    initialState: [] as Patient[],
    reducers: {
        setPatients(_state, action) {
            return action.payload;
        },
        concatPatients(state, action) {
            return state.concat(action.payload);
        },
    }
});

export const { setPatients, concatPatients } = patientSlice.actions;

export const initializePatients = () => {
    return async (dispatch: AppDispatch) => {
        const patients = await patientService.getAll();
        return dispatch(setPatients(patients));
    };
};

export const addPatient = (values: PatientFormValues) => {
    return async (dispatch: AppDispatch) => {
        const patient = await patientService.create(values);
        return dispatch(concatPatients(patient));
    };
};

export default patientSlice.reducer;
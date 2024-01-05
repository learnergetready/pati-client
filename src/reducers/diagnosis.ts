import { createSlice } from "@reduxjs/toolkit";
import diagnosisService from "../services/diagnosis";
import { AppDispatch } from "../main";
import { Diagnosis } from "../types";

const diagnosisSlice = createSlice({
    name: "diagnosis",
    initialState: [] as Diagnosis[],
    reducers: {
        setDiagnoses(_state, action) {
            return action.payload;
        }
    }
});

export const { setDiagnoses } = diagnosisSlice.actions;

export const initializeDiagnoses = () => {
    return async (dispatch: AppDispatch) => {
        const diagnoses = await diagnosisService.getAll();
        return dispatch(setDiagnoses(diagnoses));
    };
};

export default diagnosisSlice.reducer;
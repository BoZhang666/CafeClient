import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface Employee {}

interface EmployeeState {
  list: Employee[];
}

const initialState: EmployeeState = {
  list: [],
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    getEmployee: (state, { payload }) => {
      state.list = payload;
    },
    createEmployee: (state, { payload }) => {
      state.list.push(payload);
    },
    deleteEmployee: (state, { payload }) => {
      return {
        ...state,
        //@ts-ignore
        list: state.list.filter((item) => item.id !== payload),
      };
    },
    updateEmployee: (state, { payload }) => {
      const list = state.list.map((employee) => {
        //@ts-ignore
        if (employee.id === payload.id) {
          employee = payload;
        }
        return employee;
      });
      return { ...state, list };
    },
  },
});

export const { getEmployee, createEmployee, deleteEmployee, updateEmployee } =
  employeeSlice.actions;

export const selectCount = (state: RootState) => state.employee;

export default employeeSlice.reducer;

const prefix = `http://localhost:3001`;
export const API = {
  CafeApi: {
    getCafeList: `${prefix}/cafes?location=`,
    createCafe: `${prefix}/cafe`,
    updateCafe: `${prefix}/cafe`,
    deleteCafe: `${prefix}/cafe`,
  },
  EmployeeApi: {
    getEmployeeList: `${prefix}/employees`,
    createEmployee: `${prefix}/employee`,
    updateEmployee: `${prefix}/employee`,
    deleteEmployee: `${prefix}/employee`,
  },
};

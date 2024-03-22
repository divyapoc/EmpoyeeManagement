import axiosInstance from './axiosInstance';

const Service = {
  getAllEmployees: async () => {
    try {
      const response = await axiosInstance.get('api/employee/employees/getdata');
      return response.data;
    } catch (error) {
      throw new Error('Error fetching employees data');
    }
  },
  createEmployee: async (employeeData) => {
    try {
      const response = await axiosInstance.post('api/employee/', employeeData);
      return response.data;
    } catch (error) {
      throw new Error('Error creating employee');
    }
  },
  updateEmployee: async (employeeData) => {
    try {
      const response = await axiosInstance.put(`api/employee/update/${employeeData._id}`, employeeData);
      return response.data;
    } catch (error) {
      throw new Error('Error updating employee');
    }
  },
  searchData : async (key) => {
    try {
        const response = await axiosInstance.get(`api/employee/searchemployee/${key}`, null);
      return response.data;
    } catch (error) {
      throw new Error('Error searching for employee');
    }
  },
  delete : async (id) => {
    try {
      const response = await axiosInstance.delete(`api/employee/delete/${id}`, null);
      return response.data;
    } catch (error) {
      throw new Error('Error delete for employee');
    }
  }
}


export default Service;
import React, { useState, useEffect } from "react";
import { Card, Button, Table, Form, InputGroup,Modal } from "react-bootstrap";
import { BsTrash, BsPencil, BsSearch, BsPlus } from "react-icons/bs";
import EmployeeForm from "../EmployeeForm/EmployeeForm";
import Service from "../../services/service"
import NoDataFound from "../NoDataFound/NoDataFound";
const EmployeeTable = ({}) => {
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [FormData, setFormData] = useState({});
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState({});
  const [employee_data, setEmployee_data] = useState([]);
  const [showEmpty , setShowEmpty] = useState(false)
  const fetchEmployees = async () => {
    try {
      const data = await Service.getAllEmployees();
      console.log(data)
      if(data.status === "success"){
        if(data.data.length >= 1){
          setShowEmpty(false)
          setEmployee_data(data.data);
        }else{
          setShowEmpty(true)
        } 
      }
    } catch (error) {
      console.error('Error fetching employees:', error.message);
    }
  };
  console.log(employee_data)
  useEffect(() => {
    fetchEmployees();
  }, []);


  const onEdit = async(data) => {
    await setFormData(data)
    setShowOffCanvas(true);
  };

  const handleCreate = async() => {
    setFormData({})
    setShowOffCanvas(true);
   
  };
  const onDelete = (employee) => {
    setEmployeeToDelete(employee);
    setShowConfirmationModal(true);
  };

  const confirmDelete = async() => {
    // Call your delete API here
    console.log("Deleting employee with ID:", employeeToDelete);
  const id=employeeToDelete
    try {
      const data = await Service.delete(id);
      console.log("search",data)
      setShowConfirmationModal(false);
      fetchEmployees()
    } catch (error) {
      console.error('Error fetching employees:', error.message);
    }
  
  };

  const handleClose = async() => {
    setFormData({})
    setShowOffCanvas(false);
    await fetchEmployees()
  };

  const handleSearch=async(key)=>{
    try {
      const data = await Service.searchData(key);
      console.log("search",data)
      if(data.status === "success"){
        if(data.result.length >= 1){
        
          setEmployee_data(data.result);
          setShowEmpty(false)
        
        }else{
          setShowEmpty(true)
        } 
      }
    } catch (error) {
      console.error('Error fetching employees:', error.message);
    }
  }
  return (
    <Card className="mt-4">
      <Card.Header>
        <div className="d-md-flex align-items-center justify-content-between">
          <div className="mb-2 mb-md-0">
            <Button variant="primary" onClick={handleCreate} className="mb-2">
              <BsPlus /> Add New Employee
            </Button>
          </div>
          <div className="mb-2 mb-md-0">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search by name or address"
                onChange={(key) => handleSearch(key.target.value)}
              />
              {/* <Button variant="secondary" onClick={handleSearch}>
                <BsSearch />
              </Button> */}
            </InputGroup>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        {
          showEmpty ? (
            <NoDataFound/>
          ):(
            <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Employee Id</th>
                <th className="address-col">Address</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Role</th>
                <th className="action-col">Action</th>
              </tr>
            </thead>
            <tbody>
              {employee_data.map((employee, index) => (
                <tr key={employee._id}>
                  <td>{index + 1}</td>
                  <td className="text-capitalize">{employee.name}</td>
                  <td>{employee.employee_Id}</td>
                  <td className="text-capitalize">{employee.address}</td>
                  <td>{employee.email}</td>
                  <td>{employee.mobileNumber}</td>
                  <td className="text-capitalize">{employee.role}</td>
                  <td className="action-col">
                    <div className="d-flex">
                      <Button
                        variant="danger"
                        onClick={() => onDelete(employee._id)}
                        className="me-2"
                      >
                        <BsTrash />
                      </Button>{" "}
                      <Button variant="info" onClick={() => onEdit(employee)}>
                        <BsPencil />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          )
        }
      
      </Card.Body>
      <EmployeeForm
        show={showOffCanvas}
        onHide={handleClose}
        // onSubmit={handleSubmit}
        formData ={FormData}
      />
      <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this data permanantely?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default EmployeeTable;

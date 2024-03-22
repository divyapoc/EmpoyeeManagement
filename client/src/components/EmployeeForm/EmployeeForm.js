import React ,{useEffect}from 'react';
import { Offcanvas, Form, Button } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import Service from '../../services/service'; 
const EmployeeForm = ({ show, onHide,formData }) => {
  const formType = Object.keys(formData).length > 0 ? "edit" : "create";
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue
  } = useForm({
    mode: "onTouched",

  });

  const onSubmit = async(data) => {
    console.log(data);
    try {
      if (formType === 'create') {
       const result = await Service.createEmployee(data)
       console.log(result.message)
      } else {
        const result = await Service.updateEmployee(data); 
      }
      console.log('Employee data submitted successfully:', data);
      handleClose();
    } catch (error) {
      console.error('Error submitting employee data:', error.message);
    }
  };
  const handleClose = () => {
    onHide(); 
    reset(); 
    Object.keys(formData).forEach((key) => {
      setValue(key, ""); 
    });
  };
 useEffect(() => {
    if (formData) {
      Object.keys(formData).forEach((key) => {
        setValue(key, formData[key]);
      });
    }
  }, [formData, setValue]);

  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{formType === "edit"?"Edit Employee Data":"Create Employee"}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Controller
              name="name"
              control={control}
              rules={{
                required: "Name is required",
              }}
              render={({ field }) => (
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  {...field}
                  isInvalid={!!errors.name}
                />
              )}
            />
            {errors.name && <Form.Control.Feedback type="invalid">{errors.name.message}</Form.Control.Feedback>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formRole">
            <Form.Label>Role</Form.Label>
            <Controller
              name="role"
              control={control}
              rules={{
                required: "Role is required",
              }}
              render={({ field }) => (
                <Form.Control
                  type="text"
                  placeholder="Enter role"
                  {...field}
                  isInvalid={!!errors.role}
                />
              )}
            />
            {errors.role && <Form.Control.Feedback type="invalid">{errors.role.message}</Form.Control.Feedback>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Controller
              name="address"
              control={control}
              rules={{
                required: "Address is required",
              }}
              render={({ field }) => (
                <Form.Control
                  type="text"
                  placeholder="Enter address"
                  {...field}
                  isInvalid={!!errors.address}
                />
              )}
            />
            {errors.address && <Form.Control.Feedback type="invalid">{errors.address.message}</Form.Control.Feedback>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                },
              }}
              render={({ field }) => (
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  {...field}
                  isInvalid={!!errors.email}
                />
              )}
            />
            {errors.email && <Form.Control.Feedback type="invalid">{errors.email.message}</Form.Control.Feedback>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formMobile">
            <Form.Label>Mobile</Form.Label>
            <Controller
              name="mobileNumber"
              control={control}
              rules={{
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid mobile number, mobile number length should be 10",
                },
              }}
              render={({ field }) => (
                <Form.Control
                  type="text"
                  placeholder="Enter mobile number"
                  {...field}
                  isInvalid={!!errors.mobileNumber}
                />
              )}
            />
            {errors.mobileNumber && <Form.Control.Feedback type="invalid">{errors.mobileNumber.message}</Form.Control.Feedback>}
          </Form.Group>

          <Button variant="primary" type="submit">
          {formType === "edit"?"Edit Detail":"Create Employee"}
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};


export default EmployeeForm;

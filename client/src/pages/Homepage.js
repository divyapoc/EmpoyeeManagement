import React from 'react';
import Header from '../components/Layout/header/Header';
import Footer from '../components/Layout/footer/Footer';
import EmployeeTable from '../components/EmployeeTable/EmployeetTable';
const Homepage = () => {
  return (
    <div>
      <Header/>
      <EmployeeTable/>
      <Footer/>
    </div>
  );
};

export default Homepage;
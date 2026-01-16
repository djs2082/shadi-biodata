import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from '../NavigationBar';
import Footer from '../../LandingPage/Footer';
import './styles.css';

const DefaultLayout: React.FC = () => {
  return (
    <div className="default-layout">
      <NavigationBar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;

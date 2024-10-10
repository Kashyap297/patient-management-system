import React, { createContext, useContext, useState } from 'react';

const BreadcrumbContext = createContext();

export const BreadcrumbProvider = ({ children }) => {
  const [breadcrumb, setBreadcrumb] = useState([]);

  const updateBreadcrumb = (newBreadcrumb) => {
    setBreadcrumb(newBreadcrumb);
  };

  const addBreadcrumb = (label, path) => {
    setBreadcrumb((prevBreadcrumb) => {
      // Check if the label already exists
      const existingIndex = prevBreadcrumb.findIndex(item => item.label === label);

      if (existingIndex === -1) {
        return [...prevBreadcrumb, { label, path }];
      }
      
      // Remove levels after the existing label, and keep the breadcrumb till this level
      return prevBreadcrumb.slice(0, existingIndex + 1);
    });
  };

  return (
    <BreadcrumbContext.Provider value={{ breadcrumb, updateBreadcrumb, addBreadcrumb }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumb = () => useContext(BreadcrumbContext);

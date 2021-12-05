import React, { useState, useContext } from "react";

const AppContext = React.createContext();

//children props are whatever is inside the parent component tags
const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        openSidebar,
        closeSidebar,
        openModal,
        closeModal,
        isModalOpen,
        isSidebarOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

//custom hooks to reduce import items
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

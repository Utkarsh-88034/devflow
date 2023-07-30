import { ReactNode } from "react";
import SideBar from "../Components/Dashboard/SideBar";

const Dashboard: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <div className="h-screen w-full flex">
        <SideBar />
        {children}
      </div>
    </>
  );
};

export default Dashboard;

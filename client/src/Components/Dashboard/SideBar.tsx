import { MdSpaceDashboard } from "react-icons/md";
import { AiFillProject, AiOutlineSearch } from "react-icons/ai";
import { GoIssueOpened, GoIssueTracks } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const SideBar = () => {
  const nav = useNavigate();
  const params = useLocation();
  console.log(params);

  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    if (params.pathname == "/dashboard") {
      setSelectedTab(0);
    } else if (params.pathname == "/projects") {
      setSelectedTab(1);
    } else if (params.pathname == "/open-issues") {
      setSelectedTab(2);
    } else if (params.pathname == "/my-issues") {
      setSelectedTab(3);
    } else if (params.pathname == "/search-issues") {
      setSelectedTab(4);
    } else if (params.pathname == "/profile") {
      setSelectedTab(5);
    }
  }, [params]);

  return (
    <div className="h-screen bg-black min-w-[60px] text-white font-monster flex flex-col gap-4 items-center">
      <div className="text- xl font-bold mt-2">DF</div>
      <hr className="w-[90%] border-gray-600" />
      <div className="flex-grow w-full flex flex-col gap-4 items-center pt-2 ">
        <div
          className={`h-[50px] w-[80%] flex justify-center items-center rounded-md  text-xl font-[500] cursor-pointer gap-4 p-1 hover:bg-white hover:text-black transition-all duration-100 relative group ${
            selectedTab === 0 && "bg-white text-black"
          }`}
          onClick={() => {
            nav("/dashboard");
          }}
        >
          {" "}
          <p className="z-10">
            <MdSpaceDashboard />
          </p>
          <p className="absolute left-[120%] w-[0px] overflow-x-hidden z-10 bg-black/50 text-white p-2 rounded-md group-hover:opacity-100 group-hover:w-[100px] opacity-0 text-sm transition-all duration-150">
            Dashboard
          </p>
        </div>
        <div
          className={`h-[50px] w-[80%] flex justify-center items-center rounded-md  text-xl font-[500] cursor-pointer gap-4 p-1 hover:bg-white hover:text-black transition-all duration-100 group relative ${
            selectedTab === 1 && "bg-white text-black"
          }`}
          onClick={() => {
            nav("/projects");
          }}
        >
          <AiFillProject />
          <p className="absolute left-[120%] w-[0px] overflow-x-hidden z-10 bg-black/50 text-white p-2 rounded-md group-hover:opacity-100 group-hover:w-[100px] opacity-0 text-sm transition-all duration-150">
            Projects
          </p>
        </div>
        <div
          className={`h-[50px] w-[80%] flex justify-center items-center rounded-md  text-xl font-[500] cursor-pointer gap-4 p-1 hover:bg-white hover:text-black transition-all duration-100 group relative ${
            selectedTab === 2 && "bg-white text-black"
          }`}
          onClick={() => {
            nav("/open-issues");
          }}
        >
          <GoIssueOpened />
          <p className="h-[35px] absolute left-[120%] w-[0px] overflow-hidden z-10 bg-black/50 text-white p-2 rounded-md group-hover:opacity-100 group-hover:w-[120px] opacity-0 text-sm transition-all duration-150">
            Open Issues
          </p>
        </div>
        <div
          className={`group relative h-[50px] w-[80%] flex justify-center items-center rounded-md  text-xl font-[500] cursor-pointer gap-4 p-1 hover:bg-white hover:text-black transition-all duration-100 ${
            selectedTab === 3 && "bg-white text-black"
          }`}
          onClick={() => {
            nav("/my-issues");
          }}
        >
          <GoIssueTracks />
          <p className="h-[35px] absolute left-[120%] w-[0px] overflow-hidden z-10 bg-black/50 text-white p-2 rounded-md group-hover:opacity-100 group-hover:w-[100px] opacity-0 text-sm transition-all duration-150">
            My Issues
          </p>
        </div>
        <div
          className={`group relative h-[50px] w-[80%] flex justify-center items-center rounded-md  text-xl font-[500] cursor-pointer gap-4 p-1 hover:bg-white hover:text-black transition-all duration-100 ${
            selectedTab === 4 && "bg-white text-black"
          }`}
          onClick={() => {
            nav("/search-issues");
          }}
        >
          <AiOutlineSearch />
          <p className="absolute left-[120%] w-[0px] overflow-x-hidden z-10 bg-black/50 text-white p-2 rounded-md group-hover:opacity-100 group-hover:w-[100px] opacity-0 text-sm transition-all duration-150">
            Search
          </p>
        </div>
        <div
          className={`group relative h-[50px] w-[80%] flex justify-center items-center rounded-md  text-xl font-[500] cursor-pointer gap-4 p-1 hover:bg-white hover:text-black transition-all duration-100 ${
            selectedTab === 5 && "bg-white text-black"
          }`}
          onClick={() => {
            nav("/profile");
          }}
        >
          <CgProfile />
          <p className="absolute left-[120%] w-[0px] overflow-x-hidden z-10 bg-black/50 text-white p-2 rounded-md group-hover:opacity-100 group-hover:w-[100px] opacity-0 text-sm transition-all duration-150">
            Profile
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

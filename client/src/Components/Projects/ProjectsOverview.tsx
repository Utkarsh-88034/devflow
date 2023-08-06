import { useQuery } from "@apollo/client";
import { CircularProgress } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { GET_PROJECTS } from "../../Queries/dashboardQueries";

interface usertype {
  name: string;
  email?: string;
  userName?: string;
  role?: string;
}
interface projectType {
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  projectManager: usertype;
  issues: Array<any>;
}
interface ProjectCardProps {
  title: string;
  description: string;
  managedBy: usertype;
  startDate?: string;
  endDate?: string;
  status: string;
  collaborators?: Array<any>;
  issues: Array<any>;
}
const ProjectCard: FC<ProjectCardProps> = ({
  title,
  description,
  startDate,
  endDate,
  managedBy,
  status,
}) => {
  return (
    <div className=" h-[200px] w-[70%] bg-white rounded-md flex-shrink-0 cursor-pointer transition-all duration-150 hover:h-[500px] overflow-hidden group">
      <div className="h-[500px] w-full text-left p-2 relative flex flex-col justify-center items-start">
        <div className="h-max w-full">
          <p className="font-monster text-3xl text-left text-black/60 font-[500]">
            {title}
          </p>
          <p className=" w-full text-left text-black/60 mt-2 text-ellipsis h-6 whitespace-nowrap overflow-hidden group-hover:overflow-auto group-hover:whitespace-normal group-hover:h-max">
            {description}
          </p>
          <p className="text-black/60 mt-2">
            Managed By: <span className="text-black">{managedBy.name}</span>
          </p>
          <div className="absolute top-2 right-2  flex gap-3 text-sm">
            <p className="flex justify-center items-center">
              {startDate || "No Start Date Set"} -{" "}
              {endDate || "No End Date Set"}
            </p>
            <p className="text-green-600">{status}</p>
          </div>

          <p className="mt-2 text-black/60">Collaborators:</p>

          <div className="w-full mt-2 h-[40px] flex flex-wrap gap-3">
            <div className="h-[40px] w-[40px] rounded-full bg-gray-400 relative group/userBadge">
              <div className="h-[40px] w-max p-2 flex top-[-110%] absolute bg-slate-500 items-center gap-1 rounded-md text-white justify-center opacity-0 group-hover/userBadge:opacity-100 group-hover/userBadge:top-[-120%] transition-all duration-75">
                <div className="h-[30px] w-[30px] rounded-full bg-white/60"></div>
                <p>User Name</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-grow w-full flex bg-slate-50 shadow-md mt-5 items-center">
          <div className="h-[220px] flex-grow  flex justify-center items-center flex-col relative">
            <p className="text-7xl font-[700]">10</p>
            <p className="text-black/90">Issues</p>
            <CircularProgress
              capIsRound={true}
              max={50}
              value={10}
              style={{ position: "absolute" }}
              size="220"
              thickness={"5px"}
              color="blue"
            />
          </div>

          <div className="h-[220px] flex-grow  flex justify-center items-center flex-col relative">
            <p className="text-7xl font-[700]">8</p>
            <p className="text-black/90">Open Issues</p>
            <CircularProgress
              capIsRound={true}
              max={10}
              value={8}
              style={{ position: "absolute" }}
              size="220"
              thickness={"5px"}
              color="blue"
            />
          </div>
          <div className="h-[220px] flex-grow  flex justify-center items-center flex-col relative">
            <p className="text-7xl font-[700]">2</p>
            <p className="text-black/90">Closed Issues</p>
            <CircularProgress
              capIsRound={true}
              max={10}
              value={2}
              style={{ position: "absolute" }}
              size="220"
              thickness={"5px"}
              color="blue"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsOverview = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  const [projectList, setProjectList] = useState<Array<projectType>>([]);

  useEffect(() => {
    if (data) {
      console.log(data);
      setProjectList(data.AllProjects);
    }
  }, [data]);

  if (loading) {
    return <div>Loading!</div>;
  } else if (error) {
    return <div>Error!</div>;
  }

  const search = (value: string) => {
    // Filter the original data instead of the projectList state
    const filteredProjects = data.AllProjects.filter((project: projectType) =>
      project.name.toLowerCase().includes(value.toLowerCase())
    );
    setProjectList(filteredProjects);
  };

  return (
    <div className="w-full justify-start items-center flex flex-col gap-10 py-10 h-screen overflow-auto">
      <div className="w-[70%] h-[40px] rounded-md bg-white flex-shrink-0 flex items-center p-1 gap-2">
        <p className="text-2xl">
          <AiOutlineSearch />
        </p>
        <input
          type="text"
          placeholder="Search Projects"
          className="flex-grow outline-none"
          onChange={(e) => {
            search(e.target.value);
          }}
        />
      </div>
      {projectList.map((project: projectType) => (
        <ProjectCard
          title={project.name}
          description={project.description}
          issues={project.issues}
          managedBy={project.projectManager}
          status={project.status}
        />
      ))}
    </div>
  );
};

export default ProjectsOverview;

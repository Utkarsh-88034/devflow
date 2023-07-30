import cardbg1 from "../../assets/cardbg1.jpg";
import cardbg2 from "../../assets/cardbg2.jpg";
import cardbg4 from "../../assets/cardbg4.jpg";
import cardbg3 from "../../assets/cardbg3.jpg";

import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

interface CustomCSSProperties extends React.CSSProperties {
  "--image-url": string;
  "--height": string;
}

const ApplicationSummaryCard: React.FC<{
  number: string;
  title: string;
  styleClass?: string;
  bg?: string;
  chartSize?: number;
  max: number;
  reverse?: boolean;
  large?: boolean;
}> = ({ number, title, styleClass, bg, chartSize, max, reverse, large }) => {
  const customCss: CustomCSSProperties = {
    "--image-url": `url(${bg || ""})`,
    "--height": large ? "250px" : "200px",
  };

  const breakGreen = 20;
  const breakYellow = 50;
  const percent = (parseInt(number) / max) * 100;
  let color = "green";

  if (reverse) {
    if (percent <= 20) {
      color = "red";
    } else if (percent > 20 && percent <= 60) {
      color = "orange";
    } else {
      color = "green";
    }
  } else {
    if (percent <= 20) {
      color = "green";
    } else if (percent > 20 && percent <= 60) {
      color = "orange";
    } else {
      color = "red";
    }
  }

  return (
    <div
      className={`h-[--height]  bg-white shadow-md rounded-md flex justify-center items-center gap-1 flex-col font-monster text-7xl first:text-9xl ${styleClass} bg-[image:var(--image-url)] bg-cover min-w-[250px] flex-grow relative`}
      style={customCss}
    >
      <p className=" font-extrabold">{number}</p>
      <p className="text-lg">{title}</p>
      <CircularProgress
        trackColor="transparent"
        capIsRound={true}
        max={max}
        value={parseInt(number)}
        style={{ position: "absolute" }}
        size={(chartSize && `${chartSize}px`) || "200px"}
        thickness={"5px"}
        color={color}
      />
    </div>
  );
};

const RecentActivityCard: React.FC<{
  title: string;
  project: string;
  issueId: string;
  issueStatus: string;
}> = ({ title, project, issueId, issueStatus }) => {
  return (
    <div className="w-full h-12 shadow-md odd:bg-white even:bg-slate-200 flex gap-3 items-center first:rounded-t-md last:rounded-b-md">
      <div className="w-[25%] text-center">{title}</div>
      <div className="w-[25%] text-center">{project}</div>
      <div className="w-[25%] text-center">{issueId}</div>
      <div className="w-[25%] text-center">{issueStatus}</div>
    </div>
  );
};

const DashboardOverview = () => {
  return (
    <div className="h-screen flex-grow py-5 overflow-y-auto">
      <div className="w-full  px-5 flex flex-wrap gap-5">
        <ApplicationSummaryCard
          number="7"
          title="Projects"
          styleClass={`w-[50%]`}
          bg={cardbg1}
          chartSize={270}
          max={10}
          large
        />
        <ApplicationSummaryCard
          number="15"
          title="Issues"
          max={30}
          bg={cardbg4}
        />
        <ApplicationSummaryCard
          number="14"
          title="Open Issues"
          bg={cardbg2}
          max={30}
        />
        <ApplicationSummaryCard
          number="6"
          title="Closed Issues"
          max={15}
          reverse={true}
          bg={cardbg4}
        />
      </div>
      <div className="w-full text-left p-5 font-monster flex flex-col gap-5">
        <h2 className="text-2xl font-[400]">Recent Activities</h2>
        <div className="w-full h-8 flex gap-3 items-center">
          <div className="w-[25%] text-center font-[500] text-lg">Title</div>
          <div className="w-[25%] text-center font-[500] text-lg">Project</div>
          <div className="w-[25%] text-center font-[500] text-lg">Issue Id</div>
          <div className="w-[25%] text-center font-[500] text-lg">
            Issue Status
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <RecentActivityCard
            title="Status Change"
            project="Project X"
            issueId="ffaa23"
            issueStatus="Closed"
          />
          <RecentActivityCard
            title="New Comment"
            project="Project A"
            issueId="aaf223"
            issueStatus="Open"
          />
          <RecentActivityCard
            title="New Issue"
            project="Project A"
            issueId="1123fa"
            issueStatus="Open"
          />
          <RecentActivityCard
            title="Issue Assigned"
            project="Project Z"
            issueId="12ffaa"
            issueStatus="Open"
          />
          <RecentActivityCard
            title="Status Change"
            project="Project A"
            issueId="fabc32"
            issueStatus="Closed"
          />
          <RecentActivityCard
            title="Status Change"
            project="Project A"
            issueId="aa123a"
            issueStatus="Reopened"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;

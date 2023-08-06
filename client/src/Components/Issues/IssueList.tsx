import { useQuery } from "@apollo/client";

import { GET_ISSUES } from "../../Queries/dashboardQueries";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import { useDevFlow } from "sdk-devflow";
interface IssueCardProps {
  issue: IssueType;
}
interface IssueType {
  id: string;
  description: string;
  title: string;
  stackTrace: string;
  errorMessage: string;
  environment: string;
  appVersion: string;
  additionalContext: string;
  errorLocation: string;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  return (
    <div className="h-max p-3 rounded-md bg-slate-100 max-w-[90%] min-w-[90%]">
      <p className="text-3xl text-black/75 text-left font-[700]">
        {issue.title}
      </p>
      <br />

      <Accordion
        defaultIndex={[0]}
        allowMultiple
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <AccordionItem>
          <h2>
            <AccordionButton
              height={70}
              borderRadius={10}
              style={{
                display: "flex",
                justifyContent: "space-between",
                transition: "all 150ms",
                backgroundColor: "rgba(0,0,0,0.05)",
                padding: "10px",
              }}
              _hover={{ backgroundColor: "rgba(0,0,0,0.1)" }}
            >
              <p className="text-md font-[500]">Error Message</p>

              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} style={{ padding: "10px" }}>
            <p className="text-left">{issue.errorMessage}</p>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton
              height={70}
              borderRadius={10}
              style={{
                display: "flex",
                justifyContent: "space-between",
                transition: "all 150ms",
                backgroundColor: "rgba(0,0,0,0.05)",
                padding: "10px",
              }}
              _hover={{ backgroundColor: "rgba(0,0,0,0.1)" }}
            >
              <p className="text-md font-[500]">Stack Trace</p>

              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} style={{ padding: "10px" }}>
            <pre className="max-w-full w-full">
              <SyntaxHighlighter language="json" style={okaidia}>
                {issue.stackTrace}
              </SyntaxHighlighter>
            </pre>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton
              height={70}
              borderRadius={10}
              style={{
                display: "flex",
                justifyContent: "space-between",
                transition: "all 150ms",
                backgroundColor: "rgba(0,0,0,0.05)",
                padding: "10px",
              }}
              _hover={{ backgroundColor: "rgba(0,0,0,0.1)" }}
            >
              <p className="text-md font-[500]">Possible Origin Location</p>

              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} style={{ padding: "10px" }}>
            <pre className="max-w-full w-full">
              <SyntaxHighlighter language="json" style={okaidia}>
                {issue.errorLocation}
              </SyntaxHighlighter>
            </pre>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton
              height={70}
              borderRadius={10}
              style={{
                display: "flex",
                justifyContent: "space-between",
                transition: "all 150ms",
                backgroundColor: "rgba(0,0,0,0.05)",
                padding: "10px",
              }}
              _hover={{ backgroundColor: "rgba(0,0,0,0.1)" }}
            >
              <p className="text-md font-[500]">Environment Details</p>

              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} style={{ padding: "10px" }}>
            <p className=" text-sm font-[400] w-full text-left">
              App Version:{" "}
              <span className="text-black/60">
                {JSON.parse(issue.environment)?.appVersion}
              </span>
            </p>
            <p className="text-sm font-[400] text-left">
              Route:{" "}
              <span className="text-black/60">
                {JSON.parse(issue.environment)?.route}
              </span>
            </p>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton
              height={70}
              borderRadius={10}
              style={{
                display: "flex",
                justifyContent: "space-between",
                transition: "all 150ms",
                backgroundColor: "rgba(0,0,0,0.05)",
                padding: "10px",
              }}
              _hover={{ backgroundColor: "rgba(0,0,0,0.1)" }}
            >
              <p className="text-md font-[500]">Additional Context</p>

              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} style={{ padding: "10px" }}>
            <pre className="whitespace-pre-wrap">
              <SyntaxHighlighter language="json" style={okaidia}>
                {JSON.stringify(JSON.parse(issue.additionalContext), null, 2)}
              </SyntaxHighlighter>
            </pre>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

const IssueList = () => {
  const { captureGeneralError } = useDevFlow();

  const { loading, error, data } = useQuery(GET_ISSUES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const issueList = data.AllIssues;

  try {
    console.log(first);
  } catch (error: any) {
    captureGeneralError(error);
    // generateIssueDetails(error, {}, "Standard Error");
  }

  return (
    <div className="h-screen flex-grow  flex flex-col items-center p-5 overflow-scroll gap-10 ">
      {issueList.map((issue: IssueType) => (
        <IssueCard issue={issue} />
      ))}
    </div>
  );
};

export default IssueList;

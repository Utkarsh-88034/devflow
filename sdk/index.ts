const axios = require("axios");
const { request, gql } = require("graphql-request");
const api = "http://localhost/5000/graphql/";

const projectId = "64c89fc4eb520a12abee5383";
const data = {
  title: "This is a sample Issue from sdk",
  description: "This is a sample Issue from sdk",
  priority: "Urgent",
  assignee: "64bc0715db3bde46c0afb1ec",
  status: "Open",
  reportedBy: "64bbfb86ecc7233f37db29a4",
  project: "64c89fcfeb520a12abee5386",
};

const getIssues = gql`
  {
    AllIssues {
      title
      id
    }
  }
`;
const getAllIssues = async () => {
  try {
    const res = await request(api, getIssues);
    console.log(res);
  } catch (error) {
    generateIssueDetails(
      error,
      { someData: "Its value", anotherData: "its Value" },
      "GraphQL Error"
    );
    //

    // console.log(error.constructor.name);
  }
};
getAllIssues();
// const getAllIssues = async () => {
//   try {
//     const res = await axios.post(
//       api,
//       { query: getIssues },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           // Add any necessary headers here (e.g., authorization headers)
//         },
//       }
//     );
//     console.log(res.data);
//   } catch (error) {
//     generateIssueDetails(
//       error,
//       { event: "click", target: "div" },
//       "UI interactions error"
//     );
//   }
// };

// getAllIssues();

const generateIssueDetails = (error, data, type) => {
  const stackTrace = error.stack;
  const errorMessage = error.message;
  const errorType = error.constructor.name;
  const errorLocation = stackTrace.split("\n")[1];
  const additionalDetails = {
    type: type,
    data: data,
  };

  const environment = {
    // userAgent: navigator.userAgent,
    appVersion: "1.0.0",
    route: "window.location.href",
  };
  const errorConfig = {
    title: errorType,
    description: `
    A ${type} error of type ${errorType} occurred at ${errorLocation}:
 
    Error Message: ${errorMessage}
 
    Stack Trace:
    ${stackTrace}
 
    Additional information:
    ${JSON.stringify(additionalDetails, null, 2)}
    `,
    stackTrace: stackTrace,
    errorMessage: errorMessage,
    errorType: errorType,
    errorLocation: errorLocation,
    additionalContext: JSON.stringify(additionalDetails),
    environment: JSON.stringify(environment),
  };

  const query = `
  mutation create($title: String!,$description: String!,$stackTrace: String!,$errorMessage: String!,$errorType: String!,$errorLocation: String!,$additionalContext: String!,$environment: String!,$project: ID!) {
    newIssue(title:$title, description:$description, stackTrace:$stackTrace, errorMessage:$errorMessage, errorType:$errorType, errorLocation:$errorLocation, additionalContext:$additionalContext, environment:$environment,project:$project) {
      id
      title
      description
    }
  }
`;
  const variables = {
    title: errorConfig.title,
    description: errorConfig.description,
    stackTrace: errorConfig.stackTrace,
    errorType: errorConfig.errorType,
    errorLocation: errorConfig.errorLocation,
    additionalContext: errorConfig.additionalContext, // Use the JSON string here
    environment: errorConfig.environment,
    errorMessage: errorConfig.errorMessage,
    project: projectId,
  };

  const sendInfo = async () => {
    try {
      const res = request("http://localhost:5000/graphql", query, variables);
    } catch (error) {
      console.log(error);
    }
  };
  sendInfo();
};

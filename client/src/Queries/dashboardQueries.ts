import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query projects {
    AllProjects {
      id
      name
      description
      status
      startDate
      endDate
      projectManager {
        name
      }
      team {
        name
      }
      issues {
        title
        status
      }
    }
  }
`;

export const GET_ISSUES = gql`
  query issues {
    AllIssues {
      id
      description
      title
      stackTrace
      errorMessage
      environment
      appVersion
      additionalContext
      errorLocation
    }
  }
`;
export const GET_OPEN_ISSUES = gql`
  query openIssues {
    IssueByQuery(status: "Open") {
      title
      id
    }
  }
`;
export const GET_CLOSED_ISSUES = gql`
  query openIssues {
    IssueByQuery(status: "Closed") {
      title
      id
    }
  }
`;
export const GET_ISSUE_BY_ID = gql`
  query singleIssue($id: ID!) {
    IssueById(id: $id) {
      id
      description
      title
      stackTrace
      errorMessage
      environment
      appVersion
      additionalContext
      errorLocation
    }
  }
`;

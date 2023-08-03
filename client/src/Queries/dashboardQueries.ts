import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query projects {
    AllProjects {
      name
      description
    }
  }
`;

export const GET_ISSUES = gql`
  query issues {
    AllIssues {
      title
      id
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

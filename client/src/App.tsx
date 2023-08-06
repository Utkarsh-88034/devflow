import "./App.css";
import DashboardOverview from "./Components/Dashboard/DashboardOverview";
import Dashboard from "./Views/Dashboard";
import Login from "./Views/Login";
import { Routes, Route } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import ProjectsOverview from "./Components/Projects/ProjectsOverview";
import IssueList from "./Components/Issues/IssueList";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="h-screen w-screen flex justify-center items-center relative">
        <Routes>
          <Route path="/login" element={<Login type="login" />} />
          <Route path="/register" element={<Login type="register" />} />
          <Route
            path="/dashboard"
            element={
              <Dashboard>
                <DashboardOverview />
              </Dashboard>
            }
          />
          <Route
            path="/projects"
            element={
              <Dashboard>
                <ProjectsOverview />
              </Dashboard>
            }
          />
          <Route
            path="/open-issues"
            element={
              <Dashboard>
                <IssueList />
              </Dashboard>
            }
          />
          <Route path="/my-issues" element={<Dashboard>My Issue</Dashboard>} />
          <Route
            path="/search-issues"
            element={<Dashboard>Search Result</Dashboard>}
          />
          <Route path="/profile" element={<Dashboard>Profile</Dashboard>} />
        </Routes>
      </div>
    </ApolloProvider>
  );
}

export default App;

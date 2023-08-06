import React, { useContext } from 'react';
import { request } from 'graphql-request';

var api = 'http://localhost:5000/graphql/';
var projectId = '64c89fc4eb520a12abee5383';
var generateIssueDetails = function generateIssueDetails(error, data, type) {
  var stackTrace = error.stack;
  var errorMessage = error.message;
  var errorType = error.constructor.name;
  var errorLocation = stackTrace.split('\n')[1];
  var additionalDetails = {
    type: type,
    data: data
  };
  var environment = {
    appVersion: '1.0.0',
    route: 'window.location.href'
  };
  var errorConfig = {
    title: errorType,
    description: "\n    A " + type + " error of type " + errorType + " occurred at " + errorLocation + ":\n \n    Error Message: " + errorMessage + "\n \n    Stack Trace:\n    " + stackTrace + "\n \n    Additional information:\n    " + JSON.stringify(additionalDetails, null, 2) + "\n    ",
    stackTrace: stackTrace,
    errorMessage: errorMessage,
    errorType: errorType,
    errorLocation: errorLocation,
    additionalContext: JSON.stringify(additionalDetails),
    environment: JSON.stringify(environment)
  };
  var query = "\n  mutation create($title: String!,$description: String!,$stackTrace: String!,$errorMessage: String!,$errorType: String!,$errorLocation: String!,$additionalContext: String!,$environment: String!,$project: ID!) {\n    newIssue(title:$title, description:$description, stackTrace:$stackTrace, errorMessage:$errorMessage, errorType:$errorType, errorLocation:$errorLocation, additionalContext:$additionalContext, environment:$environment,project:$project) {\n      id\n      title\n      description\n    }\n  }\n";
  var variables = {
    title: errorConfig.title,
    description: errorConfig.description,
    stackTrace: errorConfig.stackTrace,
    errorType: errorConfig.errorType,
    errorLocation: errorConfig.errorLocation,
    additionalContext: errorConfig.additionalContext,
    environment: errorConfig.environment,
    errorMessage: errorConfig.errorMessage,
    project: projectId
  };
  var sendInfo = function sendInfo() {
    try {
      request(api, query, variables);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };
  sendInfo();
};
var DevFlow = /*#__PURE__*/function () {
  function DevFlow(apiKey) {
    this.apiKey = apiKey;
  }
  DevFlow.initialize = function initialize(apiKey) {
    if (!DevFlow.instance) {
      DevFlow.instance = new DevFlow(apiKey);
    }
    return DevFlow.instance;
  };
  var _proto = DevFlow.prototype;
  _proto.captureGeneralError = function captureGeneralError(error) {
    generateIssueDetails(error, {}, 'General Error');
  };
  _proto.captureAJAXError = function captureAJAXError(error) {
    var data = {
      url: error.response.config.url,
      headers: error.response.headers,
      method: error.response.config.method
    };
    generateIssueDetails(error, data, 'AJAX Error');
  };
  _proto.captureUIInterfaceError = function captureUIInterfaceError(error, event, target) {
    var data = {
      event: event,
      target: target
    };
    generateIssueDetails(error, data, 'UI Interface Error');
  };
  _proto.captureFromInputError = function captureFromInputError(error, userInput) {
    generateIssueDetails(error, userInput, 'Form Input Error');
  };
  return DevFlow;
}();

var DevFlowContext = React.createContext(undefined);
var DevFlowProvider = function DevFlowProvider(_ref) {
  var apiKey = _ref.apiKey,
    children = _ref.children;
  var sdk = DevFlow.initialize(apiKey);
  var contextValue = {
    sdk: sdk,
    captureGeneralError: sdk.captureGeneralError,
    captureAJAXError: sdk.captureAJAXError,
    captureUIInterfaceError: sdk.captureUIInterfaceError,
    captureFromInputError: sdk.captureFromInputError,
    apiKey: sdk.apiKey
  };
  return React.createElement(DevFlowContext.Provider, {
    value: contextValue
  }, children);
};

var useDevFlow = function useDevFlow() {
  var context = useContext(DevFlowContext);
  if (!context) {
    throw new Error('useDevFlow must be used within a DevFlowProvider');
  }
  return context;
};

export { DevFlowProvider, useDevFlow };
//# sourceMappingURL=sdk-devflow.modern.js.map

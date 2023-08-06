import { AxiosError } from 'axios'
import { request } from 'graphql-request'

const api = 'http://localhost/5000/graphql/'
const projectId = '64c89fc4eb520a12abee5383'

interface UserInputType {
  [key: string]: any
}
interface IssueAdditionalDataType {
  [key: string]: any
}

export class DevFlow {
  apiKey: string
  private static instance: DevFlow

  private constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  // private authenticateUser() {}

  //Initialize

  static initialize(apiKey: string): DevFlow {
    if (!DevFlow.instance) {
      DevFlow.instance = new DevFlow(apiKey)
    }
    return DevFlow.instance
  }

  public generateIssueDetails(
    error: Error | AxiosError,
    data: IssueAdditionalDataType,
    type: String
  ) {
    const stackTrace = error.stack
    const errorMessage = error.message
    const errorType = error.constructor.name
    const errorLocation = stackTrace!.split('\n')[1]
    const additionalDetails = {
      type: type,
      data: data
    }

    const environment = {
      // userAgent: navigator.userAgent,
      appVersion: '1.0.0',
      route: 'window.location.href'
    }
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
      environment: JSON.stringify(environment)
    }

    const query = `
    mutation create($title: String!,$description: String!,$stackTrace: String!,$errorMessage: String!,$errorType: String!,$errorLocation: String!,$additionalContext: String!,$environment: String!,$project: ID!) {
      newIssue(title:$title, description:$description, stackTrace:$stackTrace, errorMessage:$errorMessage, errorType:$errorType, errorLocation:$errorLocation, additionalContext:$additionalContext, environment:$environment,project:$project) {
        id
        title
        description
      }
    }
  `
    const variables = {
      title: errorConfig.title,
      description: errorConfig.description,
      stackTrace: errorConfig.stackTrace,
      errorType: errorConfig.errorType,
      errorLocation: errorConfig.errorLocation,
      additionalContext: errorConfig.additionalContext, // Use the JSON string here
      environment: errorConfig.environment,
      errorMessage: errorConfig.errorMessage,
      project: projectId
    }

    const sendInfo = async () => {
      //@ts-ignore
      request(api, query, variables)
    }

    sendInfo()
  }

  //General Error

  public captureGeneralError(error: Error) {
    this.generateIssueDetails(error, {}, 'General Error')
  }

  //AJAX Error

  public captureAJAXError(error: AxiosError) {
    const data = {
      url: error.response!.config.url,
      headers: error.response!.headers,
      method: error.response!.config.method
    }
    this.generateIssueDetails(error, data, 'AJAX Error')
  }

  //User Interface Error

  public captureUIInterfaceError(
    error: Error,
    event: Event,
    target: EventTarget
  ) {
    const data = {
      event: event,
      target: target
    }
    this.generateIssueDetails(error, data, 'UI Interface Error')
  }

  //Input Error

  public captureFromInputError(error: Error, userInput: UserInputType) {
    this.generateIssueDetails(error, userInput, 'Form Input Error')
  }
}

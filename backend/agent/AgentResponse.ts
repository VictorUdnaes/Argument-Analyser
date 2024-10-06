import {
    getArgumentCheckerResponse,
    getArgumentExtractorResponse, getStatementCheckerResponse,
    getStatementExtractorResponse
} from "./openaiProxy.ts";

class AgentResponse {
    statementExtraction: string;
    statementCheck: string;
    argumentExtraction: string;
    argumentValidation: string;

    constructor() {
        this.statementExtraction = "";
        this.statementCheck = "";
        this.argumentExtraction = "";
        this.argumentValidation = "";
    }
}

export class AgentResponseBuilder {
    private readonly agentResponse: AgentResponse;

    constructor() {
        this.agentResponse = new AgentResponse();
    }

    async extractStatements(input: string): Promise<this> {
        this.agentResponse.statementExtraction = await getStatementExtractorResponse(input);
        return this;
    }

    async validateStatements(): Promise<this> {
        this.agentResponse.statementCheck = await getStatementCheckerResponse(this.agentResponse.statementExtraction);
        return this;
    }

    async extractArgument(input: string): Promise<this> {
        this.agentResponse.argumentExtraction = await getArgumentExtractorResponse(input);
        return this;
    }

    async validateArgument(): Promise<this> {
        this.agentResponse.argumentValidation = await getArgumentCheckerResponse(this.agentResponse.argumentExtraction);
        return this;
    }

    build(): AgentResponse {
        return this.agentResponse;
    }
}
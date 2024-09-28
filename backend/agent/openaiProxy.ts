import {OpenAI} from "openai";
import {
    ARGUMENT_CHECKER_PROMPT,
    ARGUMENT_EXTRACTOR_PROMPT,
    STATEMENT_CHECKER_PROMPT,
    STATEMENT_EXTRACTOR_PROMPT
} from "./agentPrompts.ts";
import {
    ARGUMENT_EXTRACTOR,
    STATEMENT_CHECKER,
    STATEMENT_EXTRACTOR,
    ARGUMENT_CHECKER
} from "./agentRoles.ts";

export async function getStatementExtractorResponse(input: string) {
    return await getAgentResponse(
        STATEMENT_EXTRACTOR,
        `${STATEMENT_EXTRACTOR_PROMPT} ${input}`
    )
}

export async function getStatementCheckerResponse(input: string) {
    return await getAgentResponse(
        STATEMENT_CHECKER,
        `${STATEMENT_CHECKER_PROMPT} ${input}`
    )
}

export async function getArgumentExtractorResponse(input: string) {
    return await getAgentResponse(
        ARGUMENT_EXTRACTOR,
        `${ARGUMENT_EXTRACTOR_PROMPT} ${input}`
    )
}

export async function getArgumentCheckerResponse(input: string) {
    return await getAgentResponse(
        ARGUMENT_CHECKER,
        `${ARGUMENT_CHECKER_PROMPT} ${input}`
    )
}

async function getAgentResponse(role: string, request: string) {
    try {
        const openai = new OpenAI({apiKey: ""});
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {role: "system", content: `${role}`},
                {
                    role: "user",
                    content: `${request}`,
                },
            ],
        });

        return completion.choices[0].message.content;
    } catch (error) {
        console.error("Error fetching completion:", error);
        throw new Error("Connection error.");
    }
}
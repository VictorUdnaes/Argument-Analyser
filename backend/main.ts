import {Application, Router} from "oak";
import {oakCors} from "oakCors";
import { AgentResponseBuilder } from './agent/AgentResponse.ts';

const app = new Application();
const router = new Router();

/* TODO:
    * 1. Restructure the prompt so it structures the response into chucks containing a single statement that can be extracted into a list.
    * 2. Loop over the list so that the statementChecker executes on each statement separately and saves each response into another list.
    * 3. Improve prompting of statementChecker so the response is more structured and fitting for being displayed.
    * 4. Allow for checking if the statement is true or false so that it can be marked in red if incorrect on the website.
    * 5. Use the same methodology for the argumentExtractor as point 1 and 2 so each statement is handled separately.
    * 6. Improve structuring of argumentResponse so it structures the response more clearly.
    * 7? Maybe add a final agent who structures the final analysis based on the responses from the previous agents.
 */
router.get('/api/get-analysis/', async (context) => {
    try {
        console.log(`[SERVER]: { GET request received: /api/get-analysis/ }`);
        const input = context.request.url.searchParams.get('text');

        console.log(`[SERVER]: { GET request received: /api/get-analysis/, Input: ${input} }`);
        const responseString = await getAgentResponse(input)
            .then(response =>response.argumentValidation);
        context.response.body = {message: responseString};
        console.log(`[SERVER]: { GET /api/get-analysis/, Response: ${responseString} }`);
    } catch (error) {
        console.error(`[SERVER]: { Error: ${error} }`);
        context.response.status = 500;
        context.response.body = {message: "Error fetching analysis."};
    }
});

async function getAgentResponse(input: string): Promise<AgentResponse> {
    const builder = new AgentResponseBuilder();
    await builder.extractArgument(input)
        .then(builder => builder.validateArgument());
    return builder.build();
}

router.get('/api/test/', (context) => {
    console.log(`[SERVER]: { GET request received: /api/test/ }`);
    context.response.body = { message: "Hello World!" };
});

app.use(oakCors()); // Enable CORS for all routes
app.use(router.routes());
app.use(router.allowedMethods());

const hostname = '0.0.0.0';
const port = 3000;

console.log(`Server running at http://${hostname}:${port}/`);
await app.listen({ hostname, port });

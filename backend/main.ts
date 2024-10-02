import { Application, Router } from "oak";
import { oakCors } from "oakCors";
import {getArgumentCheckerResponse, getArgumentExtractorResponse, getStatementCheckerResponse, getStatementExtractorResponse
} from "./agent/openaiProxy.ts";

const app = new Application();
const router = new Router();
const input = "Newtons første lov, treghetsloven, sier at et legeme vil forbli i ro eller i en rettlinjet bevegelse med konstant fart inntil en ytre kraft påvirker det. Men ting vi observerer i fart, har i virkeligheten en tendens til å ikke fortsette i rettlinjet bevegelse med konstant fart. Newtons påstand reflekterer ikke faktiske observasjoner verken av objekter i ro, objekter i konstant fart eller objekter som ikke påvirkes av en ytre kraft. Vi observerer aldri direkte at treghetsloven er korrekt, for betingelsene den beskriver, er i virkeligheten aldri oppfylt. Tenker vi etter, innser vi at dette kjennetegner vitenskapelige lover generelt: Betingelsene som beskrives, er for idealiserte til at faktiske observasjoner vil oppføre seg helt i tråd med det loven beskriver";

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
        if (!input) {
            throw new Error("No text query parameter provided");
        }
        context.response.body = { message: input };
    } catch (error) {
        context.response.status = 500;
        context.response.body = { error: error.message };
    }
        /*
        // Extract and evaluate single statements
        console.log(`[SERVER]: { GET request received: /api/get-analysis/ }`);
        const response1 = await getStatementExtractorResponse(input).then((response) => {
            if (response) return response
            else throw new Error("No response from agent");
        });
        const response2 = await getStatementCheckerResponse(response1);
        console.log(`[SERVER]: { Response: ${response2} }`);

        // Extract and evaluate overarching arguments
        const response3 = await getArgumentExtractorResponse(input).then((response) => {
            if (response) return response
            else throw new Error("No response from agent");
        });
        const response4 = await getArgumentCheckerResponse(response3);
        console.log(`[SERVER]: { Response: ${response4} }`);

        context.response.body = { message: response2 };
    } catch (error) {
        context.response.status = 500;
        context.response.body = { error: error.message };
    }
     */
});

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

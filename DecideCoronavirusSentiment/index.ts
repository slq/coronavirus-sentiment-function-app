import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    let sentiment = 'POSITIVE';

    if (req.body && req.body.score) {

        //Getting the score from the Cognitive Service and determining the sentiment
        const { id, score } = req.body;

        if (score < 0.3) {
            sentiment = 'NEGATIVE';
        }
        else if (score < 0.6) {
            sentiment = 'NEUTRAL';
        }

        context.res = {
            status: 200,
            body: sentiment
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a score in the request body"
        };
    }
};

export default httpTrigger;

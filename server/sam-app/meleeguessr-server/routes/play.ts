import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import jwt from 'jsonwebtoken';
import { createOrUpdateSessionBySessionId, createOrUpdateSessionByUserId, getRandomClip } from './utils';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */


export const playHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    //called on going to /play, or after a guess (new clip is loaded)
    // 1. create game session, or find current one if it exists
    // Session {
    //     id String @id @default(auto()) @map("_id") @db.ObjectId
    //     userId String @unique @db.ObjectId
    //     correct Int
    //     incorrect Int
    //     currentClip String // find currentClip in clips.json to match to correct answer
    //}
    // 2. return currentClip to user for them to pull from s3 and view

    try {
        let userId: string | null = null;
        let sessionId: string | null = null;
    
        // Check if Authorization header is present
        const authHeader = event.headers['Authorization'] || event.headers['authorization'];
        sessionId = event.headers['session-id'] ?? "";
        if (authHeader) {
          const token = authHeader.split(' ')[1]; // Assuming "Bearer <token>"
          try {
            const decoded = jwt.verify(token, process.env.SECRET as string) as any;
            console.log(decoded);
            userId = decoded.id;
          } catch (error) {
            return {
              statusCode: 401,
              body: JSON.stringify({ message: 'Invalid token' }),
            };
          }
        }

        // Your game logic here, e.g., load the current clip, update scores, etc.
        const clip = await getRandomClip();
    
        let newSession;
        // For authenticated users, create or update session based on userId with new clip
        if (userId) {
            await createOrUpdateSessionByUserId(userId, clip)
        } else {
            newSession = await createOrUpdateSessionBySessionId(sessionId, clip)
        };
    
        return {
            statusCode: 200,
            body: JSON.stringify({
                data: {
                    currentClip: clip, // Replace with your logic to fetch the current clip,
                    sessionId: newSession?.id ?? ""
                },
                message: 'Success',
            }),
        };
    }   
    catch (error) {
        console.error('Error handling /play request:', error);
        return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
};

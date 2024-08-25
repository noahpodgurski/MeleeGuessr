import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { getRandomClip } from './utils';
import path from 'path';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

const prisma = new PrismaClient();

export const guessHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.body === null) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: 'No guess info provided',
            }),
        };
    }
    
    try {
        const body = JSON.parse(event.body);
        let userId: string | null = null;
        let sessionId: string | null = body.sessionId;
        let guess: string | null = body.guess;

        let session;

        if (!guess) return { statusCode: 400, body: JSON.stringify({message: "No guess info provided"})};

        // Check if Authorization header is present
        const authHeader = event.headers['Authorization'] || event.headers['authorization'];
        if (authHeader) {
          const token = authHeader.split(' ')[1]; // Assuming "Bearer <token>"
          try {
            const decoded = jwt.verify(token, process.env.SECRET as string) as any;
            userId = decoded.id;
            
            if (!userId) return { statusCode: 401, body: JSON.stringify({message: "Invalid token"})};

            session = await prisma.session.findFirst({
                where: {
                    userId: userId
                }
            })

          } catch (error) {
            return {
              statusCode: 401,
              body: JSON.stringify({ message: 'Invalid token' }),
            };
          }
        } else {
            //no login - just check if guess matches correct answer
            if (!sessionId) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({
                        message: "Invalid request"
                    })
                }
            }

            session = await prisma.session.findFirst({
                where: {
                    id: sessionId
                }
            });
        }

        if (!session) return { statusCode: 400, body: JSON.stringify({message: "Invalid request"})};

        //check if guess matches session
        const clip = await getRandomClip();
        if (session.answer === guess) { //correct
            if (userId) {
                prisma.session.update({
                    where: {
                        id: session.id,
                    },
                    data: {
                        correct: session.correct+1,
                        currentClip: path.basename(clip.path),
                        answer: clip.answer
                    }
                })
            } else if (sessionId) {
                prisma.session.update({
                    where: {
                        id: session.id,
                    },
                    data: {
                        correct: session.correct+1,
                        currentClip: path.basename(clip.path),
                        answer: clip.answer
                    }
                })
            } else {
                return {
                    statusCode: 400,
                    body: JSON.stringify({
                        message: "Invalid request"
                    })
                }
            }
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: "Correct"
                })
            }
        } else { //incorrect
            if (userId) {
                prisma.session.update({
                    where: {
                        id: session.id,
                    },
                    data: {
                        incorrect: session.incorrect+1,
                        currentClip: path.basename(clip.path),
                        answer: clip.answer
                    }
                })
            } else if (sessionId) {
                prisma.session.update({
                    where: {
                        id: session.id,
                    },
                    data: {
                        incorrect: session.incorrect+1,
                        currentClip: path.basename(clip.path),
                        answer: clip.answer
                    }
                })
            } else {
                return {
                    statusCode: 400,
                    body: JSON.stringify({
                        message: "Invalid request"
                    })
                }
            }
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: "Incorrect"
                })
            }
        }
    } catch(err) {
        console.error('Error handling /play request:', err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
};

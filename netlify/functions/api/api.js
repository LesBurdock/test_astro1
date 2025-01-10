import ServerlessHttp from 'serverless-http'
import express, { Router } from 'express'
import { isAuthorized } from '@tinacms/auth'
import { createMediaHandler } from 'next-tinacms-cloudinary/dist/handlers'

const app = express()
const router = Router()

const mediaHandler = createMediaHandler({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  // These are the Cloudinary credentials for media handling
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID, // Tina client ID
  token: process.env.TINA_TOKEN, // Tina Token
  // Authorization logic
  authorized: async (req, _res) => {
    try {
      // Check if we are in development mode and allow all requests
      if (process.env.NODE_ENV === 'development') {
        return true;
      }

      // Extract `clientID` from query parameters
      const clientID = req.query.clientID;
      if (!clientID) {
        console.error('Missing clientID');
        return false; // Reject request if `clientID` is missing
      }
      // You can further validate the `clientID` here if necessary
      // For example, you might verify it matches a known clientID or token
      console.log(`Received clientID: ${clientID}`);

      // Authorization based on Tina's `isAuthorized` (if you want to verify the user's authorization)
      const user = await isAuthorized(req);
      return user && user.verified;
    } catch (e) {
      console.error('Authorization failed:', e);
      return false; // Reject the request in case of any error
    }
  },
})


router.get('/cloudinary/media', mediaHandler)

router.post('/cloudinary/media', mediaHandler)

router.delete('/cloudinary/media/:media', (req, res) => {
  req.query.media = ['media', req.params.media]
  return mediaHandler(req, res)
})

app.use('/api/', router)
app.use('/.netlify/functions/api/', router)

export const handler = ServerlessHttp(app)

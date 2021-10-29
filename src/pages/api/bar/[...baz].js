/**
 * This is a catch-all route. It will handle all requests to `/api/bar/foo`,
 * as well as requests to `/api/bar/foo/baz/giggity/goo`. Everything after
 * `/api/bar` will be available as an array in the `request.query.baz`, where
 * `baz` is the parameter in the file name.
 */

// Local imports
import { createEndpoint } from 'helpers/createEndpoint'
import httpStatus from 'helpers/httpStatus'





export async function handler(request, response) {
  const { baz } = request.query

  async function getDataFromFakeAPI() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ valueOfBazParam: baz })
      }, 1000)
    })
  }

  const data = await getDataFromFakeAPI()

  response
    .status(httpStatus.OK)
    .json(data)
}





export default createEndpoint({
	allowedMethods: ['get'],
	handler,
})

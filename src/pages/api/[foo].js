/**
 * This is a catch-all route. It will handle all requests to `/api/beep`.
 * The value of `beep` will be available via `request.query.foo`, where `foo` is,
 * the parameter in the file name.
 */

// Local imports
import { createEndpoint } from 'helpers/createEndpoint'
import httpStatus from 'helpers/httpStatus'





export async function handler(request, response) {
  const { foo } = request.query

  async function getDataFromFakeAPI() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ valueOfFooParam: foo })
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

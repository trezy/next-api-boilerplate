import { createEndpoint } from 'helpers/createEndpoint'
import httpStatus from 'helpers/httpStatus'

export async function handler(request, response) {
  const openNotifyResponse = await fetch('http://api.open-notify.org/astros.json')
  const openNotifyResponseJSON = await openNotifyResponse.json()

  response
    .status(httpStatus.OK)
    .json({
      numberOfAstronautsInSpace: openNotifyResponseJSON.number,
    })
}

export default createEndpoint({
	allowedMethods: ['get'],
	handler,
})

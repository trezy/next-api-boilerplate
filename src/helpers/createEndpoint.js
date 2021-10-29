// Module imports
import compose from 'koa-compose'
import cors from 'micro-cors'





// Local imports
import httpStatus from 'helpers/httpStatus'





// Local constants
const DEFAULT_MIDDLEWARES = [
	cors({
		origin: (() => {
			if (process.env.VERCEL_ENV === 'production') {
				return process.env.FULLY_QUALIFIED_DOMAIN_NAME
			}

			return '*'
		})(),
	}),
]





function createEndpoint(options) {
	const {
		handler,
		allowedMethods,
		middlewares = [],
	} = options

	const allMiddlewares = [
		...DEFAULT_MIDDLEWARES,
		...middlewares,
	]

	return async (request, response) => {
		if (allowedMethods && !allowedMethods.includes(request.method.toLowerCase())) {
			return response.status(httpStatus.METHOD_NOT_ALLOWED).end()
		}

		let middlewareIndex = 0
		let wrappedHandler = handler

		while (middlewareIndex < allMiddlewares.length) {
			const currentMiddleware = allMiddlewares[middlewareIndex]

			wrappedHandler = await currentMiddleware(wrappedHandler)

			middlewareIndex += 1
		}

		return wrappedHandler(request, response)
	}
}





export { createEndpoint }

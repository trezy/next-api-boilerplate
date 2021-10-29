# Creating your first endpoint

The anatomy of an API endpoint in this boilerplate is nice and tiny. The goal is to allow you to get up-and-running with your API as quickly as possible. Let's take a look at an example endpoint ([getNumberOfAstronautsInSpace.js](../src/pages/api/getNumberOfAstronautsInSpace.js)):

```js
// src/pages/api/getNumberOfAstronautsInSpace.js
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
```

If have your API running locally, you'll be able to access this endpoint at `http://localhost:3000/getNumberOfAstronautsInSpace`. It will return a simple JSON object that looks like this:

```json
{
  "numberOfAstronautsInSpace": 3
}
```

## Breaking down the example

Let's break down the different pieces of this endpoint.

### Imports

```js
import { createEndpoint } from 'helpers/createEndpoint'
import httpStatus from 'helpers/httpStatus'
```

These two imports are all that's required to build an endpoint. The `createEndpoint` function will be used to create the endpoint's export, and `httpStatus` will give us access to all of the HTTP status codes we need for responses. Make sure to take a look at the [`httpStatus.js`](../src/helpers/httpStatus.js) file to get a better idea of what all that provides.

### Handler

```js
export async function handler(request, response) {
  response
    .status(httpStatus.OK)
    .json('...')
}
```

The `handler` function is a normal Next.js API endpoint. Check out the [Next.js documentation](https://nextjs.org/docs/api-routes/introduction) for more information on building Next.js routes.

### `createEndpoint()`

```js
export default createEndpoint({
	allowedMethods: ['get'],
	handler,
})
```

`createEndpoint` is the meat of this whooooooole boilerplate. So what all can we do with this function?

* The `allowedMethods` array gives us the ability to limit the types of requests that this endpoint can take. For example, setting this value to `['get', 'post']` will allow both `GET` and `POST` requests to hit the endpoint, but not `PUT` or `DELETE` requests.
* The `handler` property takes the function we defined in the last section, which is a normal Next.js API endpoint.
* Not shown here is the `middlewares` property, which allows you to pass in per-route middleware.

## Things to keep in mind

* When writing an endpoint, it can be an async function! That means you can use `await` syntax directly inside your endpoint.
* The `httpStatus` library makes it _very_ easy to reference status codes without having to remember their digits.
* The `handler` passed to `createEndpoint` is just a basic Next.js endpoint. If it runs in any other Next.js applications, it'll work here, too.
* You can have custom middleware for each endpoint! If you need to check authentication cookies for one request but not others, that's possible!
* The `allowedMethods` array may not allow you to split your endpoint into separate endpoints for each request type, but you can use `request.method` to figure out what type of request you're processing and segment your code appropriately.

import fetchMock from 'fetch-mock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {
  sayHelloAsync,
  sayHelloAsyncRequest,
  sayHelloAsyncSuccess,
  sayHelloAsyncFailure,
} from './hello'

import { helloEndpointRoute } from '../../shared/routes'

const mockStore = configureMockStore([thunk])

afterEach(() => {
  fetchMock.restore()
})

test('sayHelloAsync success', () => {
  fetchMock.get(helloEndpointRoute(1980), { serverMessage: 'Async hello success' })
  const store = mockStore()
  return store.dispatch(sayHelloAsync(1980))
    .then(() => {
      expect(store.getActions()).toEqual([
        sayHelloAsyncRequest(),
        sayHelloAsyncSuccess('Async hello success'),
      ])
    })
})

test('sayHelloAsync 404', () => {
  fetchMock.get(helloEndpointRoute(1980), 404)
  const store = mockStore()
  return store.dispatch(sayHelloAsync(1980))
    .then(() => {
      expect(store.getActions()).toEqual([
        sayHelloAsyncRequest(),
        sayHelloAsyncFailure(),
      ])
    })
})

test('sayHelloAsync data error', () => {
  fetchMock.get(helloEndpointRoute(1980), {})
  const store = mockStore()
  return store.dispatch(sayHelloAsync(1980))
    .then(() => {
      expect(store.getActions()).toEqual([
        sayHelloAsyncRequest(),
        sayHelloAsyncFailure(),
      ])
    })
})

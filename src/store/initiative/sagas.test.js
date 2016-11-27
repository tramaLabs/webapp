import { normalize, arrayOf } from 'normalizr'
import { take, put, call, fork } from 'redux-saga/effects'
import * as actions from './actions'
import api from 'services/api'
import saga, * as sagas from './sagas'
import initiative from './schema'

const resolve = jest.fn()
const reject = jest.fn()

beforeEach(() => {
  jest.resetAllMocks()
})

describe('createInitiative', () => {
  const data = { id: 1, title: 'test' }

  it('calls success', () => {
    const generator = sagas.createInitiative(data)
    expect(generator.next().value).toEqual(call(api.post, '/initiatives', data))
    expect(generator.next({ data }).value)
      .toEqual(put(actions.initiativeCreate.success(normalize(data, initiative))))
  })

  it('calls success and resolve', () => {
    const generator = sagas.createInitiative(data, resolve)
    expect(generator.next().value).toEqual(call(api.post, '/initiatives', data))
    expect(resolve).not.toBeCalled()
    expect(generator.next({ data }).value)
      .toEqual(put(actions.initiativeCreate.success(normalize(data, initiative))))
    expect(resolve).toHaveBeenCalledWith(data)
  })

  it('calls failure', () => {
    const generator = sagas.createInitiative(data)
    expect(generator.next().value).toEqual(call(api.post, '/initiatives', data))
    expect(generator.throw('test').value).toEqual(put(actions.initiativeCreate.failure('test')))
  })

  it('calls failure and reject', () => {
    const generator = sagas.createInitiative(data, resolve, reject)
    expect(generator.next().value).toEqual(call(api.post, '/initiatives', data))
    expect(reject).not.toBeCalled()
    expect(generator.throw('test').value).toEqual(put(actions.initiativeCreate.failure('test')))
    expect(reject).toHaveBeenCalledWith('test')
  })
})

describe('retrieveInitiative', () => {
  const data = { id: 1, title: 'test' }

  it('calls success', () => {
    const generator = sagas.retrieveInitiative(1)
    expect(generator.next().value).toEqual(call(api.get, '/initiatives/1'))
    expect(generator.next({ data }).value)
      .toEqual(put(actions.initiativeRetrieve.success(normalize(data, initiative))))
  })

  it('calls success and resolve', () => {
    const generator = sagas.retrieveInitiative(1, resolve)
    expect(generator.next().value).toEqual(call(api.get, '/initiatives/1'))
    expect(resolve).not.toBeCalled()
    expect(generator.next({ data }).value)
      .toEqual(put(actions.initiativeRetrieve.success(normalize(data, initiative))))
    expect(resolve).toHaveBeenCalledWith(data)
  })

  it('calls failure', () => {
    const generator = sagas.retrieveInitiative(1)
    expect(generator.next().value).toEqual(call(api.get, '/initiatives/1'))
    expect(generator.throw('test').value).toEqual(put(actions.initiativeRetrieve.failure('test')))
  })

  it('calls failure and reject', () => {
    const generator = sagas.retrieveInitiative(1, resolve, reject)
    expect(generator.next().value).toEqual(call(api.get, '/initiatives/1'))
    expect(reject).not.toBeCalled()
    expect(generator.throw('test').value).toEqual(put(actions.initiativeRetrieve.failure('test')))
    expect(reject).toHaveBeenCalledWith('test')
  })
})

describe('listInitiatives', () => {
  const data = [1, 2, 3]

  it('calls success', () => {
    const generator = sagas.listInitiatives({ limit: 1 })
    expect(generator.next().value).toEqual(call(api.get, '/initiatives', { params: { limit: 1 } }))
    expect(generator.next({ data }).value)
      .toEqual(put(actions.initiativeList.success(normalize(data, arrayOf(initiative)))))
  })

  it('calls success and resolve', () => {
    const generator = sagas.listInitiatives({ limit: 1 }, resolve)
    expect(generator.next().value).toEqual(call(api.get, '/initiatives', { params: { limit: 1 } }))
    expect(resolve).not.toBeCalled()
    expect(generator.next({ data }).value)
      .toEqual(put(actions.initiativeList.success(normalize(data, arrayOf(initiative)))))
    expect(resolve).toHaveBeenCalledWith(data)
  })

  it('calls failure', () => {
    const generator = sagas.listInitiatives({ limit: 1 })
    expect(generator.next().value).toEqual(call(api.get, '/initiatives', { params: { limit: 1 } }))
    expect(generator.throw('test').value).toEqual(put(actions.initiativeList.failure('test')))
  })

  it('calls failure and reject', () => {
    const generator = sagas.listInitiatives({ limit: 1 }, resolve, reject)
    expect(generator.next().value).toEqual(call(api.get, '/initiatives', { params: { limit: 1 } }))
    expect(reject).not.toBeCalled()
    expect(generator.throw('test').value).toEqual(put(actions.initiativeList.failure('test')))
    expect(reject).toHaveBeenCalledWith('test')
  })
})

describe('updateInitiative', () => {
  const data = { id: 1, title: 'test' }

  it('calls success', () => {
    const generator = sagas.updateInitiative(1, data)
    expect(generator.next().value).toEqual(call(api.put, '/initiatives/1', data))
    expect(generator.next({ data }).value)
      .toEqual(put(actions.initiativeUpdate.success(normalize(data, initiative))))
  })

  it('calls success and resolve', () => {
    const generator = sagas.updateInitiative(1, data, resolve)
    expect(generator.next().value).toEqual(call(api.put, '/initiatives/1', data))
    expect(resolve).not.toBeCalled()
    expect(generator.next({ data }).value)
      .toEqual(put(actions.initiativeUpdate.success(normalize(data, initiative))))
    expect(resolve).toHaveBeenCalledWith(data)
  })

  it('calls failure', () => {
    const generator = sagas.updateInitiative(1, data)
    expect(generator.next().value).toEqual(call(api.put, '/initiatives/1', data))
    expect(generator.throw('test').value).toEqual(put(actions.initiativeUpdate.failure('test')))
  })

  it('calls failure and reject', () => {
    const generator = sagas.updateInitiative(1, data, resolve, reject)
    expect(generator.next().value).toEqual(call(api.put, '/initiatives/1', data))
    expect(reject).not.toBeCalled()
    expect(generator.throw('test').value).toEqual(put(actions.initiativeUpdate.failure('test')))
    expect(reject).toHaveBeenCalledWith('test')
  })
})

test('watchInitiativeCreateRequest', () => {
  const payload = { data: 1, resolve, reject }
  const generator = sagas.watchInitiativeCreateRequest()
  expect(generator.next().value).toEqual(take(actions.INITIATIVE_CREATE_REQUEST))
  expect(generator.next(payload).value).toEqual(call(sagas.createInitiative, ...Object.values(payload)))
})

test('watchInitiativeRetrieveRequest', () => {
  const payload = { id: 1, resolve, reject }
  const generator = sagas.watchInitiativeRetrieveRequest()
  expect(generator.next().value).toEqual(take(actions.INITIATIVE_RETRIEVE_REQUEST))
  expect(generator.next(payload).value).toEqual(call(sagas.retrieveInitiative, ...Object.values(payload)))
})

test('watchInitiativeListRequest', () => {
  const payload = { params: { limit: 1 }, resolve, reject }
  const generator = sagas.watchInitiativeListRequest()
  expect(generator.next().value).toEqual(take(actions.INITIATIVE_LIST_REQUEST))
  expect(generator.next(payload).value).toEqual(call(sagas.listInitiatives, ...Object.values(payload)))
})

test('watchInitiativeUpdateRequest', () => {
  const payload = { id: 1, data: 1, resolve, reject }
  const generator = sagas.watchInitiativeUpdateRequest()
  expect(generator.next().value).toEqual(take(actions.INITIATIVE_UPDATE_REQUEST))
  expect(generator.next(payload).value).toEqual(call(sagas.updateInitiative, ...Object.values(payload)))
})

test('saga', () => {
  const generator = saga()
  expect(generator.next().value).toEqual(fork(sagas.watchInitiativeCreateRequest))
  expect(generator.next().value).toEqual(fork(sagas.watchInitiativeRetrieveRequest))
  expect(generator.next().value).toEqual(fork(sagas.watchInitiativeListRequest))
  expect(generator.next().value).toEqual(fork(sagas.watchInitiativeUpdateRequest))
})

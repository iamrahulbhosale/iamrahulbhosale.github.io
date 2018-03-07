import { createMemoryHistory } from 'history'
import { configureStore } from '../../client/store/index'

export default function createStoreForServer(context) {
  try {
    context.history = createMemoryHistory()
    context.store = configureStore({}, context.history)
  } catch (err) {
    return Promise.reject(err)
  }
  return Promise.resolve(context)
}

// @flow

import Helmet from 'react-helmet'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'
import { StyleSheetServer } from 'aphrodite'

import initStore from './init-store'
import App from '../shared/App'
import { APP_CONTAINER_CLASS, STATIC_PATH, WDS_PORT } from '../shared/config'
import { isProd } from '../shared/util'


const renderApp = (location: string, plainPartialState: ?Object, routerContext: ?Object) => {
  const store = initStore(plainPartialState)
  const { html, css } = StyleSheetServer.renderStatic(() =>
    ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={location} context={routerContext}>
          <App />
        </StaticRouter>
      </Provider>))

  const head = Helmet.rewind()

  return (
    `<!doctype html>
    <html>
      <head>
        ${head.title}
        ${head.meta}
        <link rel="stylesheet" href="${STATIC_PATH}/css/bootstrap.min.css">
        <style data-aphrodite>${css.content}</style>
      </head>
      <body>
        <div class="${APP_CONTAINER_CLASS}">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState())}
        </script>
        <script src="${isProd ? STATIC_PATH : `http://localhost:${WDS_PORT}/dist/`}js/bundle.js"></script>
        <script>
          StyleSheet.rehydrate(${JSON.stringify(css.renderedClassNames)});
        </script>
      </body>
    </html>`
  )
}


export default renderApp

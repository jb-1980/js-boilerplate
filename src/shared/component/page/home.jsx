// @flow

import React from 'react'
import Helmet from 'react-helmet'
import { StyleSheet, css } from 'aphrodite'

import ModalExample from '../modal-example'
import { APP_NAME } from '../../config'

const styles = StyleSheet.create({
  hoverMe: {
    ':hover': {
      color: 'red',
    },
  },
  resizeMe: {
    '@media (max-width: 800px)': {
      color: 'red',
    },
  },
  specialButton: {
    backgroundColor: 'limegreen',
  },
})

const HomePage = () =>
  <div>
    <Helmet
      meta={[
        { name: 'description', content: 'Hello App is ready to say hello' },
        { property: 'og:title', content: APP_NAME },
      ]}
    />
    <div className="jumbotron">
      <div className="container">
        <h1 className="display-3 mb-4">{APP_NAME}</h1>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-md-4 mb-4">
          <h3 className="mb-3">Bootstrap</h3>
          <p>
            <button
              type="buttom"
              role="button"
              data-toggle="modal"
              data-target=".js-modal-example"
              className="btn btn-primary"
            >
              Open Modal
            </button>
          </p>
        </div>
        <div className="col-md-4 mb-4">
          <h3 className="mb-3">Websockets</h3>
          <p>Open your browser console.</p>
        </div>
        <div className="col-md-4 mb-4">
          <h3 className="mb-3">
            <p className={css(styles.hoverMe)}>Hover me.</p>
            <p className={css(styles.resizeMe)}>Resize the window.</p>
            <button className={`${css(styles.specialButton)} btn btn-primary`}>Composition</button>
          </h3>
        </div>
      </div>
    </div>
    <ModalExample />
  </div>

export default HomePage

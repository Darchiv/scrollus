/** @module index */

/**
 * A two-dimensional point.
 *
 * @typedef {Object} Point
 * @property {number} x - Horizontal component.
 * @property {number} y - Vertical component.
 */

 /**
 * Options for scrolling interface. Can be used with public API methods like
 *   {@link to} method.
 *
 * @typedef {Object} Options
 * @property {number} [easing=linear] - Easing function returning a value in
 *   range [0, 1] given argument in range [0, 1].
 */

import easings from './easing'

/* global Element */

// Accepts DOM Element and returns its absolute position from top of the document.
function getElementPosition (element) {
  return {
    x: window.pageXOffset + element.getBoundingClientRect().left,
    y: window.pageYOffset + element.getBoundingClientRect().top
  }
}

const scrollus = {
  ease: easings,

  /**
   * Scroll viewport to desired target which can be an element, a query or a
   * point.
   *
   * @method to
   * @param {(string|Element|Array|Point)} target - A destination element or
   *   position to scroll view to. Can be an actual Element, a query string, a
   *   Point, or array.
   * @param {number} duration - How much time in miliseconds scrolling will
   *   take.
   * @param {Options} [options]
   * @throws {Error}
   * @since 0.1.0
   */
  to: function (target, duration, options) {
    const easing = options && options.easing || this.ease.linear

    var point
    // Actual DOM element.
    if (target instanceof Element) {
      point = getElementPosition(target)
    // CSS query.
    } else if (typeof target === 'string') {
      point = getElementPosition(getElementByQuery(target))
    // Point object.
    } else if ('x' in target || 'y' in target) {
      point = target
    // Array with minimum of 2 elements.
    } else if (target instanceof Array && target.length >= 2) {
      point = {x: target[0], y: target[1]}
    } else {
      throw new Error(`Scrollus: invalid target, "${target}" supplied.`)
    }

    beginScrolling(point.x, point.y, duration, easing)
  },

  /**
   * Scroll browser window to given element's position. After scrolling, the
   * top-left corner of the element will be in the top-left corner of the
   * viewport, if possible. By default viewport will be scrolled in both axes.
   * A more strict version of {@link to} method.
   *
   * @method toElement
   * @param {Element} target - Destination element to scroll view to.
   *   Must be an actual DOM Element.
   * @param {number} duration - Duration of scrolling animation in miliseconds.
   * @param {Options} [options]
   * @throws {Error} Target must be an instance of DOM Element.
   * @since 0.2.0
   */
  toElement: function (target, duration, options) {
    const easing = options && options.easing || this.ease.linear

    if (!(target instanceof Element)) {
      throw new Error(`Scrollus: Target must be an instance of DOM Element. "${typeof target}" given.`)
    }

    if (typeof duration !== 'number' || duration < 0) {
      throw new Error('Scrollus: Duration must be a non-negative number.')
    }

    var {x, y} = getElementPosition(target)

    beginScrolling(x, y, duration, easing)
  },

  /**
   * Scroll to absolutely positioned position in only y axis. For now it zeroes
   * x axis.
   *
   * @method toVertical
   * @param {number} position - Amount of pixels from the top of container to
   *   scroll view to.
   * @param {number} duration - Duration of scrolling animation in miliseconds.
   * @param {Options} [options]
   * @since 0.2.0
   */
  toVertical: function (position, duration, options) {
    const easing = options && options.easing || this.ease.linear

    if (typeof position !== 'number') {
      throw new Error('Scrollus: Position must be a number.')
    }

    beginScrolling(0, position, duration, easing)
  },

  /**
   * Scroll to absolutely positioned position in only x axis. For now it zeroes
   * y axis.
   *
   * @method toHorizontal
   * @param {number} position - Amount of pixels from the left side of container
   *   to scroll view to.
   * @param {number} duration - Duration of scrolling animation in miliseconds.
   * @param {Options} [options]
   * @since 0.2.0
   */
  toHorizontal: function (position, duration, options) {
    const easing = options && options.easing || this.ease.linear

    if (typeof position !== 'number') {
      throw new Error('Scrollus: Position must be a number.')
    }

    beginScrolling(position, 0, duration, easing)
  },

  getElementPosition: getElementPosition
}

function getElementByQuery (query) {
  return document.querySelector(query)
}

/**
 * Performs viewport movement.
 *
 * @param {number} x
 * @param {number} y
 * @param {number} duration - Duration of scrolling in miliseconds.
 * @param {function} easing - Easing function to apply to animation.
 */
function beginScrolling (x, y, duration, easing) {
  const starting = {
    // Viewport coordinates in relation to document.
    scrollY: window.scrollY,
    scrollX: window.scrollX,
    // Dimensions of page content.
    pageHeight: document.body.scrollHeight,
    pageWidth: document.body.scrollWidth,
    // Time when scrolling began.
    timestamp: null
  }

  // If element is close to page's bottom then window will scroll only to some position above the element.
  const targetY = starting.pageHeight - y < window.innerHeight
    ? starting.pageHeight - window.innerHeight
    : y

  const targetX = starting.pageWidth - x < window.innerWidth
    ? starting.pageWidth - window.innerWidth
    : x

  const diffX = targetX - starting.scrollX
  const diffY = targetY - starting.scrollY

  // TODO: make it work for X!
  if (/*diffX === 0 && */diffY === 0) return

  // Bootstrap our animation - it will get called right before next frame shall be rendered.
  window.requestAnimationFrame(function step (timestamp) {
    if (!starting.timestamp) starting.timestamp = timestamp
    // Elapsed miliseconds since start of scrolling.
    const timeDiff = timestamp - starting.timestamp

    /* TODO: add x component and polish it overall. */
    // Adapt to changed page content size.
    if (starting.pageHeight !== document.body.scrollHeight) {
      starting.pageHeight = document.body.scrollHeight
      starting.scrollY = window.pageYOffset
    }

    // Get percent of completion in range [0, 1].
    let percent = Math.min(timeDiff / duration, 1)
    // Apply the easing.
    percent = easing ? easing(percent) : percent

    window.scrollTo(starting.scrollX + diffX * percent, starting.scrollY + diffY * percent)

    // Proceed with animation as long as we wanted it to.
    if (timeDiff < duration) {
      window.requestAnimationFrame(step)
    }
  })
}

export default scrollus

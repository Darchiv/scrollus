/** @module index */

/**
 * A two-dimensional point.
 *
 * @typedef {Object} Point
 * @property {number} x - Horizontal component.
 * @property {number} y - Vertical component.
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
  easing: easings,

  /**
   * Scroll viewport to desired target which can be an element, a query or a
   * point.
   *
   * @method to
   * @param {(string|Element|Point)} target - Destination element or position
   *   to scroll view to. Can be an actual Element, a query string or a Point,
   *   eg. a {x: , y: } object.
   * @param {number} duration - How much time in miliseconds scrolling will
   *   take.
   * @param {object} options - Options.
   * @since 0.1.0
   */
  to: function (target, duration, options) {
    options.easing = options.easing || this.easing.linear
    const {easing} = options

    var point
    if (target instanceof Element) {
      point = getElementPosition(target)
    } else if (typeof target === 'string') {
      point = getElementPosition(getElementByQuery(target))
    } else if ('x' in target || 'y' in target) {
      point = target
    } else {
      throw new Error(`Scrollus: invalid target, "${target}" supplied.`)
    }

    beginScrolling(point.x, point.y, duration, easing)
  },

  /**
   * @ignore
   * Scroll browser window to given element's position. After scrolling, the
   * top-left corner of the element will be in the top-left corner of the
   * viewport, if possible. By default viewport will be scrolled in both axes.
   *
   * @method toElement
   * @param {(string|Element)} target - Destination element to scroll view to.
   *   Can be an actual DOM Element or a query string.
   * @param {number} duration - Duration of scrolling animation in miliseconds.
   * @param {object} options - Options. Currently useless.
   * @throws {Error} Target must be an instance of DOM Element or a string
   *   query selector which resolves to some element.
   */
  toElement: function (target, duration, options) {
    let x, y

    // if (target instanceof Element) {
    //   {x, y} = getElementPosition(target)
    // }

    if (!(target instanceof Element || typeof target === 'string')) {
      throw new Error(`Target must be an instance of DOM Element or a string. "${typeof target}" given.`)
    }

    if (typeof duration !== 'number' || duration < 0) {
      throw new Error('Duration must be a non-negative number.')
    }

    return
  },

  /**
   * @ignore
   * Scroll to absolutely positioned point. After scrolling, the point will be
   * in the top-left corner of the viewport, if possible. If only one point
   * component is given then only that one axis will be scrolled.
   *
   * @method toAbsolute
   * @param {Point} point - A point to which scroll. Only one component is
   *   required.
   * @param {number} duration - Duration of scrolling in miliseconds.
   * @param {object} options - Options. Currently useless.
   * @throws {Error} Target point must have 'x' or 'y' property.
   */
  toAbsolute: function (point, duration, options) {
    if (!('x' in point) && !('y' in point)) {
      throw new Error('Point must have x or y or both properties.')
    }

    if (typeof duration !== 'number' || duration < 0) {
      throw new Error('Duration must be a non-negative number.')
    }

    return
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

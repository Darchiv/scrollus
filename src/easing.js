/** @module easing */
import BezierEasing from 'bezier-easing'

/**
 * Predefined easings for convenience.
 *
 * @enum {function}
 */
const predefinedEasings = {
  'linear': function (x) { return x },
  'easeInSine': BezierEasing(0.47, 0, 0.745, 0.715),
  'easeOutSine': BezierEasing(0.39, 0.575, 0.565, 1),
  'easeInOutSine': BezierEasing(0.445, 0.05, 0.55, 0.95),
  'easeInQuad': BezierEasing(0.55, 0.085, 0.68, 0.53),
  'easeOutQuad': BezierEasing(0.25, 0.46, 0.45, 0.94),
  'easeInOutQuad': BezierEasing(0.455, 0.03, 0.515, 0.955),
  'easeInCubic': BezierEasing(0.55, 0.055, 0.675, 0.19),
  'easeOutCubic': BezierEasing(0.215, 0.61, 0.355, 1),
  'easeInOutCubic': BezierEasing(0.645, 0.045, 0.355, 1),
  'easeInQuart': BezierEasing(0.895, 0.03, 0.685, 0.22),
  'easeOutQuart': BezierEasing(0.165, 0.84, 0.44, 1),
  'easeInOutQuart': BezierEasing(0.77, 0, 0.175, 1),
  'easeInQuint': BezierEasing(0.755, 0.05, 0.855, 0.06),
  'easeOutQuint': BezierEasing(0.23, 1, 0.32, 1),
  'easeInOutQuint': BezierEasing(0.86, 0, 0.07, 1),
  'easeInExpo': BezierEasing(0.95, 0.05, 0.795, 0.035),
  'easeOutExpo': BezierEasing(0.19, 1, 0.22, 1),
  'easeInOutExpo': BezierEasing(1, 0, 0, 1),
  'easeInCirc': BezierEasing(0.6, 0.04, 0.98, 0.335),
  'easeOutCirc': BezierEasing(0.075, 0.82, 0.165, 1),
  'easeInOutCirc': BezierEasing(0.785, 0.135, 0.15, 0.86),
  'easeInBack': BezierEasing(0.6, -0.28, 0.735, 0.045),
  'easeOutBack': BezierEasing(0.175, 0.885, 0.32, 1.275),
  'easeInOutBack': BezierEasing(0.68, -0.55, 0.265, 1.55)
}

export default predefinedEasings

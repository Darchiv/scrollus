![scrollus logo](https://user-images.githubusercontent.com/1933237/28631516-ca364842-722d-11e7-9dd0-cb130888ddaa.jpg)
 
Scrolling for the masses.
A lightweight library for browser viewport positioning. It uses a high-performance Bézier curve computation [library](https://github.com/gre/bezier-easing) for easing support so that it does strain browser as least as possible.

## Usage

You can include the `lib/scrollus.js` file created with `npm run build` directly into the browser
```html
<script src="scrollus.js"></script>
```
or use the library as a module
```javascript
import scrollus from 'scrollus'
```
The `lib/scrollus.js` file is already included in npm registry repository for convenience.

### `scrollus.to(target, duration, [options])`
A *just scroll* method. Parameters: `target` can be a DOM element, a CSS selector, an array, or an object with `x` and `y` properties; `duration` specifies animation time in miliseconds; and `options` is an optional configuration object.

#### Examples
```javascript
scrollus.to(element, 1000) // Scroll to DOM `element` with linear easing in 1 second.
scrollus.to([0, 500], 200) // Scroll to 500 px from top of the document and 0 px from the left with linear easing in 200 ms.
scrollus.to({y: 500}, 200) // Same as above.
scrollus.to('#submit-button', 400, {
  easing: scrollus.ease.inOutSine
}) // Scroll to element selected by '#submit-button' query with sine easing in 400 ms.
```

### `scrollus.toElement(target, duration, [options])`
Scrolls to given DOM Element instance. Just a more strict version of `to` method.

#### Examples
```javascript
var a = document.getElementById('submit-button')
scrollus.to(a, 500, {
  easing: scrollus.ease.inOutSine
})
```

### `scrollus.toVertical(position, duration, [options])`
Scrolls to `position` number of pixels from the top of the container. Horizontal position is set to 0 for now.

### `scrollus.toHorizontal(position, duration, [options])`
Scrolls to `position` number of pixels from the left side of the container. Vertical position is set to 0 for now.

### Options object
Currently `options` parameter accepts an object with the following properties:

  * `easing` - a function which given a number in range [0, 1] produces a number in the same range. Conveniently `scrollus` has many easings like `linear` or `inOutCubic` predefined and accesible through `ease` property, e.g. `scrollus.ease.inOutCubic`

## Roadmap to 1.0

- [x] Redesign and lock the API
- [ ] Minify and optimise browser-targeted output file
- [ ] Implement chaining of methods
- [ ] Enable use of any container for scrolling
- [ ] Add pixel offsets to options
- [ ] Add events
  - [ ] `onStart`
  - [ ] `onProgress` with `cancel` callback for aborting scrolling
  - [ ] `onEnd`
- [ ] Add `easingX` and `easingY` options to enforce given easing in x or y axis respectively
- [ ] Add `cancellable` option so that scrolling can be aborted by user input (e.g. mouse wheel scroll)
- [ ] Add option to change where viewport center should be at the end (e.g. top-right corner of element, center)
- [ ] Allow construction of custom easings through custom-parametrized bezier factory.
- [ ] Tests (in browser)

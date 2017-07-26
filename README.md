![scrollus logo](https://user-images.githubusercontent.com/1933237/28631516-ca364842-722d-11e7-9dd0-cb130888ddaa.jpg)
 
Scrolling for the masses.
A lightweight library for browser viewport positioning.

## Usage
*Stable API is to be published soon.*

## Roadmap to 1.0

- [ ] Redesign and lock the API
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
- [ ] Tests (in browser)

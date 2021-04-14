# Focal Point Mask

A responsive mask component that dynamically crops images and videos preserving a focal point.

## Getting started

### Install

Install using `npm` or `yarn`.

#### npm

```bash
npm install --save focal-point-mask
```

#### yarn

```bash
yarn add focal-point-mask
```

### Import

Import the package to make the `<focal-point-mask>` tag available in the HTML.

```js
import 'focal-point-mask';
```

Import the class instead if you prefer to define the `<focal-point-mask>` tag manually.

```js
import FocalPointMask from 'focal-point-mask/class';

if (!window.customElements.get('focal-point-mask')) {
  window.customElements.define('focal-point-mask', FocalPointMask);
}
```

### Use

Use `<focal-point-mask>` in the HTML to mask images or videos.

```html
<focal-point-mask focalPoint="35% 75%">
  <img src="image.png">
</focal-point-mask>

<focal-point-mask focalPoint="center">
  <video>
    <source src="video.mp4">
  </video>
</focal-point-mask>
```

Style `<focal-point-mask>` with some dimensions, otherwise it will not be displayed.

```css
focal-point-mask {
  width: 100%;
  height: 450px;
}
```

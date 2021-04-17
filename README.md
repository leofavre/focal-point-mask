# Focal Point Mask

#### A responsive mask web component that dynamically crops any visual media preserving a given focal point.

## Introduction

### Install

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

If you prefer to define the tag manually, import the class instead.

```js
import FocalPointMask from 'focal-point-mask/class';

if (!window.customElements.get('focal-point-mask')) {
  window.customElements.define('focal-point-mask', FocalPointMask);
}
```

### Usage

Wrap images, videos or any visual media with `<focal-point-mask>` in the HTML.

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

Style `focal-point-mask` with some dimensions, otherwise it won't be displayed.

```css
focal-point-mask {
  width: 100%;
  height: 450px;
}
```

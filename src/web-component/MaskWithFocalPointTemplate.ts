const MaskWithFocalPointTemplate = document.createElement('template');

MaskWithFocalPointTemplate.innerHTML = `
  <style>
    :host {
      position: relative;
      display: block;
      overflow: hidden;
    }

    ::slotted(img),
    ::slotted(video) {
      position: absolute;
      display: block;
      left: 50%;
      top: 50%;
      transform: translateX(-50%, -50%);
    }
  </style>
  <slot></slot>
`;

export default MaskWithFocalPointTemplate;

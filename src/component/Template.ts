const Template = document.createElement('template');

Template.innerHTML = `
  <style>
    :host {
      position: relative;
      display: block;
      overflow: hidden;
      width: 100%;
      height: 100%;
    }

    ::slotted(img),
    ::slotted(video) {
      position: absolute;
      display: block;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      object-fit: fill;
    }

    ::slotted(picture) {
      position: static;
    }
  </style>
  <slot></slot>
`;

export default Template;

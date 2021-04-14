const Template = document.createElement('template');

Template.innerHTML = `
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
      transform: translate(-50%, -50%);
    }

    ::slotted(picture) {
      position: static;
    }
  </style>
  <slot></slot>
`;

export default Template;

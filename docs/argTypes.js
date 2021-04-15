/* eslint-disable max-len */

export const argTypes = {
  focalPoint: {
    name: 'focalPoint',
    description: '' +
      '**Media focal point coordinate.**\n\n' +
      'The coordinate of the media area that should be preserved when it is cropped by the mask.\n\n' +
      'Similarly to **background-position** in CSS, it expects a pair of position keywords or percentage values representing the distance from the media top left corner to the focal point.\n\n' +
      'If a single value is passed, the second value is set to *"center"*.\n\n' +
      'Examples: `"top right"` `"center left"` `"25% 65%"`',
    table: {
      category: 'Properties',
      type: { summary: 'string' },
      defaultValue: { summary: '"center"' }
    }
  },
  aspectRatio: {
    name: 'aspectRatio',
    description: '' +
      '**Media width divided by its height.**\n\n' +
      'Although the ratio is calculated while the media loads, setting this property is useful to prevent it from resizing during the process.\n\n' +
      'Examples: `"16/9"` `"4/3"`',
    table: {
      category: 'Properties',
      type: { summary: 'string' }
    }
  },
  minWidth: {
    name: 'minWidth',
    description: '' +
      '**Media minimum width in pixels.**\n\n' +
      'Prevents the media width from shrinking beyond a certain point inside the mask.\n\n' +
      'Example: `700`',
    table: {
      category: 'Properties',
      type: { summary: 'number' }
    }
  },
  minHeight: {
    name: 'minHeight',
    description: '' +
      '**Media minimum height in pixels.**\n\n' +
      'Prevents the media height from shrinking beyond a certain point inside the mask.\n\n' +
      'Example: `700`',
    table: {
      category: 'Properties',
      type: { summary: 'number' }
    }
  }
};

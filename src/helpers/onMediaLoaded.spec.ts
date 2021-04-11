import onMediaLoaded from './onMediaLoaded';

describe('onMediaLoaded', () => {
  it('should listen for load event if media is an image', () => {
    const mediaElement = {
      nodeName: 'IMG',
      addEventListener: jest.fn()
    } as unknown as HTMLImageElement;

    const callback = jest.fn();

    onMediaLoaded(mediaElement, callback);

    expect(mediaElement.addEventListener)
      .toHaveBeenCalledWith('load', callback);
  });

  it('should listen for loadedmetadata event if media is a video', () => {
    const mediaElement = {
      nodeName: 'VIDEO',
      addEventListener: jest.fn()
    } as unknown as HTMLImageElement;

    const callback = jest.fn();

    onMediaLoaded(mediaElement, callback);

    expect(mediaElement.addEventListener)
      .toHaveBeenCalledWith('loadedmetadata', callback);
  });
});

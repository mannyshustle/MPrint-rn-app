describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });


  it('should have welcome screen', async () => {
    await expect(element(by.id('welcome'))).toBeVisible();
  });

  it('should tap on button by id and expect some text to be visible', async () => {
    await element(by.id('toggleLight')).tap();
    await expect(element(by.text('The button has been pressed'))).toBeVisible();
  });
});
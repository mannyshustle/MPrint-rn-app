import {CloudinaryCred, getCloudinaryUploadScript} from 'lib_cloud';

export const hideElements = () => {
  const selectors = [
    '[data-testid="backButton"]',
    '[data-testid="saveButton"]',
    '[data-analyticsid="shutterstock-editor-open"]',
    '[data-analyticsid="addDropboxLayerButton"]',
    '[data-analyticsid=" addGDriveLayerButton"]',
    '[data-analyticsid="gsc-1590-fiverr"]',
    '[data-analyticsid="newDesignTab"]',
    '[data-analyticsid="artLibraryTab"]',
    '[data-analyticsid="userDesignTemplatesTab"]',
    '[data-analyticsid="freeGraphicsTab"]',
    //TODO: Add this for phase 2. User can add multiple pictures
    '[data-analyticsid="addArtButton"]',

    '.save-button',
    '.cost-and-variants-table-link-wrapper',
    '.product-option-container',
  ];

  const hideElementsCSS = `
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = '[data-testid="addDesignButton"] { display: none !important; }';
  style.innerHTML = '${selectors.join(', ')} { display: none !important; }';
  document.head.appendChild(style);
`;

  return `setTimeout(function() { ${hideElementsCSS} }, 0); true;`;
};

export const getInitialInjectJavascript = (cloudinaryCred: CloudinaryCred) => `
${hideElements()}
${getCloudinaryUploadScript(cloudinaryCred)}
true;
`;

const getReturnMessage = (key: string, message?: string) => {
  return `window.ReactNativeWebView.postMessage(JSON.stringify({
    key: "${key}", message: "${message}"
  }));
  `;
};

export const beforeDesignAddedScript = `
var buttons = document.querySelectorAll('[data-testid="button"]');
var optionsButton = Array.from(buttons).find(button => button.textContent.includes('Options'));
if (optionsButton) {
  optionsButton.click();
  ${getReturnMessage('optionsPresent')}
} else {
  ${getReturnMessage('optionsNotPresent')}
}
true;
`;

export const afterDesignAddedScript = `
function toCamelCase(str) {
  return str
      .split(' ')
      .map((word, index) => {
          if (index == 0) {
              return word.toLowerCase();
          } else {
              return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          }
      })
      .join('');
}
var closeButton = document.querySelectorAll('[data-testid="closeButton"]');
if (closeButton && closeButton.length > 0) {
  // options popup is up so we collect the options details along with the html to extract the upladed image
  var currentHtml = document.documentElement.outerHTML;

  var config = {html: currentHtml};
  var containers = document.querySelectorAll('.config-wrapper .input-container');
  containers.forEach(container => {
    var label = container.querySelector('label')?.innerText || 'Unknown';
    var key = toCamelCase(label)
    var input = container.querySelector('input');
    var value = input ? input.value : '';
    config[key] = value;
  });

  window.ReactNativeWebView.postMessage(JSON.stringify({
    key: "optionsAndDesignImage", message: config
  }));
  closeButton[0].click(); // Click the close button
}

var previewSection = document.querySelector('.preview-content');
if (previewSection){
  var currentHtml = document.documentElement.outerHTML;
  window.ReactNativeWebView.postMessage(JSON.stringify({
    key: "previewImages", message: currentHtml
  }));
}
else{
  // Additional logic to click the 'Preview' button
  var buttons = document.querySelectorAll('[data-testid="button"]');
  var previewButton = Array.from(buttons).find(button => button.textContent.includes('Preview'));
  if (previewButton) {
    previewButton.click();
  }
}
true;
`;

export const saveImagesToCDN = (
  images: string[],
  cloudinaryUploadScript: string,
) => `
${getReturnMessage('loading', 'Saving Images')}
${cloudinaryUploadScript}
  uploadImagesToCloudinary(${JSON.stringify(images)})
    .then(urls => {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          key: 'imagesPushedToCDN',
          message: urls,
        }),
      );
    }).catch(err => {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          key: 'error',
          message: err,
        }),
      );
    });
    true;
`;

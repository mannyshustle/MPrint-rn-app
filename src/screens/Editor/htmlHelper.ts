import {CloudinaryCred} from 'lib_cloud';

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

    '.loader-container',
    '.save-button',
    '.cost-and-variants-table-link-wrapper',
    '.product-option-container',
  ];

  const hideElementsCSS = `
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = \`
    ${selectors.join(', ')} { display: none !important; }
    [data-testid="addDesignButton"] button { 
      background-color: #2E72D2 !important; // New background color
      color: white !important; // New text color
    }
  \`;
  document.head.appendChild(style);
`;

  return `
  ${processEditorResultsUtility}
  setTimeout(function() { ${hideElementsCSS} }, 0); true;
  // We know the editor is loaded when we see the Add your Design button
  waitForElement('[data-testid="addDesignButton"] button', function(addDesignButton) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        key: 'editorLoaded',
      })
    );
  });  
  `;
};

const processEditorResultsUtility = `
function toCamelCase(str) {
  // Converts string to camelCase
  return str.replace(/(?:^\\w|[A-Z]|\\b\\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\\s+/g, '');
}

function clickButtonByTestId(testId) {
  // Clicks a button based on data-testid
  const button = document.querySelector(\`[data-testid="\${testId}"] button\`);
  if (button) {
    button.click();
  }
}

function waitForElement(selector, callback) {
  // Waits for an element to appear in the DOM
  const element = document.querySelector(selector);
  
  if (element) {
    callback(element);
  } else {  
    const observer = new MutationObserver(function(mutations, obs) {
      const element = document.querySelector(selector);
      if (element) {
        callback(element);
        obs.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
}

function clickAndExtractPreviewMainImages(buttons, index) {
  if (index >= buttons.length) {
    uploadProcessedImages(globalData)
    return;
  }
  if (buttons[index]) {
    buttons[index].click();
    waitForElement('.wrap img', function(mainImage) {
      const img = buttons[index].querySelector('img');
      if (img && img.src) {
        globalData.printifyPreviewImagesSmall.push(img.src);
      }
      globalData.printifyPreviewImages.push(mainImage?.src);
      clickAndExtractPreviewMainImages(buttons, index + 1);
    });
  } else {
    clickAndExtractPreviewMainImages(buttons, index + 1);
  }
}

function extractPreviewImages() {
  const previewContent = document.querySelector('.preview-content');
  const previewButtons = previewContent.querySelectorAll('button[data-testid="cameraItem"]')

  clickAndExtractPreviewMainImages(Array.from(previewButtons), 0);
}

`;

const processEditorResultsPreviewImages = `

waitForElement('[data-testid="imageLayerLeftCol"]', function(imageLayer) {
  globalData.printifyMainImage = imageLayer.querySelector('img')?.src || '';
  var containers = document.querySelectorAll('.config-wrapper .input-container');
  containers.forEach(container => {
    var label = container.querySelector('label')?.innerText || 'Unknown';
    var key = toCamelCase(label);
    var input = container.querySelector('input');
    var value = input ? input.value : '';
    globalData.config[key] = value;
  });

  clickButtonByTestId('previewTab'); 
  waitForElement('.preview-content', extractPreviewImages);
});
`;

export const getCloudinaryUploadScript = (cloudinaryCred: CloudinaryCred) => `
function uploadImagesToCloudinary(imageUrls, shopId, orderId) {
  return Promise.all(imageUrls.map(async (imageUrl, index) => {
    const fileName = orderId+ '_' + index

    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const file = new File([blob], fileName + ".png", { type: "image/png" });
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', '${cloudinaryCred.uploadPreset}');
    formData.append("public_id", fileName);
    formData.append("api_key", '${cloudinaryCred.apiKey}');

    formData.append('folder', shopId + '/' + orderId); // Specify the folder name
    return fetch('https://api.cloudinary.com/v1_1/${cloudinaryCred.cloudName}/image/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => data.secure_url) // Return the URL of the uploaded image
  }));
}
`;

const uploadProcessedImagesScript = (shopId: string, orderId: string) => `
  var uploadProcessedImages = async(processedData) => {
    try {
      const mainImage = processedData.printifyMainImage
      const previewImages = processedData.printifyPreviewImages
      processedData.uploadedMainImage = await uploadImagesToCloudinary([mainImage], '${shopId}', '${orderId}')
      processedData.uploadedPreviewImages = await uploadImagesToCloudinary(previewImages, '${shopId}', '${orderId}')
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          key: 'editorFinished',
          message: processedData,
        })
      );
    }
    catch(err) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          key: 'error',
          message: err,
        })
      );
    }
  }
`;

export const processEditorResults = (
  cloudinaryCred: CloudinaryCred,
  shopId: string,
  orderId: string,
) => `
  var addDesignButton = document.querySelector('[data-testid="addDesignButton"] button');
  if (addDesignButton) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        key: 'designNotAdded',
      })
    );
  } else {
  
  var globalData = {
    config: {},
    printifyMainImage: '',
    printifyPreviewImages: [],
    printifyPreviewImagesSmall: [],
    uploadedMainImage: '',
    uploadedPreviewImages: []
  };
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        key: 'loading',
      })
    );
    ${processEditorResultsPreviewImages}
    ${uploadProcessedImagesScript(shopId, orderId)}
    ${getCloudinaryUploadScript(cloudinaryCred)}
    clickButtonByTestId('editTab')
    clickButtonByTestId('optionsButtonMobile')
  }
  true;
`;

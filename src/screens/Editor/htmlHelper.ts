export const hideElements = `
var buttons = document.querySelectorAll('[data-testid="button"]');
var saveProductButton = Array.from(buttons).find(button => button.textContent.includes('Save product'));
var costAndVariantsWrapper = document.querySelector('.cost-and-variants-table-link-wrapper');
var sizeWrapper = document.querySelector('.product-option-container');

if (saveProductButton && saveProductButton.parentNode) {
  saveProductButton.parentNode.removeChild(saveProductButton);
}

if (costAndVariantsWrapper) {
  costAndVariantsWrapper.style.display = 'none';
}

if (sizeWrapper) {
    sizeWrapper.style.display = 'none';
}
`;

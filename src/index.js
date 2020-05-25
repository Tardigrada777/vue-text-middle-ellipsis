/**
 * Creates empty <span>.
 * @returns {HTMLSpanElement}
 */
const createEmptySpan = () => document.createElement('span');

/**
 * Gets the real physical width of chars sequence.
 *
 * @param chars       Sequence of chars.
 * @returns {number}  Real physical width of chars sequence.
 */
const getActualWidthOfChars = (chars) => {
  const span = createEmptySpan();
  span.innerText = chars;
  span.style.position = 'fixed';
  span.style.top = '-777px';
  document.body.appendChild(span);
  const { width } = span.getBoundingClientRect();
  document.body.removeChild(span);
  return width;
}

/**
 * Gets the real physical width of space symbol.
 *
 * @param textWithSpaces   string, that contains space symbol.
 * @returns {number}       Real physical width of space symbol.
 */
const getActualWidthOfSpace = (textWithSpaces) => {
  const spaceIndex = textWithSpaces.search(' ');
  const widthUpToSpace = getActualWidthOfChars(textWithSpaces.slice(0, spaceIndex));
  const widthAfterToSpace = getActualWidthOfChars(textWithSpaces.slice(0, spaceIndex + 2));
  return widthAfterToSpace - widthUpToSpace;
}

/**
 * Gets actual width of element with checking on boxSizing strategy.
 *
 * @param el          HTML element.
 * @returns {number}  Real physical width of the Element.
 */
const getActualElementWidth = (el) => {
  const BORDER_BOX = 'border-box';
  const { boxSizing, borderWidth } = window.getComputedStyle(el);
  const { width } = el.getBoundingClientRect();
  return (parseInt(borderWidth) > 0 && boxSizing !== BORDER_BOX) ? width - parseInt(borderWidth) * 2 : width;
}

/**
 * Cuts the text of element and insert SEPARATOR(...) in the middle.
 *
 * @param el        HTMLElement with text content.
 * @param value     Value passed to vue-directive.
 */
const zipText = (el, { value }) => {
  const text = el.getAttribute('data-middle-ellipsis-original');
  const parentWidth = getActualElementWidth(el);
  const realWidth = getActualWidthOfChars(text);
  const SPACE_WIDTH = getActualWidthOfSpace(text);

  if (parentWidth < realWidth) {
    const endOffset = +value;
    const SEPARATOR = '...';
    const SPACE = ' ';
    const rightPart = text.slice(text.length - endOffset);
    const rightPartWidth = getActualWidthOfChars(SEPARATOR) + getActualWidthOfChars(rightPart);

    let availableLeftWidth = Math.round(parentWidth - rightPartWidth);
    let final = '';
    let charIndex = 0;
    while (availableLeftWidth > 0) {
      const char = text[charIndex];

      let charWidth = getActualWidthOfChars(char);

      if (char === SPACE) {
        charWidth = SPACE_WIDTH;
      }

      if (availableLeftWidth - charWidth < 0) {
        break;
      }

      final += char;
      availableLeftWidth -= charWidth;
      charIndex += 1;
    }
    final += `${SEPARATOR}${rightPart}`;
    el.innerText = final;
  }
  else {
    el.innerText = text;
  }
}

export default {
  install(Vue, options) {
    Vue.directive('text-middle-ellipsis', {
      bind: (el) => {
        const originalText = el.innerText;
        el.setAttribute('data-middle-ellipsis-original', originalText.trim());
      },
      inserted: zipText,
      update: zipText
    });
  }
}

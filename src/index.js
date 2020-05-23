const createEmptySpan = () => document.createElement('span');

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

const getActualWidthOfSpace = (textWithSpaces) => {
  const spaceIndex = textWithSpaces.search(' ');
  const widthUpToSpace = getActualWidthOfChars(textWithSpaces.slice(0, spaceIndex));
  const widthAfterToSpace = getActualWidthOfChars(textWithSpaces.slice(0, spaceIndex + 2));
  return widthAfterToSpace - widthUpToSpace;
}

const zipText = (el, binding) => {
  const text = el.getAttribute('data-middle-ellipsis-original');
  const parentWidth = el.getBoundingClientRect().width;
  const realWidth = getActualWidthOfChars(text);
  const SPACE_WIDTH = getActualWidthOfSpace(text);

  if (parentWidth < realWidth) {
    const endOffset = +binding.value;
    const separator = '...';
    const rightPart = text.slice(text.length - endOffset);
    const rightPartWidth = getActualWidthOfChars(separator) + getActualWidthOfChars(rightPart);

    let availableLeftWidth = Math.ceil(parentWidth - rightPartWidth);
    let final = '';
    let charIndex = 0;
    while (availableLeftWidth > 0) {
      const char = text[charIndex];

      let charWidth = getActualWidthOfChars(char);

      if (char === ' ') {
        charWidth = SPACE_WIDTH;
      }

      if (availableLeftWidth - charWidth < 0) {
        break;
      }

      final += char;
      availableLeftWidth -= charWidth;
      charIndex += 1;
    }
    final += `${separator}${rightPart}`;
    el.innerText = final;
  } else {
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

## Vue Text Middle Ellipsis

A Simple vue-directive for the text middle ellipsis.

### Install
```bash
npm install vue-text-middle-ellipsis --save # or yarn add vue-text-middle-ellipsis
```

```javascript
import Vue from 'vue';
import textMiddleEllipsis from 'vue-text-middle-ellipsis';

Vue.use(textMiddleEllipsis);
```

### Usage
```html
<p v-text-middle-ellipsis="4">Some long text.</p>
```
__Result__: 'Some...ext.'

The value passed to the directive - is the count of symbols that you are want to preserve from truncate.

### Live example
<img width="493" height="350" src="https://raw.githubusercontent.com/Tardigrada777/vue-text-middle-ellipsis/master/docs/text-middle-ellipsis-example.gif">

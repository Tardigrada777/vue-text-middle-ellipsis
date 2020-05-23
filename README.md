## Vue Text Middle Ellipsis

[![npm version](https://img.shields.io/npm/v/vue-text-middle-ellipsis.svg)](https://www.npmjs.com/package/vue-text-middle-ellipsis)
[![npm downloads](https://img.shields.io/npm/dm/vue-text-middle-ellipsis.svg)](http://npm-stat.com/charts.html?package=vue-text-middle-ellipsis)

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
The value passed to the directive - is the count of symbols that you are want to preserve from truncate.
### Result
'Some...ext.'


### Live example
<img width="493" height="350" src="https://raw.githubusercontent.com/Tardigrada777/vue-text-middle-ellipsis/master/docs/text-middle-ellipsis-example.gif">

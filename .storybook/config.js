import { configure } from '@storybook/vue'

import Vue from 'vue';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Element);
// automatically import all files ending in *.stories.js
const req = require.context('../src/stories', true, /.stories.ts$/);
function loadStories() {
  // require('../src/stories/index.ts')
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module)
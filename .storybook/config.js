import { configure } from '@storybook/vue'

// automatically import all files ending in *.stories.js
const req = require.context('../src/stories', true, /.stories.ts$/);
function loadStories() {
  require('../src/stories/index.ts')
}

configure(loadStories, module)
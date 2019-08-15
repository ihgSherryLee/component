import Vue from 'vue';
import { storiesOf } from '@storybook/vue';
import allSelect from '../components/allSelect.vue';

const list = [
  {
    label: '1',
    value: 1,
  },
  {
    label: '2',
    value: 2,
  },
  {
    label: '3',
    value: 3,
  },
  {
    label: '4',
    value: 4,
  },
];
const value = [1];

storiesOf('AllSelect', module)
  .add('none select', () => ({
    components: { allSelect },
    template: '<all-select :value=\'value\' :option-list=\'list\' @change=\'(val) => value=val\' /> ',
    data() {
      return {
        list,
        value: [],
      };
    },
  }))
  .add('all select', () => ({
    components: { allSelect },
    data() {
      return {
        list,
        value: [1, 2, 3, 4],
      };
    },
    template: `<all-select :value=\'value\' :option-list=\'list\' @change=\'(val) => value=val\' /> `,
  }));

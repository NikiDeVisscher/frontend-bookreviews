import { helper } from '@ember/component/helper';

export default helper(function isNotLast([index, array]) {
  return index < array.length - 1;
});

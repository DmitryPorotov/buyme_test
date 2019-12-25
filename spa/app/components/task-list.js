import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  finishedCount: computed('model.@each.finished', function () {
    return this.get('model').filterBy('finished', true).length;
  }),
  unfinishedCount: computed('model.@each.finished', function () {
    return this.get('model').filterBy('finished', false).length;
  }),
  actions: {
    toggleIsFinished(task,f) {
      this.get('toggleIsFinished')(task,f)
    },
    editName(task,name) {
      this.get('editName')(task,name);
    },
    addTask() {
      this.get('addTask')();
    },
    deleteTask(task) {
      this.get('deleteTask')(task);
    }
  }
});

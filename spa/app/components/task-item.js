import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'li',
  isEditing: false,
  isFinished: computed('task.finished', function () {
    return !!this.get('task.finished');
  }),
  classNameBindings: ['isFinished:finished:unfinished'],
  endEditingAlreadyHandled: false,
  myIndex: computed('index', function () {
    return this.get('index') + 1;
  }),
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('isEditing', this.get('task.isNew'));
  },
  didRender() {
    this.$('.task-name-editor').focus()
  },
  actions: {
    checkboxClick(evt) {
      this.get('toggleIsFinished')(this.get('task'), evt.target.checked);
    },
    startEditing() {
      this.set('isEditing', true);
      this.set('endEditingAlreadyHandled', false);
    },
    endEditing(evt) {
      if(evt.keyCode === 13
        || evt.type === 'blur'
      ) {
        if (this.get('endEditingAlreadyHandled')) {
          return;
        } else {
          this.set('endEditingAlreadyHandled', true);
        }
        if (evt.target.value.trim()) {
          this.set('isEditing', false);
          this.get('editName')(this.get('task'), evt.target.value);
        }
        else {
          if(this.get('task.isNew')) {
            this.get('task').deleteRecord();
          } else {
            alert('שם לא יכול להיות ריק!');
          }
        }
      }
    },
    deleteTask() {
      this.get('deleteTask')(this.get('task'));
    }
  }
});

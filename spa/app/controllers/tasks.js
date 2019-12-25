import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    toggleIsFinished(task, finished) {
      task.set('finished', finished);
      task.save().then((t2) => {
          //TODO I've no idea why this does not re-render
      });
    },
    editName(task, name) {
      task.set('name', name);
      task.save();
    },
    addTask() {
      this.get('store').createRecord('task', {
        name:'',
        finished: false
      });
    },
    deleteTask(task) {
      task.deleteRecord();
      task.save();
    }
  }
});

const bus = require('../bus');

const ListModel = require('./model');
const ItemModel = require('../item/model');

bus.on('model-update', function (doc) {
  if (doc instanceof ItemModel) {
    ListModel
      .findById(doc.listId)
      .then((list) => {
        if (list) {
          list.markModified('items');
          list.save();
        }
      })
      .catch((err) => {
        console.error('Error updating list on item update:', err);
      });
  }
});

bus.on('model-delete', function (doc) {
  if (doc instanceof ItemModel) {
    ListModel
      .findById(doc.listId)
      .then((list) => {
        if (list) {
          list.markModified('items');
          list.save();
        }
      })
      .catch((err) => {
        console.error('Error updating list on item delete:', err);
      });
  }
});

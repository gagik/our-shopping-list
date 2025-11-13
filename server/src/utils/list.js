const BoardModel = require('../board/model');
const ListModel = require('../list/model');
const {VITE_APP_SINGLEBOARD_ID} = require("../config");

module.exports = {
  /**
   * @param {Array|String} listIds
   * @param {String} boardSlug
   * @returns {Promise<Query<UpdateResult, any, {}, any>>}
   */
  async moveToBoard(listIds, boardSlug) {
    if (listIds === '*') {
      // Use projection to only get _id field to reduce memory usage
      listIds = (await ListModel.find({}, '_id').lean().exec())
        .map(list => list._id);
    }
    if (!boardSlug) {
      throw new Error('Missing board slug.');
    }

    const board = await BoardModel.findOne({slug: boardSlug}).lean().exec();
    if (!board) {
      throw new Error('Invalid board slug.');
    }

    const targeListIds = (await ListModel.find({_id: {$in: listIds}}, '_id').lean().exec())
      .map((l) => l._id);

    return ListModel.updateMany(
      {_id: {$in: targeListIds}},
      {boardId: board._id}
    );
  }
}

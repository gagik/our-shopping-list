const mongoose = require('mongoose');

async function createSampleData() {
  try {
    await mongoose.connect('mongodb://localhost:27017/osl');
    
    const BoardModel = require('./src/board/model');
    const ListModel = require('./src/list/model');
    const ItemModel = require('./src/item/model');
    
    // Create sample boards
    const board1 = new BoardModel({ slug: 'test-board-1', name: 'Test Board 1' });
    await board1.save();
    
    const board2 = new BoardModel({ slug: 'test-board-2', name: 'Test Board 2' });
    await board2.save();
    
    // Create sample lists
    const list1 = new ListModel({ name: 'Groceries', boardId: board1._id });
    await list1.save();
    
    const list2 = new ListModel({ name: 'Hardware', boardId: board1._id });
    await list2.save();
    
    const list3 = new ListModel({ name: 'Office Supplies', boardId: board2._id });
    await list3.save();
    
    // Create sample items
    for (let i = 1; i <= 20; i++) {
      const item = new ItemModel({ 
        name: `Item ${i}`, 
        listId: i % 3 === 0 ? list3._id : (i % 2 === 0 ? list2._id : list1._id),
        qty: Math.floor(Math.random() * 5) + 1,
        checked: i % 4 === 0
      });
      await item.save();
    }
    
    console.log('Sample data created successfully');
    console.log(`Boards: ${await BoardModel.countDocuments()}`);
    console.log(`Lists: ${await ListModel.countDocuments()}`);
    console.log(`Items: ${await ItemModel.countDocuments()}`);
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error creating sample data:', error);
    process.exit(1);
  }
}

createSampleData();

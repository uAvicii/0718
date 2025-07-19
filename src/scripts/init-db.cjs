// CommonJS 版本的初始化脚本
const { createMemoriesTable } = require('../lib/db.cjs');

async function initializeDatabase() {
  try {
    console.log('开始初始化数据库...');

    // 创建记忆表
    await createMemoriesTable();

    console.log('数据库初始化完成！');
    process.exit(0);
  } catch (error) {
    console.error('数据库初始化失败:', error);
    process.exit(1);
  }
}

// 运行初始化函数
initializeDatabase(); 
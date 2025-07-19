// 初始化 Edge Config 脚本
const { createClient } = require('@vercel/edge-config');

async function initializeEdgeConfig() {
  try {
    console.log('开始初始化 Edge Config...');

    // 检查环境变量
    if (!process.env.EDGE_CONFIG) {
      throw new Error('缺少 EDGE_CONFIG 环境变量');
    }

    // 创建客户端
    const edgeConfig = createClient(process.env.EDGE_CONFIG);

    // 初始化记忆存储
    const exists = await edgeConfig.has('memories');
    if (!exists) {
      await edgeConfig.set('memories', []);
      console.log('记忆存储初始化成功');
    } else {
      console.log('记忆存储已存在');
    }

    // 初始化其他配置
    await edgeConfig.set('app_settings', {
      theme: 'light',
      language: 'zh-CN',
      itemsPerPage: 10,
      lastUpdated: new Date().toISOString()
    });

    console.log('Edge Config 初始化完成！');
    process.exit(0);
  } catch (error) {
    console.error('Edge Config 初始化失败:', error);
    process.exit(1);
  }
}

// 运行初始化函数
initializeEdgeConfig(); 
# Vercel Edge Config 使用指南

本项目使用 Vercel Edge Config 作为轻量级存储解决方案。以下是设置和使用步骤。

## 什么是 Edge Config?

Edge Config 是 Vercel 提供的一种全球分布式、低延迟的键值存储服务，适合存储应用配置和小型数据集。它具有以下特点：

- 全球分布式，低延迟访问
- 支持结构化数据（JSON）
- 适合存储配置和小型数据集
- 可在 Edge Functions、Serverless Functions 和客户端使用

## 已创建的 Edge Config Store

你已经成功创建了 Edge Config Store：
- 名称: 0718-store
- 创建时间: 最近创建

## 如何使用

### 1. 初始化 Edge Config

首次使用时，需要初始化 Edge Config：

```bash
npm run init-edge-config
```

这将创建以下键：
- `memories`: 存储所有记忆数据的数组
- `app_settings`: 存储应用设置

### 2. 在代码中使用 Edge Config

本项目已经创建了以下文件来处理 Edge Config 操作：

- `src/lib/edge-config.ts` - Edge Config 基本操作
- `src/api/memories.ts` - 记忆相关的 API 函数
- `src/scripts/init-edge-config.js` - Edge Config 初始化脚本

### 3. 示例用法

```typescript
import { getMemories, addMemory } from '../api/memories';

// 获取所有记忆
async function fetchMemories() {
  const { memories, error } = await getMemories();
  if (error) {
    console.error(error);
    return;
  }
  return memories;
}

// 创建新记忆
async function createNewMemory() {
  const newMemory = {
    title: '美好的一天',
    content: '今天天气很好，我去公园散步...',
    date: new Date().toISOString().split('T')[0],
    mood: '开心',
    location: '城市公园',
    tags: ['散步', '阳光', '公园'],
    images: ['image1.jpg', 'image2.jpg']
  };
  
  const { memory, error } = await addMemory(newMemory);
  if (error) {
    console.error(error);
    return;
  }
  return memory;
}
```

## 注意事项

1. Edge Config 适合存储小型数据集（总大小限制为 1MB）
2. 如果你的数据量较大，建议考虑使用 Vercel Postgres 或其他数据库解决方案
3. Edge Config 的写入操作有频率限制，请避免频繁写入
4. 本地开发时，确保 `.env.local` 文件中包含 `EDGE_CONFIG` 环境变量

## 查看和管理 Edge Config

你可以在 Vercel 仪表板中查看和管理你的 Edge Config：

1. 登录 Vercel 账户：https://vercel.com/dashboard
2. 进入你的项目 "0718"
3. 点击左侧导航栏中的 "Storage"
4. 选择 "Edge Config" 标签页
5. 点击 "0718-store" 查看详情和进行管理 
# Vercel数据库使用指南

本项目使用Vercel Postgres作为数据库解决方案。以下是设置和使用步骤。

## 在Vercel上创建Postgres数据库

1. 登录Vercel账户并进入你的项目仪表板
2. 点击"Storage"选项卡
3. 选择"Create Database" > "Postgres"
4. 根据提示完成创建过程
5. 创建完成后，Vercel会自动将数据库连接信息添加到你的项目环境变量中

## 环境变量

Vercel会自动添加以下环境变量到你的项目：

```
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
```

这些变量在部署环境中会自动可用，无需手动设置。

## 本地开发

对于本地开发，你需要：

1. 在Vercel仪表板中找到你的数据库连接信息
2. 创建一个`.env.local`文件（已被.gitignore忽略）
3. 复制上述环境变量到`.env.local`文件并填入相应的值

## 初始化数据库

首次使用数据库时，需要初始化表结构：

```bash
# 使用ts-node运行初始化脚本
npx ts-node src/scripts/init-db.ts
```

## 数据库操作

本项目已经创建了以下文件来处理数据库操作：

- `src/lib/db.ts` - 数据库连接和基本操作
- `src/api/memories.ts` - 记忆相关的API函数
- `src/scripts/init-db.ts` - 数据库初始化脚本

## 使用示例

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
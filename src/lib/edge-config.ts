import { createClient } from '@vercel/edge-config';

// 创建 Edge Config 客户端
export const edgeConfig = createClient(process.env.EDGE_CONFIG);

// 获取所有记忆
export async function getAllMemories() {
  try {
    const memories = await edgeConfig.get('memories') as any[] || [];
    return memories;
  } catch (error) {
    console.error('获取所有记忆失败:', error);
    return [];
  }
}

// 获取单个记忆
export async function getMemoryById(id: string) {
  try {
    const memories = await getAllMemories();
    return memories.find(memory => memory.id === id);
  } catch (error) {
    console.error(`获取ID为${id}的记忆失败:`, error);
    return null;
  }
}

// 创建新记忆
export async function createMemory(memory: {
  title: string;
  content: string;
  date: Date;
  mood?: string;
  location?: string;
  tags?: string[];
  images?: string[];
}) {
  try {
    const memories = await getAllMemories();
    const newMemory = {
      id: `memory_${Date.now()}`,
      ...memory,
      date: memory.date.toISOString(),
      created_at: new Date().toISOString()
    };

    memories.push(newMemory);
    await edgeConfig.set('memories', memories);

    return newMemory;
  } catch (error) {
    console.error('创建记忆失败:', error);
    throw error;
  }
}

// 更新记忆
export async function updateMemory(
  id: string,
  memory: {
    title?: string;
    content?: string;
    date?: Date;
    mood?: string;
    location?: string;
    tags?: string[];
    images?: string[];
  }
) {
  try {
    const memories = await getAllMemories();
    const index = memories.findIndex(m => m.id === id);

    if (index === -1) {
      throw new Error(`ID为${id}的记忆不存在`);
    }

    // 更新记忆
    const updatedMemory = {
      ...memories[index],
      ...memory,
      date: memory.date ? memory.date.toISOString() : memories[index].date
    };

    memories[index] = updatedMemory;
    await edgeConfig.set('memories', memories);

    return updatedMemory;
  } catch (error) {
    console.error(`更新ID为${id}的记忆失败:`, error);
    throw error;
  }
}

// 删除记忆
export async function deleteMemory(id: string) {
  try {
    const memories = await getAllMemories();
    const filteredMemories = memories.filter(memory => memory.id !== id);

    if (filteredMemories.length === memories.length) {
      throw new Error(`ID为${id}的记忆不存在`);
    }

    await edgeConfig.set('memories', filteredMemories);
    return true;
  } catch (error) {
    console.error(`删除ID为${id}的记忆失败:`, error);
    throw error;
  }
}

// 初始化记忆存储
export async function initializeMemoriesStore() {
  try {
    const exists = await edgeConfig.has('memories');
    if (!exists) {
      await edgeConfig.set('memories', []);
      console.log('记忆存储初始化成功');
    } else {
      console.log('记忆存储已存在');
    }
    return true;
  } catch (error) {
    console.error('初始化记忆存储失败:', error);
    throw error;
  }
}

// 获取记忆统计信息
export async function getMemoryStats() {
  try {
    const memories = await getAllMemories();

    // 计算总数
    const totalCount = memories.length;

    // 按心情分组
    const moodStats = memories.reduce((acc, memory) => {
      const mood = memory.mood || '未指定';
      acc[mood] = (acc[mood] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // 按月份分组
    const monthlyStats = memories.reduce((acc, memory) => {
      const date = new Date(memory.date);
      const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      acc[yearMonth] = (acc[yearMonth] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalCount,
      moodStats,
      monthlyStats
    };
  } catch (error) {
    console.error('获取记忆统计信息失败:', error);
    throw error;
  }
} 
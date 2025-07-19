import { getAllMemories, getMemoryById, createMemory, updateMemory, deleteMemory } from '../lib/db';

// 获取所有记忆
export async function getMemories() {
  try {
    const memories = await getAllMemories();
    return { memories, error: null };
  } catch (error) {
    console.error('获取记忆列表失败:', error);
    return { memories: [], error: '获取记忆列表失败' };
  }
}

// 获取单个记忆
export async function getMemory(id: number) {
  try {
    const memory = await getMemoryById(id);
    if (!memory) {
      return { memory: null, error: '记忆不存在' };
    }
    return { memory, error: null };
  } catch (error) {
    console.error(`获取记忆ID=${id}失败:`, error);
    return { memory: null, error: '获取记忆详情失败' };
  }
}

// 创建新记忆
export async function addMemory(data: {
  title: string;
  content: string;
  date: string;
  mood?: string;
  location?: string;
  tags?: string[];
  images?: string[];
}) {
  try {
    const { title, content, date, mood, location, tags, images } = data;

    // 验证必填字段
    if (!title || !content || !date) {
      return { memory: null, error: '标题、内容和日期为必填项' };
    }

    const newMemory = await createMemory({
      title,
      content,
      date: new Date(date),
      mood,
      location,
      tags,
      images
    });

    return { memory: newMemory, error: null };
  } catch (error) {
    console.error('创建记忆失败:', error);
    return { memory: null, error: '创建记忆失败' };
  }
}

// 更新记忆
export async function editMemory(id: number, data: {
  title?: string;
  content?: string;
  date?: string;
  mood?: string;
  location?: string;
  tags?: string[];
  images?: string[];
}) {
  try {
    const { title, content, date, mood, location, tags, images } = data;

    // 检查记忆是否存在
    const existingMemory = await getMemoryById(id);
    if (!existingMemory) {
      return { memory: null, error: '记忆不存在' };
    }

    const updatedMemory = await updateMemory(id, {
      title,
      content,
      date: date ? new Date(date) : undefined,
      mood,
      location,
      tags,
      images
    });

    return { memory: updatedMemory, error: null };
  } catch (error) {
    console.error(`更新记忆ID=${id}失败:`, error);
    return { memory: null, error: '更新记忆失败' };
  }
}

// 删除记忆
export async function removeMemory(id: number) {
  try {
    // 检查记忆是否存在
    const existingMemory = await getMemoryById(id);
    if (!existingMemory) {
      return { success: false, error: '记忆不存在' };
    }

    await deleteMemory(id);
    return { success: true, error: null };
  } catch (error) {
    console.error(`删除记忆ID=${id}失败:`, error);
    return { success: false, error: '删除记忆失败' };
  }
} 
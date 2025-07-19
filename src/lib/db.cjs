// CommonJS 版本的数据库操作
const { sql } = require('@vercel/postgres');

async function executeQuery(query, params = []) {
  try {
    const result = await sql.query(query, params);
    return result;
  } catch (error) {
    console.error('数据库查询错误:', error);
    throw error;
  }
}

// 记忆相关的数据库操作
async function createMemoriesTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS memories (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        date DATE NOT NULL,
        mood VARCHAR(50),
        location VARCHAR(255),
        tags TEXT[],
        images TEXT[],
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('记忆表创建成功');
  } catch (error) {
    console.error('创建记忆表失败:', error);
    throw error;
  }
}

async function getAllMemories() {
  try {
    const result = await sql`SELECT * FROM memories ORDER BY date DESC`;
    return result.rows;
  } catch (error) {
    console.error('获取所有记忆失败:', error);
    throw error;
  }
}

async function getMemoryById(id) {
  try {
    const result = await sql`SELECT * FROM memories WHERE id = ${id}`;
    return result.rows[0];
  } catch (error) {
    console.error(`获取ID为${id}的记忆失败:`, error);
    throw error;
  }
}

async function createMemory(memory) {
  try {
    const { title, content, date, mood, location, tags, images } = memory;
    const formattedDate = date.toISOString().split('T')[0]; // 转换为YYYY-MM-DD格式
    // 使用JSON.stringify处理数组
    const tagsJson = tags ? JSON.stringify(tags) : '[]';
    const imagesJson = images ? JSON.stringify(images) : '[]';

    const result = await sql`
      INSERT INTO memories (title, content, date, mood, location, tags, images)
      VALUES (${title}, ${content}, ${formattedDate}, ${mood}, ${location}, ${tagsJson}::text[], ${imagesJson}::text[])
      RETURNING *
    `;
    return result.rows[0];
  } catch (error) {
    console.error('创建记忆失败:', error);
    throw error;
  }
}

async function updateMemory(id, memory) {
  try {
    const { title, content, date, mood, location, tags, images } = memory;

    // 构建动态更新查询
    let updates = [];
    let params = [];
    let paramIndex = 1;

    if (title !== undefined) {
      updates.push(`title = $${paramIndex++}`);
      params.push(title);
    }
    if (content !== undefined) {
      updates.push(`content = $${paramIndex++}`);
      params.push(content);
    }
    if (date !== undefined) {
      updates.push(`date = $${paramIndex++}`);
      const formattedDate = date.toISOString().split('T')[0];
      params.push(formattedDate);
    }
    if (mood !== undefined) {
      updates.push(`mood = $${paramIndex++}`);
      params.push(mood);
    }
    if (location !== undefined) {
      updates.push(`location = $${paramIndex++}`);
      params.push(location);
    }
    if (tags !== undefined) {
      updates.push(`tags = $${paramIndex++}`);
      const tagsJson = JSON.stringify(tags);
      params.push(tagsJson);
    }
    if (images !== undefined) {
      updates.push(`images = $${paramIndex++}`);
      const imagesJson = JSON.stringify(images);
      params.push(imagesJson);
    }

    params.push(id);

    if (updates.length === 0) {
      return await getMemoryById(id);
    }

    const updateQuery = `
      UPDATE memories
      SET ${updates.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING *
    `;

    const result = await executeQuery(updateQuery, params);
    return result.rows[0];
  } catch (error) {
    console.error(`更新ID为${id}的记忆失败:`, error);
    throw error;
  }
}

async function deleteMemory(id) {
  try {
    await sql`DELETE FROM memories WHERE id = ${id}`;
    return true;
  } catch (error) {
    console.error(`删除ID为${id}的记忆失败:`, error);
    throw error;
  }
}

// 统计相关的查询
async function getMemoryStats() {
  try {
    const totalCount = await sql`SELECT COUNT(*) FROM memories`;
    const moodStats = await sql`
      SELECT mood, COUNT(*) as count 
      FROM memories 
      WHERE mood IS NOT NULL 
      GROUP BY mood
    `;
    const monthlyStats = await sql`
      SELECT 
        EXTRACT(YEAR FROM date) as year,
        EXTRACT(MONTH FROM date) as month,
        COUNT(*) as count
      FROM memories
      GROUP BY EXTRACT(YEAR FROM date), EXTRACT(MONTH FROM date)
      ORDER BY year, month
    `;

    return {
      totalCount: totalCount.rows[0].count,
      moodStats: moodStats.rows,
      monthlyStats: monthlyStats.rows
    };
  } catch (error) {
    console.error('获取记忆统计信息失败:', error);
    throw error;
  }
}

module.exports = {
  executeQuery,
  createMemoriesTable,
  getAllMemories,
  getMemoryById,
  createMemory,
  updateMemory,
  deleteMemory,
  getMemoryStats
}; 
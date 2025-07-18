import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Memory, User, Statistics } from '../types';
import { generateMockData } from '../utils/mockData';

interface MemoryContextType {
  memories: Memory[];
  user: User | null;
  statistics: Statistics;
  addMemory: (memory: Omit<Memory, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateMemory: (id: string, memory: Partial<Memory>) => void;
  deleteMemory: (id: string) => void;
  searchMemories: (query: string) => Memory[];
  filterByTag: (tag: string) => Memory[];
  filterByCategory: (category: string) => Memory[];
  filterByYear: (year: number) => Memory[];
}

const MemoryContext = createContext<MemoryContextType | undefined>(undefined);

export const useMemory = () => {
  const context = useContext(MemoryContext);
  if (!context) {
    throw new Error('useMemory must be used within a MemoryProvider');
  }
  return context;
};

interface MemoryProviderProps {
  children: ReactNode;
}

export const MemoryProvider: React.FC<MemoryProviderProps> = ({ children }) => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // 初始化模拟数据
    const { memories: mockMemories, user: mockUser } = generateMockData();
    setMemories(mockMemories);
    setUser(mockUser);
  }, []);

  const calculateStatistics = (): Statistics => {
    const stats: Statistics = {
      totalMemories: memories.length,
      totalImages: memories.reduce((acc, mem) => acc + mem.images.length, 0),
      totalTags: new Set(memories.flatMap(mem => mem.tags)).size,
      memoriesByCategory: {},
      memoriesByMood: {},
      memoriesByYear: {}
    };

    memories.forEach(memory => {
      // 按分类统计
      stats.memoriesByCategory[memory.category] = (stats.memoriesByCategory[memory.category] || 0) + 1;
      
      // 按心情统计
      if (memory.mood) {
        stats.memoriesByMood[memory.mood] = (stats.memoriesByMood[memory.mood] || 0) + 1;
      }
      
      // 按年份统计
      const year = new Date(memory.date).getFullYear();
      stats.memoriesByYear[year] = (stats.memoriesByYear[year] || 0) + 1;
    });

    return stats;
  };

  const addMemory = (memoryData: Omit<Memory, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newMemory: Memory = {
      ...memoryData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setMemories([newMemory, ...memories]);
  };

  const updateMemory = (id: string, updates: Partial<Memory>) => {
    setMemories(memories.map(mem => 
      mem.id === id ? { ...mem, ...updates, updatedAt: new Date() } : mem
    ));
  };

  const deleteMemory = (id: string) => {
    setMemories(memories.filter(mem => mem.id !== id));
  };

  const searchMemories = (query: string): Memory[] => {
    const lowercaseQuery = query.toLowerCase();
    return memories.filter(memory => 
      memory.title.toLowerCase().includes(lowercaseQuery) ||
      memory.content.toLowerCase().includes(lowercaseQuery) ||
      memory.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      memory.location?.toLowerCase().includes(lowercaseQuery) ||
      memory.people?.some(person => person.toLowerCase().includes(lowercaseQuery))
    );
  };

  const filterByTag = (tag: string): Memory[] => {
    return memories.filter(memory => memory.tags.includes(tag));
  };

  const filterByCategory = (category: string): Memory[] => {
    return memories.filter(memory => memory.category === category);
  };

  const filterByYear = (year: number): Memory[] => {
    return memories.filter(memory => new Date(memory.date).getFullYear() === year);
  };

  const value: MemoryContextType = {
    memories,
    user,
    statistics: calculateStatistics(),
    addMemory,
    updateMemory,
    deleteMemory,
    searchMemories,
    filterByTag,
    filterByCategory,
    filterByYear
  };

  return (
    <MemoryContext.Provider value={value}>
      {children}
    </MemoryContext.Provider>
  );
};
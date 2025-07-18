import { Memory, User } from '../types';

export const generateMockData = () => {
  const user: User = {
    id: '1',
    name: '张小明',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    bio: '热爱生活，记录美好。用文字和照片留住时光。',
    birthDate: new Date('1995-05-15'),
    favoriteQuote: '生活不是等待暴风雨过去，而是学会在雨中跳舞。'
  };

  const memories: Memory[] = [
    {
      id: '1',
      title: '毕业典礼的那一天',
      content: `今天是我人生中最重要的日子之一。四年的大学时光在这一刻画上了句号。

当我走上台接过毕业证书的那一刻，眼前闪过的是这四年的点点滴滴：第一次踏进宿舍时的紧张，第一次熬夜复习时的疲惫，第一次和朋友们通宵聊天时的快乐...

感谢所有陪伴我走过这段旅程的人。未来的路还很长，但我相信，带着这些美好的回忆，我一定能走得更远。`,
      date: new Date('2023-06-15'),
      tags: ['毕业', '青春', '感恩', '里程碑'],
      images: [
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
        'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800'
      ],
      location: '北京大学',
      mood: 'nostalgic',
      category: 'achievement',
      weather: '晴朗',
      people: ['李老师', '王同学', '张同学'],
      quote: '最好的时光，是回不去的时光。',
      createdAt: new Date('2023-06-16'),
      updatedAt: new Date('2023-06-16')
    },
    {
      id: '2',
      title: '第一次看极光',
      content: `凌晨三点，我裹着厚厚的羽绒服站在冰岛的旷野上。寒风刺骨，但内心却充满期待。

突然，天空中出现了一道绿色的光带，像是有人在夜空中挥舞着画笔。极光开始跳舞了！它时而像丝带般飘动，时而像瀑布般倾泻。那种震撼，无法用言语形容。

在那一刻，我感受到了大自然的神奇和自己的渺小。这是我永远不会忘记的一夜。`,
      date: new Date('2023-12-20'),
      tags: ['旅行', '极光', '冰岛', '自然奇观'],
      images: [
        'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800',
        'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800'
      ],
      location: '冰岛雷克雅未克',
      mood: 'excited',
      category: 'travel',
      weather: '寒冷晴朗',
      music: 'Hoppípolla - Sigur Rós',
      createdAt: new Date('2023-12-21'),
      updatedAt: new Date('2023-12-21')
    },
    {
      id: '3',
      title: '奶奶的生日',
      content: `今天是奶奶的80岁生日。看着她满头银发却依然精神矍铄的样子，我的眼眶有些湿润。

奶奶切生日蛋糕时，脸上洋溢着孩子般的笑容。她说，最大的幸福就是看着儿孙满堂，大家都健健康康的。

我给奶奶唱了她最爱听的老歌，她跟着哼唱，眼里闪着泪光。这一刻，我明白了什么是天伦之乐。`,
      date: new Date('2024-01-10'),
      tags: ['家人', '生日', '奶奶', '温暖'],
      images: [
        'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800'
      ],
      location: '家里',
      mood: 'grateful',
      category: 'family',
      people: ['奶奶', '爸爸', '妈妈', '妹妹'],
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10')
    },
    {
      id: '4',
      title: '第一次马拉松',
      content: `42.195公里，这个数字曾经让我望而生畏。但今天，我做到了！

最后10公里时，双腿像灌了铅一样沉重。但看到路边为我加油的陌生人，听到他们的鼓励声，我又有了继续前进的力量。

冲过终点线的那一刻，所有的疲惫都化为了成就感。这不仅是一场身体的挑战，更是一次心灵的洗礼。`,
      date: new Date('2023-10-15'),
      tags: ['运动', '马拉松', '挑战', '坚持'],
      images: [
        'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800'
      ],
      location: '北京马拉松',
      mood: 'excited',
      category: 'achievement',
      weather: '阴天',
      quote: '跑步教会我的是：坚持的过程，就是不断超越自己的过程。',
      createdAt: new Date('2023-10-16'),
      updatedAt: new Date('2023-10-16')
    },
    {
      id: '5',
      title: '樱花树下的约定',
      content: `春天的午后，我们相约在樱花树下。粉色的花瓣随风飘落，像是一场浪漫的花雨。

你说，明年樱花再开的时候，我们还要来这里。我笑着答应了。

现在回想起来，那个午后的阳光，你的笑容，还有满树的樱花，都成了我最珍贵的回忆。`,
      date: new Date('2023-04-05'),
      tags: ['春天', '樱花', '约定', '浪漫'],
      images: [
        'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800',
        'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800'
      ],
      location: '武汉大学',
      mood: 'happy',
      category: 'love',
      weather: '春日暖阳',
      people: ['小雨'],
      music: '樱花树下的约定 - 张敬轩',
      createdAt: new Date('2023-04-06'),
      updatedAt: new Date('2023-04-06')
    },
    {
      id: '6',
      title: '深夜的灵感',
      content: `凌晨两点，我突然从梦中醒来，脑海中闪现出一个绝妙的想法。

我赶紧打开电脑，手指在键盘上飞舞。这个困扰我一个月的技术难题，竟然在这个深夜找到了解决方案。

有时候，灵感就是这么奇妙，它会在你最意想不到的时候降临。`,
      date: new Date('2023-11-28'),
      tags: ['工作', '灵感', '编程', '深夜'],
      images: [],
      location: '家里',
      mood: 'excited',
      category: 'work',
      quote: '天才是1%的灵感加上99%的汗水，但那1%的灵感最重要。',
      createdAt: new Date('2023-11-28'),
      updatedAt: new Date('2023-11-28')
    },
    {
      id: '7',
      title: '雨中漫步',
      content: `下班时突然下起了大雨，没带伞的我本想等雨停，但看着雨幕中的城市，突然有了在雨中漫步的冲动。

雨水打在脸上，凉凉的，却让人感到无比清醒。路上的行人都在奔跑躲雨，只有我在慢慢地走着，享受着这份独特的宁静。

有时候，打破常规，你会发现不一样的美好。`,
      date: new Date('2023-08-20'),
      tags: ['雨天', '随性', '城市', '感悟'],
      images: [
        'https://images.unsplash.com/photo-1428592953211-077101b2021b?w=800'
      ],
      location: '上海',
      mood: 'peaceful',
      category: 'life',
      weather: '大雨',
      createdAt: new Date('2023-08-20'),
      updatedAt: new Date('2023-08-20')
    },
    {
      id: '8',
      title: '和好朋友的聚会',
      content: `时隔三年，大学宿舍的兄弟们终于又聚在了一起。

我们去了以前经常去的烧烤摊，点了同样的菜，喝着同样的啤酒。虽然大家都变了样子，有的发福了，有的成熟了，但一开口说话，还是当年那个味道。

友谊这东西真奇妙，即使很久不见，见面时依然能像从前一样无话不谈。`,
      date: new Date('2024-02-15'),
      tags: ['友谊', '聚会', '怀旧', '兄弟'],
      images: [
        'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800'
      ],
      location: '老地方烧烤',
      mood: 'happy',
      category: 'friends',
      people: ['大强', '小李', '阿杰', '老王'],
      createdAt: new Date('2024-02-16'),
      updatedAt: new Date('2024-02-16')
    }
  ];

  return { memories, user };
};
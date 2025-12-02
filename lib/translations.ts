
export type Language = 'en' | 'zh';

export const translations = {
  en: {
    app: { title: 'Cloud Go', subtitle: 'Play & Train' },
    nav: { 
      home: 'Home', 
      puzzles: 'Puzzles', 
      lobby: 'Lobby', 
      profile: 'Profile',
      records: 'Records',
      demo: 'Demo Board',
      books: 'Books'
    },
    home: {
      dailyChallenge: 'Daily Challenge',
      dailyDesc: 'Black to play and live in the corner. A classic shape that appears often in actual games.',
      yourGames: 'Your Games',
      play19: 'Play 19x19',
      homework: 'Homework',
      viewAll: 'View All',
      enterRoom: 'Enter Room',
      lastMove: 'Last move',
      ago: 'ago',
      solveDaily: 'Solve Daily',
      endsIn: 'Ends in',
      solved: 'solved',
      lifeDeath: 'Life & Death',
      demoBoard: 'Demo Board'
    },
    game: {
      pass: 'Pass',
      resign: 'Resign',
      undo: 'Undo',
      moves: 'Moves',
      chat: 'Chat',
      saySomething: 'Say something...',
      opponent: 'Opponent',
      you: 'You',
      komi: 'Komi',
      captures: 'Captures',
      gameType: { live: 'LIVE', correspondence: 'CORRESPONDENCE' }
    },
    lobby: {
      globalHall: 'Global Hall',
      online: 'Online',
      disclaimer: 'Chat history is temporary and not stored permanently.',
      placeholder: 'Type a message...'
    },
    puzzle: {
      title: 'Corner Life & Death',
      desc: 'Black to live',
      turn: 'Turn',
      black: 'Black',
      white: 'White',
      correct: 'Correct!',
      wrong: 'Wrong Move',
      next: 'Next Puzzle',
      retry: 'Try Again',
      hint: 'Hint',
      hintText: 'Look for the vital point in the "L" shape.'
    },
    demo: {
      tools: 'Tools',
      mode: 'Mode',
      alternating: 'Alternating',
      black: 'Black',
      white: 'White',
      markers: 'Markers',
      clear: 'Clear',
      reset: 'Reset',
      showNumbers: 'Show Move #',
      import: 'Import SGF'
    },
    common: { vs: 'vs', switchLang: '中文' }
  },
  zh: {
    app: { title: '云围棋', subtitle: '对弈 & 训练' },
    nav: { 
      home: '首页', 
      puzzles: '题库', 
      lobby: '大厅', 
      profile: '个人',
      records: '棋谱',
      demo: '挂盘',
      books: '棋书'
    },
    home: {
      dailyChallenge: '每日一题',
      dailyDesc: '黑先角上活棋。这是实战中常见的经典形状，保持连胜！',
      yourGames: '我的对局',
      play19: '开始对局',
      homework: '我的作业',
      viewAll: '查看全部',
      enterRoom: '进入房间',
      lastMove: '最后落子',
      ago: '前',
      solveDaily: '开始挑战',
      endsIn: '剩余时间',
      solved: '人已解答',
      lifeDeath: '死活题',
      demoBoard: '在线挂盘'
    },
    game: {
      pass: '停一手',
      resign: '认输',
      undo: '悔棋',
      moves: '棋谱',
      chat: '聊天',
      saySomething: '说点什么...',
      opponent: '对手',
      you: '我',
      komi: '贴目',
      captures: '提子',
      gameType: { live: '即时对局', correspondence: '非即时' }
    },
    lobby: {
      globalHall: '综合大厅',
      online: '在线',
      disclaimer: '聊天记录仅暂时保存，离开后自动清除。',
      placeholder: '输入消息...'
    },
    puzzle: {
      title: '角部死活',
      desc: '黑先活',
      turn: '轮次',
      black: '黑方',
      white: '白方',
      correct: '回答正确!',
      wrong: '回答错误',
      next: '下一题',
      retry: '重试',
      hint: '提示',
      hintText: '寻找板六形状的要点。'
    },
    demo: {
      tools: '工具栏',
      mode: '落子模式',
      alternating: '黑白轮流',
      black: '黑棋',
      white: '白棋',
      markers: '标记',
      clear: '清空棋盘',
      reset: '重置',
      showNumbers: '显示手数',
      import: '导入SGF'
    },
    common: { vs: 'vs', switchLang: 'English' }
  }
};

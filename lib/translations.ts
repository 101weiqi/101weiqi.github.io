export type Language = 'en' | 'zh';

export const translations = {
  en: {
    app: { title: 'iweiqi', subtitle: 'Play & Train' },
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
      tournamentRecords: 'Major Tournaments',
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
      title: 'Puzzle Library',
      desc: 'Black to live',
      turn: 'Turn',
      black: 'Black',
      white: 'White',
      correct: 'Correct!',
      wrong: 'Wrong Move',
      next: 'Next',
      retry: 'Retry',
      hint: 'Hint',
      hintText: 'Look for the vital point.',
      categories: {
        levels: 'By Rank',
        topics: 'Special Training',
        lifeDeath: 'Life & Death',
        tesuji: 'Tesuji',
        middle: 'Middle Game',
        fuseki: 'Fuseki',
        endgame: 'Endgame',
        theory: 'Theory'
      },
      solver: {
        total: 'Total',
        jumpTo: 'Jump to #',
        go: 'Go'
      }
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
    profile: {
      stats: {
        wins: 'Wins',
        losses: 'Losses',
        rankPoints: 'Rank Points',
        puzzleRating: 'Puzzle Rating',
        homework: 'Homework'
      },
      homework: {
        title: 'My Homework',
        create: 'New Homework',
        continue: 'Continue',
        completed: 'Completed',
        pending: 'Pending',
        fromBank: 'From Bank',
        fromBook: 'From Book',
        createModal: {
          title: 'Create New Homework',
          source: 'Source',
          selectBook: 'Select Book',
          selectCategories: 'Select Categories (Quantity)',
          cancel: 'Cancel',
          create: 'Create'
        }
      }
    },
    common: { vs: 'vs', switchLang: '中文' }
  },
  zh: {
    app: { title: '爱围棋', subtitle: '对弈 & 训练' },
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
      tournamentRecords: '大赛棋谱',
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
      title: '题库',
      desc: '黑先活',
      turn: '轮次',
      black: '黑方',
      white: '白方',
      correct: '回答正确!',
      wrong: '回答错误',
      next: '下一题',
      retry: '重试',
      hint: '提示',
      hintText: '寻找形状的要点。',
      categories: {
        levels: '按段位',
        topics: '专项训练',
        lifeDeath: '死活',
        tesuji: '手筋',
        middle: '中盘',
        fuseki: '布局',
        endgame: '官子',
        theory: '棋理'
      },
      solver: {
        total: '共',
        jumpTo: '跳至题号',
        go: '前往'
      }
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
    profile: {
      stats: {
        wins: '胜',
        losses: '负',
        rankPoints: '等级分',
        puzzleRating: '做题积分',
        homework: '作业完成'
      },
      homework: {
        title: '我的作业',
        create: '新建作业',
        continue: '继续',
        completed: '已完成',
        pending: '进行中',
        fromBank: '来自题库',
        fromBook: '来自棋书',
        createModal: {
          title: '新建作业',
          source: '题目来源',
          selectBook: '选择棋书',
          selectCategories: '选择分类 (数量)',
          cancel: '取消',
          create: '创建'
        }
      }
    },
    common: { vs: 'vs', switchLang: 'English' }
  }
};
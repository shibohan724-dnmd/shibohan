export type Locale = 'zh' | 'en'

export const translations = {
  zh: {
    hero: {
      line1: '把想法，',
      line2: '变成产品',
      intro:
        '专注界面与交互设计，把产品需求整理成清晰易用的页面方案。熟悉从原型到设计稿的完整流程，注重细节与落地协作。',
      scroll: '向下滚动，了解我的资料与作品',
      cta: '开始探索',
    },
    profile: {
      italic: 'About',
      title: '我的资料',
      subtitle: 'UI / UX · 移动端 · 网页界面',
      name: '施博瀚',
      role: '产品设计师',
      tagline: 'B+C 端界面 · 小程序 · 品牌官网',
      bio: '擅长把需求拆解成清晰的页面结构与视觉方案。能独立完成原型、视觉稿与基础设计规范，并与产品、开发顺畅协作推进交付。',
      skills: '专业技能',
      tools: '常用工具',
      avatarAlt: '施博瀚头像',
    },
    experience: {
      italic: 'Experience',
      title: '工作履历',
      subtitle: '从电气工程到数字产品设计，兼具严谨逻辑与界面设计实践',
      jobs: [
        {
          title: 'UI 设计师',
          period: '2024.01 – 至今',
          org: '深圳原构所科技有限公司',
          desc: '负责公司小程序、Web 平台及移动 App 的产品设计工作，独立完成从需求梳理、竞品分析、信息架构设计到交互设计、视觉设计及设计规范搭建的完整流程。具备从 0 到 1 的产品设计经验，能够平衡用户体验与业务目标，推动产品高效落地与持续迭代。',
        },
        {
          title: '电气设计师',
          period: '2020.05 – 2023.12',
          org: '广东西电动力科技股份有限公司',
          desc: '负责柴油发电机组控制系统的电气图纸设计，使用 AutoCAD 完成控制器与机组间的二次接线图设计及技术文档输出。工作过程中积累了严谨的逻辑分析能力、复杂信息梳理能力以及跨部门协作经验，为后续从事数字产品设计与用户体验设计奠定了扎实基础。',
        },
      ],
    },
    portfolio: {
      italic: 'Portfolio',
      title: '个人作品',
      subtitle: '产品与界面设计案例',
      viewCase: '查看案例',
      soon: '筹备中',
      works: [
        {
          title: 'knowee 在线课程平台',
          desc: '面向讲师与学员的在线课程平台，覆盖学习、授课、运营等 B+C 端核心流程，强调清晰的信息架构与一致的设计语言。',
          tags: ['B+C 端', 'UI/UX', '2025'],
        },
        {
          title: 'XXXX Coffee 点单小程序',
          desc: '咖啡门店点单微信小程序，聚焦选品、规格、支付与订单状态，在有限屏效下保持操作路径短、反馈明确。',
          tags: ['微信小程序', 'UI 设计', '2025'],
        },
        {
          title: 'KOVA Coffee 品牌官网',
          desc: '冷萃咖啡机品牌官网与电商页面，从品牌叙事、产品展示到订阅复购，构建完整的线上购买与会员体验。',
          tags: ['品牌官网', '电商页面', '2026'],
        },
        {
          title: '秉坤后台设计及规范',
          desc: 'PEKON 秉坤 B 端订货管理后台：设计目标、交互原则、经营看板、订单详情与组件规范，兼顾复杂业务与清晰操作体验。',
          tags: ['后台 UI', '企业系统', '2024'],
        },
      ],
    },
    aiIp: {
      italic: 'AI Practice',
      title: 'AI 生成 IP 案例',
      subtitle: '借助 AI 完成角色气质、姿态延展与品牌叙事，探索可落地的 IP 设计练习',
      tools: ['即梦', 'ChatGPT', 'Photoshop', 'Figma'],
      showcases: [
        {
          name: 'Coffy · 咖啡人',
          lead:
            '「Coffy」是我用 AI 完成的咖啡品牌 IP 练习：以咖啡杯为原型，从角色气质、三视图到工牌、杯套、胶带等周边物料，整理成可展示的 IP 全案版面。',
          highlights: [
            {
              label: '01',
              title: '角色设定与气质',
              body: '可爱、亲和的咖啡杯形象，统一配色与材质，让 IP 一眼可识别。',
            },
            {
              label: '02',
              title: '多角度与表情',
              body: '正视、侧视、背视及多种表情，造型比例与风格稳定，便于后续延展。',
            },
            {
              label: '03',
              title: '周边物料延展',
              body: '工牌、徽章、杯套、胶带、立牌等场景应用，形成完整品牌触点。',
            },
          ],
          imageAlt: 'Coffy 咖啡人 IP 全案',
          captions: ['主形象与品牌命名', '正视图 · 多角度与表情', '系列周边应用物料'],
        },
        {
          name: 'Slowy · 咖啡树懒',
          lead:
            '「Slowy」是一只头顶咖啡杯、浑身带着咖啡香气的小树懒。它不急着赶路，却总在帮人拾起生活里那些被轻轻错过的幸福——漂在水面放空、窝在云朵上小睡、捧杯吸一口热气的片刻。',
          highlights: [
            {
              label: '01',
              title: '松弛感与 Chill 气质',
              body: '毛绒柔软、表情丰富，漂在水面、躺云休息，自带年轻人认同的慢生活姿态。',
            },
            {
              label: '02',
              title: '情绪共鸣',
              body: '慢一点也没关系，不必时刻高效也值得被喜欢；咖啡是给自己留出时间的仪式。',
            },
            {
              label: '03',
              title: '名字 · Slowy',
              body: 'Sloth + Slow：总是慢半拍，却从不迟到属于自己的那份幸福。',
            },
          ],
          imageAlt: 'Slowy 咖啡树懒 IP 多角度展示',
          captions: ['站姿多角度', '喝咖啡 · Sloffee', '云朵躺平 · 泡澡 · 游戏'],
        },
        {
          name: 'BOX RABBIT · 纸箱兔',
          lead:
            '「BOX RABBIT」是一只坐在棕色纸箱里的灰色毛绒兔子——纸箱是家的符号，也是品牌命名的视觉锚点。借助 AI 完成多视角 3D 定妆、漫画分镜与「BOX」「RABBIT」动感字标，探索潮玩 IP 的可识别性与延展性。',
          highlights: [
            {
              label: '01',
              title: '纸箱即角色符号',
              body: '兔子与纸箱一体，「盒子 + 兔子」写进名字，记忆点集中、便于周边与陈列延展。',
            },
            {
              label: '02',
              title: '毛绒潮玩质感',
              body: '灰毛绒、短耳、圆眼与蓬松尾巴，3D 定妆具备实体潮玩的可触摸感与收藏感。',
            },
            {
              label: '03',
              title: '漫画字标延展',
              body: '黑白分镜拆出「BOX」「RABBIT」动感字标，兼顾陈列级精致与社交媒体传播活力。',
            },
          ],
          imageAlt: 'BOX RABBIT 潮玩 IP 全案展示',
          captions: ['多视角 3D 定妆', '漫画分镜 · 动感字标', '正背面 · 陈列参考'],
        },
      ],
    },
    footer: {
      connectTitle: '一起聊聊？',
      intro:
        '专注于 UI/UX 设计与数字产品体验设计，致力于通过清晰的视觉表达和用户导向的设计思维，打造兼具商业价值与用户价值的产品体验。',
      navTitle: '导航',
      navHome: '首页',
      navAbout: '关于我',
      navPortfolio: '作品集',
      navAiIp: 'AI IP 案例',
      navExperience: '工作经验',
      contactTitle: '联系方式',
      phoneLabel: '手机：',
      emailLabel: '邮箱：',
      wechatLabel: 'WeChat：',
      newsletterTitle: '保持联系',
      copyEmail: '复制邮箱',
      copied: '已复制',
      wechat: 'WeChat',
      wechatQrAlt: '微信二维码',
      copyright: '© 2026 施博瀚 · Portfolio',
      terms: '使用条款',
      privacy: '隐私政策',
    },
    skills: [
      'UI 设计',
      '交互设计',
      '视觉设计',
      '移动端界面',
      '网页设计',
      '原型设计',
      '设计规范',
    ],
    tools: ['Figma', 'Photoshop', '即时设计', 'Notion', 'ChatGPT', '即梦', 'Cursor', 'Codex'],
    logoAlt: 'Shi Bohan',
  },
  en: {
    hero: {
      line1: 'Turn ideas,',
      line2: 'into products',
      intro:
        'UI and interaction designer—turning product needs into clear, easy-to-use screens. Comfortable from wireframes to visual specs, with a focus on detail and smooth handoff.',
      scroll: 'Scroll down to explore my profile and works',
      cta: 'Start exploring',
    },
    profile: {
      italic: 'About',
      title: 'Profile',
      subtitle: 'UI / UX · Mobile · Web',
      name: 'Shi Bohan',
      role: 'Product Designer',
      tagline: 'B+C UI · Mini programs · Brand sites',
      bio: 'I break requirements into clear layouts and visual solutions. I deliver wireframes, high-fidelity UI, and basic design guidelines, and collaborate well with product and engineering.',
      skills: 'Skills',
      tools: 'Tools',
      avatarAlt: 'Shi Bohan avatar',
    },
    experience: {
      italic: 'Experience',
      title: 'Work History',
      subtitle: 'From electrical engineering to digital product design—rigorous logic meets UI practice',
      jobs: [
        {
          title: 'UI Designer',
          period: 'Jan 2024 – Present',
          org: 'Shenzhen Yuangou Institute Technology Co., Ltd.',
          desc: 'Product design for the company’s mini programs, web platforms, and mobile apps—end to end from requirements, competitive analysis, and information architecture to interaction design, visual design, and design guidelines. 0→1 experience; balancing user experience with business goals to ship efficiently and iterate.',
        },
        {
          title: 'Electrical Designer',
          period: 'May 2020 – Dec 2023',
          org: 'Guangdong Xidian Power Technology Co., Ltd.',
          desc: 'Electrical drawings for diesel generator control systems—secondary wiring between controllers and units in AutoCAD, plus technical documentation. Built rigorous logical thinking, complex information structuring, and cross-team collaboration—foundations that later supported digital product and UX work.',
        },
      ],
    },
    portfolio: {
      italic: 'Portfolio',
      title: 'Selected Works',
      subtitle: 'Product and UI design case studies',
      viewCase: 'View case',
      soon: 'Coming soon',
      works: [
        {
          title: 'knowee Course Platform',
          desc: 'Online course platform for instructors and learners—B+C flows for learning, teaching, and ops with clear IA and a unified UI system.',
          tags: ['B+C', 'UI/UX', '2025'],
        },
        {
          title: 'XXXX Coffee Mini Program',
          desc: 'WeChat mini program for café ordering—product pick, specs, payment, and order status with short paths and clear feedback.',
          tags: ['WeChat Mini Program', 'UI Design', '2025'],
        },
        {
          title: 'KOVA Coffee Website',
          desc: 'Brand site and e-commerce for a cold-brew coffee brand—from storytelling and PDP to subscription and member experience.',
          tags: ['Brand Site', 'E-commerce', '2026'],
        },
        {
          title: 'Pekon Admin & Guidelines',
          desc: 'PEKON B-side ordering admin—design goals, interaction principles, dashboards, order detail, and component guidelines for dense enterprise UI.',
          tags: ['Admin UI', 'Enterprise', '2024'],
        },
      ],
    },
    aiIp: {
      italic: 'AI Practice',
      title: 'AI-generated IP cases',
      subtitle: 'Character tone, poses, and brand stories—IP design practice with generative AI',
      tools: ['Jimeng', 'ChatGPT', 'Photoshop', 'Figma'],
      showcases: [
        {
          name: 'Coffy · Coffee Mascot',
          lead:
            '“Coffy” is a coffee-brand IP practice built with AI—from character tone and turnarounds to badges, cup sleeves, and tape mockups in one presentation.',
          highlights: [
            {
              label: '01',
              title: 'Character & tone',
              body: 'Friendly coffee-cup mascot with unified palette and materials for instant recognition.',
            },
            {
              label: '02',
              title: 'Angles & expressions',
              body: 'Front, side, back views and varied expressions—stable proportions for extension work.',
            },
            {
              label: '03',
              title: 'Merch extension',
              body: 'Badges, lanyards, cup sleeves, tape, and signage—full brand touchpoints.',
            },
          ],
          imageAlt: 'Coffy coffee mascot IP case',
          captions: ['Hero & naming', 'Turnarounds · expressions', 'Peripheral mockups'],
        },
        {
          name: 'Slowy · Coffee Sloth',
          lead:
            '“Slowy” is a coffee-scented sloth with a cup on its head—collecting small happy moments: floating on water, napping on clouds, sipping a warm cup.',
          highlights: [
            {
              label: '01',
              title: 'Chill & relaxed tone',
              body: 'Soft fur, rich expressions—floating, lounging, the slow-life mood young audiences relate to.',
            },
            {
              label: '02',
              title: 'Emotional resonance',
              body: 'It’s okay to slow down; you don’t have to be efficient to be loved. Coffee is time for yourself.',
            },
            {
              label: '03',
              title: 'Name · Slowy',
              body: 'Sloth + Slow—always a beat behind, never late to your own happiness.',
            },
          ],
          imageAlt: 'Slowy coffee sloth IP turnarounds',
          captions: ['Standing angles', 'Coffee · Sloffee', 'Cloud rest · bath · gaming'],
        },
        {
          name: 'BOX RABBIT · Box Bunny',
          lead:
            '"BOX RABBIT" is a soft grey plush rabbit sitting in a brown cardboard box—the box is home and the visual anchor for the name. Built with AI: multi-angle 3D renders, comic panels, and dynamic "BOX" / "RABBIT" marks exploring trendy-toy recognizability and extension.',
          highlights: [
            {
              label: '01',
              title: 'Box as character symbol',
              body: 'Rabbit and box are one—"box" + "rabbit" in the name keeps the memory point tight for merch and display.',
            },
            {
              label: '02',
              title: 'Plush toy texture',
              body: 'Grey plush, short ears, round eyes, fluffy tail—3D renders feel tactile and collectible like physical toys.',
            },
            {
              label: '03',
              title: 'Comic logo extension',
              body: 'B&W panels split "BOX" and "RABBIT" into dynamic marks—display polish plus social-media energy.',
            },
          ],
          imageAlt: 'BOX RABBIT designer toy IP presentation',
          captions: ['Multi-angle 3D renders', 'Comic panels · dynamic logos', 'Front/back · display reference'],
        },
      ],
    },
    footer: {
      connectTitle: "Let's connect",
      intro:
        'Focused on UI/UX and digital product experience design—using clear visual expression and user-centered thinking to build products with both business and user value.',
      navTitle: 'Navigation',
      navHome: 'Home',
      navAbout: 'About',
      navPortfolio: 'Portfolio',
      navAiIp: 'AI IP Case',
      navExperience: 'Work Experience',
      contactTitle: 'Contact',
      phoneLabel: 'Phone: ',
      emailLabel: 'Email: ',
      wechatLabel: 'WeChat: ',
      newsletterTitle: 'Stay in touch',
      copyEmail: 'Copy email',
      copied: 'Copied',
      wechat: 'WeChat',
      wechatQrAlt: 'WeChat QR code',
      copyright: '© 2026 Shibohan Shi · Portfolio',
      terms: 'Terms',
      privacy: 'Privacy',
    },
    skills: [
      'UI Design',
      'Interaction Design',
      'Visual Design',
      'Mobile UI',
      'Web Design',
      'Prototyping',
      'Design Guidelines',
    ],
    tools: ['Figma', 'Photoshop', 'JsDesign', 'Notion', 'ChatGPT', 'Jimeng', 'Cursor', 'Codex'],
    logoAlt: 'Shi Bohan',
  },
} as const

export type Translations = typeof translations.zh | typeof translations.en

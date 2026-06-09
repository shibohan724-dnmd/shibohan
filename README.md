# 个人作品集网站

参考 [Minfolio](https://minfolio-template.framer.website/) 风格制作的极简个人作品集：左侧固定边栏 + 右侧滚动内容区，暗色主题，纯静态、零依赖。

## 文件结构

```
index.html    页面结构与内容
styles.css    样式（暗色主题、响应式）
script.js     交互（导航高亮、移动端菜单、滚动淡入）
```

## 本地预览

直接双击 `index.html` 即可，或用本地服务器（推荐）：

```bash
python3 -m http.server 8000
# 然后访问 http://localhost:8000
```

## 如何替换成你自己的内容

所有内容都在 `index.html` 里，按下面几处改即可：

1. **个人信息**：左栏 `.profile` 区域的姓名、职位、经验年数、头像 `src`、社交链接。
2. **大标题**：`.intro__title` 里的标语。
3. **精选作品**：`.work-grid` 里的每个 `.work-card`。
   - 想换成真实图片：把 `.work-card__media` 改成 `<img src="你的图片">`，或在 CSS 里给它设置 `background-image`。
   - `--accent` 控制卡片的主题色。
4. **评价 / 技能 / 技术栈 / 经历**：分别在 `.quote-grid`、`.chips`、`.timeline` 中修改。
5. **主题色**：改 `styles.css` 顶部 `:root` 里的 `--accent` 等变量。

## 部署

可直接上传到 GitHub Pages / Vercel / Netlify 等静态托管平台。

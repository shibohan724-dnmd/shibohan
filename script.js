// 移动端菜单开关
const toggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

function setMenu(open) {
  sidebar.classList.toggle("is-open", open);
  toggle.classList.toggle("is-open", open);
  overlay?.classList.toggle("is-open", open);
}

toggle?.addEventListener("click", () => {
  setMenu(!sidebar.classList.contains("is-open"));
});

overlay?.addEventListener("click", () => setMenu(false));

// 点击导航后在移动端自动收起
document.querySelectorAll(".nav__link").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) setMenu(false);
  });
});

// 窗口放大到桌面尺寸时复位菜单状态
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) setMenu(false);
});

// 滚动高亮当前区块对应的导航
const sections = ["home", "about"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);
const navLinks = document.querySelectorAll(".nav__link[data-target]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((l) =>
          l.classList.toggle("is-active", l.dataset.target === id)
        );
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
);

sections.forEach((s) => observer.observe(s));

// 淡入由 CSS animation 控制（见 styles.css），JS 无需处理

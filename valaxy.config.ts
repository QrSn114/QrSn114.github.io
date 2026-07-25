import type { UserThemeConfig } from 'valaxy-theme-yun'
import { defineValaxyConfig } from 'valaxy'

// add icons what you will need
const safelist = [
  'i-ri-home-line',
]

/**
 * User Config
 */
export default defineValaxyConfig<UserThemeConfig>({
  // site config see site.config.ts

  theme: 'yun',

  themeConfig: {
    banner: {
      enable: true,
      title: '桂城中学民间新生指南',
      cloud: { enable: true },
      duration: 2000,
    },
  },

  unocss: { safelist },

  // ========== 新增的 vite 配置（解决刷新404问题） ==========
  vite: {
    plugins: [
      // 插件1：在构建完成后，把 404.html 复制到 dist 目录
      {
        name: 'copy-404',
        writeBundle() {
          const fs = require('fs')
          const path = require('path')
          const src = path.resolve(__dirname, '404.html')
          const dest = path.resolve(__dirname, 'dist', '404.html')
          if (fs.existsSync(src)) {
            fs.copyFileSync(src, dest)
            console.log('✅ 404.html 已复制到 dist 目录')
          }
        },
      },
      // 插件2：在 index.html 中注入修复脚本
      {
        name: 'inject-history-fix',
        transformIndexHtml(html) {
          const script = `
<script>
  (function(){
    var redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    if (redirect && redirect != location.href) {
      history.replaceState(null, null, redirect);
    }
  })();
</script>`
          return html.replace('</head>', script + '</head>')
        },
      },
    ],
  },
})
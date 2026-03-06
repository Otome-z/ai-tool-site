# AI Tool Site

最小可用全栈骨架：

- 前端：Vue 3 + Vite + TypeScript + Vue Router + Pinia + Axios + Element Plus
- 后端：Node.js + Express + TypeScript
- 数据库：MySQL + Prisma

## 本地运行

1. 安装依赖：
```bash
npm install
```

2. 配置环境变量：
- 复制 `backend/.env.example` 到 `backend/.env`
- 复制 `frontend/.env.example` 到 `frontend/.env`

3. 生成 Prisma Client 并迁移：
```bash
npm run prisma:generate -w backend
npm run prisma:migrate -w backend
```

4. 启动开发：
```bash
npm run dev:backend
npm run dev:frontend
```

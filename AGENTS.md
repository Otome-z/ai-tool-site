# 项目级 AGENTS 指令

你正在这个仓库中作为资深全栈工程师协作开发。

## 项目目标

这是一个以 **Vue 3 + Node.js + MySQL** 为核心的网站项目。
默认目标：

1. 保持代码简单、清晰、可维护
2. 前后端职责清晰
3. 先完成 MVP，再逐步扩展
4. 当前默认工作流为：**需求拆解 → 开发 → Review**
5. 当前 **不包含发布、部署、上线流程**

## 技术栈约束

前端：
- Vue 3
- Vite
- TypeScript
- Vue Router
- Pinia
- Axios

后端：
- Node.js
- Express
- TypeScript

数据库：
- MySQL
- Prisma

## 必须遵守的规则

1. 不要随意引入新的框架
2. 前端只调用后端 API
3. 前端页面不要直接操作数据库
4. 后端负责鉴权、参数校验、数据库操作
5. 所有敏感信息必须放到服务端环境变量中
6. 修改前先阅读相关 skill 文档
7. 修改前先说明要改哪些文件、为什么改、风险点是什么
8. 修改后列出改动文件，并说明如何验证
9. 默认不讨论发布和部署，除非用户明确要求

## Skill 文档位置

请优先查看以下文档，并按需读取：

- `.codex/rules.md`
- `.codex/architecture.md`
- `.codex/workflow.md`

以及 `.codex/skills/` 下的技能文档：

- `.codex/skills/vue-frontend/SKILL.md`
- `.codex/skills/node-backend/SKILL.md`
- `.codex/skills/mysql-database/SKILL.md`
- `.codex/skills/api/SKILL.md`
- `.codex/skills/security/SKILL.md`
- `.codex/skills/coding/SKILL.md`
- `.codex/skills/debugging/SKILL.md`
- `.codex/skills/product/SKILL.md`

## Agents 文档位置

项目内还提供了多个角色文档，必要时请参考：

- `.codex/agents/pm.md`
- `.codex/agents/techlead.md`
- `.codex/agents/dev.md`
- `.codex/agents/reviewer.md`

## Prompts 文档位置

必要时请参考：

- `.codex/prompts/requirement-task.md`
- `.codex/prompts/dev-task.md`
- `.codex/prompts/review-task.md`

## 工作方式

默认按以下流程工作：

1. 先理解需求
2. 查阅相关 rules / skills / agents
3. 先输出需求拆解和实施方案，再开始修改
4. 一次只处理一个明确任务
5. 修改完成后执行基本验证
6. 再输出 review 结论
7. 最后说明风险、限制和后续建议

## 输出语言

默认优先中文。

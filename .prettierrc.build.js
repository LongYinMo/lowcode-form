module.exports = {
  // 继承基础配置
  ...require('./.prettierrc.js'),
  // 临时禁用换行符检查，确保构建成功
  endOfLine: 'auto'
}
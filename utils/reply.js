const commandList = [{
  word: '查',
  search: '',
  regex: null,
}, {
  word: '近期',
  search: 'in_month',
  regex: null,
}, {
  word: '查 公司',
  search: 'company',
  regex: /(.+)?查 公司\s+/,
}, {
  word: '查 職稱',
  search: 'position',
  regex: /(.+)?查 職稱\s+/,
}, {
  word: '查 日期',
  search: 'date',
  regex: /(.+)?查 日期\s+/,
}, ]

const helperList = [{
  id: 0,
  message: `無法辨識，若要了解有哪些指令請輸入 !指令`
}, {
  id: 1,
  message: `
  指令表：%0D%0A
  1. 查，回傳 _*最新十筆*_ 徵才文 %0D%0A
  2. 近期，回傳 _*一個月內*_ 的徵才文 %0D%0A
  3. 查 公司 <公司名>，回傳 _*公司名符合*_ 的徵才文 %0D%0A
  4. 查 職稱 <職稱名>，回傳 _*職稱名符合*_ 的徵才文 %0D%0A
  5. 查 日期 <月>/<日>，回傳 _*日期符合*_ 的徵才文 %0D%0A
  %0D%0A
  P.S. 因有些文章標題格式不同，查公司及職稱不一定能查到所有文章
  `
}, {
  id: 2,
  message: `查無資料，請嘗試其他指令或搜尋條件`
}, ]

module.exports = {
  commandList,
  helperList,
}
export default function handler(req, res) {
  const playerId = crypto.randomUUID();
  const roots = ["Kim","Mộc","Thủy","Hỏa","Thổ","Dị"];
  const root = roots[Math.floor(Math.random()*roots.length)];
  res.json({ playerId, intro:`Ngươi mang ${root} linh căn, bước vào Huyền Thiên Tông.`});
}

import express from 'express';
const app = express();

app.get('/', (req, res) => {
  const code = req.query.code;
  if (code) {
    // Đổi code lấy token
    console.log('Code:', code);
    res.send('Đăng nhập thành công! Bạn có thể đóng cửa sổ này.');
  } else {
    res.send('Không nhận được code!');
  }
});
app.listen(2409, () => {
  console.log('Server is running on http://localhost:5173');
});

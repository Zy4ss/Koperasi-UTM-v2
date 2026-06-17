<?php
require_once __DIR__ . '/../inc/db.php';
session_start();
$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $username = trim($_POST['username'] ?? '');
  $password = $_POST['password'] ?? '';
  $stmt = $conn->prepare("SELECT id, username, password FROM users WHERE username = ?");
  $stmt->bind_param("s", $username);
  $stmt->execute();
  $result = $stmt->get_result();
  $user = $result->fetch_assoc();
  if ($user && password_verify($password, $user['password'])) {
    $_SESSION['admin'] = true;
    $_SESSION['admin_id'] = $user['id'];
    $_SESSION['admin_user'] = $user['username'];
    header('Location: index.php');
    exit;
  } else {
    $error = 'Username atau password salah';
  }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login Admin - Koperasi UTM</title>
  <link rel="icon" type="image/png" href="../img/logo-koperasi.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css">
  <link rel="stylesheet" href="../css/style.css">
  <style>
    .admin-login-body { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--bg); padding: 20px; }
    .admin-login-card { background: var(--card-bg); border-radius: var(--radius-xl); padding: 40px; width: 100%; max-width: 400px; border: 1px solid var(--border); box-shadow: var(--shadow-lg); }
    .login-logo { text-align: center; margin-bottom: 28px; }
    .login-logo img { height: 50px; margin-bottom: 8px; }
    .login-logo h2 { font-family: 'Montserrat', sans-serif; font-size: 22px; color: var(--text); }
    .login-logo p { font-size: 13px; color: var(--text-muted); }
    .form-group { margin-bottom: 18px; }
    .form-group label { display: block; font-size: 13px; font-weight: 500; color: var(--text); margin-bottom: 4px; }
    .form-group input { width: 100%; padding: 12px 14px; border: 2px solid var(--border); border-radius: var(--radius-sm); font-size: 14px; font-family: inherit; outline: none; background: var(--surface); color: var(--text); box-sizing: border-box; }
    .form-group input:focus { border-color: var(--primary); }
    .login-error { background: #fef2f2; color: #dc2626; padding: 10px 14px; border-radius: var(--radius-sm); font-size: 13px; margin-bottom: 16px; text-align: center; }
    .btn-primary { width: 100%; justify-content: center; }
  </style>
</head>
<body class="admin-login-body">
  <div class="admin-login-card" data-aos="fade-up" data-aos-duration="800">
    <div class="login-logo">
      <img src="../img/logo-koperasi.png" alt="Koperasi UTM">
      <h2>Koperasi UTM</h2>
      <p>Panel Administrasi</p>
    </div>
    <?php if ($error): ?>
      <div class="login-error"><i class="fas fa-exclamation-circle"></i> <?= $error ?></div>
    <?php endif; ?>
    <form method="POST">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" placeholder="Masukkan username" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Masukkan password" required>
      </div>
      <button type="submit" class="btn-primary"><i class="fas fa-sign-in-alt"></i> Masuk</button>
    </form>
    <div style="text-align:center;margin-top:20px">
      <a href="../index.php" style="font-size:13px;color:var(--text-muted)"><i class="fas fa-arrow-left"></i> Kembali ke Beranda</a>
    </div>
  </div>
  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
  <script>AOS.init({ duration: 800, once: true })</script>
</body>
</html>

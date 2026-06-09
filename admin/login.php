<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Koperasi Universitas Trunojoyo Madura</title>
  <link rel="icon" type="image/png" href="../img/logo-koperasi.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css">
  <link rel="stylesheet" href="../css/style.css">
</head>
<body class="admin-login-body">
  <div class="admin-login-card" data-aos="fade-up" data-aos-duration="800">
    <div class="login-logo">
      <img src="../img/logo-koperasi.png" alt="Koperasi UTM" style="height:44px;width:auto;margin:0 auto 8px">
      <h2>Koperasi UTM</h2>
      <p>Panel Administrasi</p>
    </div>
    <form action="index.php" method="POST">
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

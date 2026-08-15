process.env.NODE_ENV = 'production';
try {
  require('vite');
  console.log("Vite required successfully");
} catch (e) {
  console.error("Vite require failed:", e);
}

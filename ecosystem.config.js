module.exports = {
  apps: [
    {
      name: "auth.sinpapeles",
      script: "./bin/www",
      watch: false,
      env: {
        PORT: 3002,
      },
    },
  ],
};

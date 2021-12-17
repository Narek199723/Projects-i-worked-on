module.exports = {
  /**
   * Application configuration section
   * pm2 deploy ecosystem.config.js development setup
   */

  apps: [
    {
      name: "Meeting-Summary",
    },
  ],

  deploy: {
    development: {
      name: "Meeting-Summary",
      user: "ubuntu",
      host: "34.121.252.72",
      ref: "origin/development",
      repo: "git@github.com:Uncanny-Lab-Ltd-Official/meeting-summary-frontend.git",
      path: "/var/www/dev-app.bluecap.ai",
      ssh_options: "StrictHostKeyChecking=no",
      "post-deploy":
        "/home/ubuntu/.nvm/versions/node/v14.15.4/bin/npm install && /home/ubuntu/.nvm/versions/node/v14.15.4/bin/npm run build",
    },
    production: {
      name: "Meeting-Summary",
      user: "ubuntu",
      host: "34.121.252.72",
      ref: "origin/production",
      repo: "git@github.com:Uncanny-Lab-Ltd-Official/meeting-summary-frontend.git",
      path: "/var/www/app.bluecap.ai",
      ssh_options: "StrictHostKeyChecking=no",
      "post-deploy":
        "/home/ubuntu/.nvm/versions/node/v14.15.4/bin/npm install && /home/ubuntu/.nvm/versions/node/v14.15.4/bin/npm run build",
    },
  },
};

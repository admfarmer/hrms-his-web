## hrms-app
ติดตั้ง NodeJS 9.x
Alternatively, for Node.js 9:
~ curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
~ sudo apt-get install -y nodejs

To compile and install native addons from npm you may also need to install build tools:
~ sudo apt-get install -y build-essential

ติดตั้ง pm2 โดยใช้ node package modules (npm)
~ sudo npm install pm2 -g

ติดตั้ง Git
~ sudo apt-get install git
~ git config --global user.name "Somprasong Damyos"
~ git config --global user.email "somprasong@git.com"

~ git config --global --list

user.name=Somprasong Damyos
user.email=somprasong@git.com

~ git config --global core.editor "nano"

~ ls -al ~/.ssh
## Lists the files in your .ssh directory, if they exist

~ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
Generating public/private rsa key pair.
Enter a file in which to save the key (/Users/you/.ssh/id_rsa): [Press enter]
Enter passphrase (empty for no passphrase): [Type a passphrase]
Enter same passphrase again: [Type passphrase again]

start the ssh-agent in the background
~ eval $(ssh-agent -s)
Agent pid 59566

~ ssh-add ~/.ssh/id_rsa

~ nano ~/.ssh/id_rsa.pub
Copies the contents of the id_rsa.pub file to your clipboard


// เริ่ม Clone APP
~ git clone git@github.com:Wachkung/hrms-app.git

~ cd hrms-app
~ npm i

แก้ไขการเชื่อมต่อ Api
~ nano src/environments/environment.prod.ts
export const environment = {
    production: true,
    apiUrl: 'http://localhost:3200'
};

Run build โปรเจค ใน Linux
~ npm run build

Run Error
~ npm install typescript@next --save

Run Pm2 ครอบการทำงาน
~ pm2 start server.js --name hrms-his-app

// เริ่ม Clone API

~ npm i typescript -g
~ npm i ts-node -g

~ git clone git@github.com:Wachkung/hrms-his-api.git

ทดสอบ Run Api
~ cd hrms-api
~ npm i
~ nodemon
~ Ctrl +C

Run Pm2 ครอบการทำงาน
~ pm2 start nodemon --name hrms-his-api

สั่ง Pm2 ทำงาน
~ pm2 list
~ pm2 save
~ pm2 startup

Start an app using all CPUs available + set a name :
    $ pm2 start app.js -i 0 --name "api"

    Restart the previous app launched, by name :
    $ pm2 restart api

    Stop the app :
    $ pm2 stop api

    Restart the app that is stopped :
    $ pm2 restart api

    Remove the app from the process list :
    $ pm2 delete api

    Kill daemon pm2 :
    $ pm2 kill

    Update pm2 :
    $ npm install pm2@latest -g ; pm2 update

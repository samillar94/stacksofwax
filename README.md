# stacksofwax
Web dev project for the MSc Software Development at Queen's University Belfast - a web app for vinyl collectors.

## Installation guide
Required software: Windows, MAMP, NodeJS, NPM, a terminal.
1.	In Windows, extract smillar36.zip.
2.	Start MAMP and visit http://localhost/phpMyAdmin/ in a browser. Change the connection settings in smillar36/api/connection.js if using another OS or stack.
3.	In phpMyAdmin, create the database “stacksofwax-40103709” and drag and drop in the database file smillar36/stacksofwax-40103709.sql.
4.	Open smillar36/api and smillar36/app in separate Git Bash terminals and run nodemon api and nodemon app respectively. The apps can also be run with node directly from PowerShell. The required Node Package Manager modules are already included in the folders.
5.	Visit the website at http://localhost:3000.


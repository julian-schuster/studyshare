# Part 1: XAMPP

## 1.1: Installation

Download XAMPP (Version ​7.4.14 / PHP 7.4.14​) from https://www.apachefriends.org/de/download.html and install it.

## 1.2: Project folder location

Clone the the project repository into “C:\xampp\htdocs\" or move the files there manually.

## 1.3: Create a Database

### a. Start Webserver and Database

Start Apache and MySQL via the XAMPP Control Panel.

### b. Prepare a new database

Go to your Browser and paste the url: ​http://localhost/phpmyadmin/
Create a new database with the name “studyshare”.

# Part 2: Backend Laravel

https://laravel.com/docs/8.x/installation#installation-via-composer

## 2.1: Installation

Download composer from ​https://getcomposer.org/​ and install it.

## 2.2: Update composer

Go to “​xampp\htdocs\studyshare\backend\studyshare\” and run the following command in the command prompt.

### `composer update`

## 2.3: Rename .env.example

Stay in the directory “​xampp\htdocs\​studyshare\backend\studyshare\” and rename “.env.example” to “.env” with the following command in the command prompt:

### `cp .env.example .env`

## 2.4: Migrate Database

Open the command prompt and go to “​xampp\htdocs\​studyshare\backend\studyshare\”.
Run the command

### `php artisan migrate`

to generate tables in the database.

# Part 3: Frontend React

## 3.1: Installation Node.js

If you haven't already installed Node.js and npm on your system please do this by downloading Node.js from ​​https://nodejs.org/en/​.

## 3.2: Installation of required node modules

After a successful installation of Node.js go to the folder xampp/htdocs/studyshare/frontend/studyshare/ ​and open the command prompt.
Type

### `npm install`

into the command prompt. All the packages should get downloaded and installed automatically.

## 3.3: Start the application

Start React by typing

### `npm start`

into the command prompt (Make sure that your XAMPP is running as well, otherwise you won't be able to sign up).

## 3.4: Studyshare web page

A new tab in your browser with the url localhost:3000 should appear. You should see the start page of Studyshare. Have fun!

# Part 4: Sign up

You need to sign up with an informatik.hs-fulda.de e-mail address (e.g. max.mustermann@informatik.hs-fulda.de)​ and a valid password (at least 8 characters).

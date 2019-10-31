<p align="center">
  <img width="460" " src="https://firebasestorage.googleapis.com/v0/b/libri-238805.appspot.com/o/libri%20logo.png?alt=media&token=bec48934-d1c2-467f-b6d3-af1538aecaeb" />
</p>

# Remote Library Manager

![](https://img.shields.io/github/issues/LakshanKarunathilake/libri-admin)
![](https://img.shields.io/github/forks/LakshanKarunathilake/libri-admin)
![](https://img.shields.io/github/stars/LakshanKarunathilake/libri-admin) ![](https://img.shields.io/github/license/LakshanKarunathilake/libri-admin)
![](https://img.shields.io/github/repo-size/lakshankarunathilake/libri-admin)

## Technologies

<p align="center" > 
  <img width="120" " src="https://avatars0.githubusercontent.com/u/20172349?s=280&v=4" />
  <img width="100" " src="https://angular.io/assets/images/logos/angular/angular.png" />
    <img width="150" " src="https://raw.githubusercontent.com/t4t5/sweetalert/e3c2085473a0eb5a6b022e43eb22e746380bb955/assets/logotype.png" />
<img width="80" " src="https://firebase.google.com/downloads/brand-guidelines/PNG/logo-vertical.png" />

</p>

## Features

- Cross platform mobile abbpplication based on Ionic Version 4.0
- Associated with a supportive dashboard called Libri-Admin
- All your library users can use the the library applications remo-tely
- New transfer capability between users without visiting the library
- Checking the books and the availability of books can be checked without visiting the library
- Users can transfer books without visiting the library
- Users can pay the penalties if the library authorized personal grant the permission
- Users will be able to receive the notices digitally and efficiently
- Any library have existing system can plug this application if the current system is based on Koha Library Management System or Ever green library system
- Library staff can embed a brief introduction about the statistics of the library

## Abstract

The world has become a place full of technological and computerized components. Everything is getting automated and thanks to the vast development of Information and Communication Technology, people tend to automate the day to day activities, business, health, education and other services in order get things done efficiently.

> “A library is a collection of sources of information and similar resources, made accessible to a defined community for reference or borrowing”.

> <p align="right">-Wikipedia </p>

Library is the place the easiest source of knowledge distributed all around the world. Modern libraries are providing a large number of services to distribute the knowledge gathered in the premises. Some libraries are having millions of books and the number of books yearly produce is also millions. Early days, people visit the library premise and search through the cupboards and may take the librarians assistance or else some others. But these libraries only had a limited number of books and a limited number of interested parties. These days libraries have different sections reserved for different services and the number of users is large in numbers. So these libraries need much efficient and effective mechanism to provide a better service to the library service which could not be done by only having staff.
There are several Library Management Systems implemented by different parties in the world. Some are Closed Source and some are Open Source. Typically, Libraries are non-profitable organizations, so these organizations generally go for free applications. Most of these systems are in need of a mobile application solution
“Libri” is an Open Source mobile application assistant. The purpose of this project is to assist to the library services outside of the premises. The system is already implemented and any interested party can take the system and change the configurations according to the need and host them. The cost for the system will only be for the hosting and the application can be deployed to Android, iOS, Windows, Mac OS. Implementation is based on the Ionic and Firebase with support of React dashboard. Libri will be attractive and user-friendly while providing the services. This will help libraries to provide better service efficiently.

## System sub components

To work on the dashboard there are two other sub components [Libri-App](https://github.com/LakshanKarunathilake/libri-app) and a backend server with server deployed according to the serverless architecture called [server](https://github.com/LakshanKarunathilake/Libri-server)

### Installation Guide

** Pre-requisits**

| Tool | Version   |
| ---- | --------- |
| Node | 10.11 LTS |
| npm  | 6.4.1     |

#### 1. Install Dependencies

```sh
$ npm install
```

#### 2. Start Application

```sh
$ npm start
```

This will launch an application preview inside your preffered browser

#### Run test cases

```sh
$ npm test
```

#### Build application using angular

```sh
$ npm run build
```

#### Replacing firebase configurations

You can find the firebase configurations in the directory src/environments/environment.prod.ts for production builds or else src/environments/environment.ts

Before replacing the firebase configurations you have to make sure you have created a project using firebase console and enabled the features

- Firebase Cloud Messaging
- Firebase Cloud Functions
- Firebase Anlaytics for Web
- Firebase Crashlytics
- Firebase Performance
- Firebase Storage bucket

The above features must be enabled prior to the installation. The sample configuration file will be as below. This is for the web development. Refer the android area for your android implmentation

```javascript
	 firebase: {
		apiKey: 'TEST _KEY',
		authDomain: 'TEST _KEY',
		databaseURL: 'TEST _KEY',
		projectId: 'TEST _KEY',
		storageBucket: 'TEST _KEY',
		messagingSenderId: 'TEST _KEY',
		appId: 'TEST _KEY',
		measurementId: 'TEST _KEY'
  }
```

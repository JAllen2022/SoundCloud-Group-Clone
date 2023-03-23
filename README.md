
# TuneSpace

[TuneSpace][1] is a [SoundCloud][2] inspired web application that provides the user with a seemless audio streaming experience.

## Tech Stack
---
### Frameworks, Platforms and Libraries:
   ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
   ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
   ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
   ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
   ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
   ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
   ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
   ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
   ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
- SQLAlchemy

### Database:
   ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

### Hosting:
   ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

<br/>

## Page Views

## 🚀 Local Installation
1. Clone the repository

HTTPS:
```bash
git clone https://github.com/JAllen2022/SoundCloud-Group-Clone.git
```
SSH:
```bash
git clone git@github.com:JAllen2022/SoundCloud-Group-Clone.git
```

2. Install the dependencies
```bash
pipenv install -r requirements.txt
```

3. Create a .env file based on the example with proper settings for your development environment
```bash
SECRET_KEY= <your secret key>
DATABASE_URL=sqlite:///dev.db
SCHEMA=flask_schema
```

4. Get into your pipenv, migrate your database, seed your database, and run your Flask app

```bash
pipenv shell
```

```bash
flask db upgrade
```

```bash
flask seed all
```

```bash
flask run
```

5. Open a separate terminal and change into the react-app directory

```bash
cd react-app
```

6. Install the dependencies
```bash
npm install
```

7. Start the application
```bash
npm start
```

5. Navigate to the application in your browser

<br/>

## Contact Information

Jason Allen<br/>
[LinkedIn](https://www.linkedin.com/in/jasonallen715/)<br/>
<jasonallen715@gmail.com>

Roysa Peguero<br/>
[LinkedIn](https://www.linkedin.com/in/roysapeguero/)<br/>
<roysapeguero@outlook.com>


Ryan Harden<br/>
[LinkedIn](https://www.linkedin.com/in/ryanharden-dev/)<br/>
<ryanharden20@gmail.com>

Lillyann Hidalgo<br/>
[LinkedIn](https://www.linkedin.com/in/lillyann-h-55684b249/)<br/>

[1]:https://tunespace.onrender.com/
[2]:https://www.soundcloud.com/

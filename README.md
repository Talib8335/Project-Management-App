# Onework

Onework is a project management application designed to help teams efficiently manage tasks, communicate in real-time, and schedule meetings and collaborate through video calls. It features a microservices architecture and advanced integrations for task management and communication.

## Features

- **CLI-Based Automation**: Automates the creation of basic project services structure.
- **JWT Authentication**: Secure session management using HTTP cookies with both access and refresh tokens.
- **Serverless Email Services**: Integrates AWS Lambda to handle millions of email traffic for notifications.
- **Live Chat and Updates**: Real-time communication through socket integration for messaging and live updates.
- **Video Calls**: WebRTC integration for seamless video communication.
- **Task Management**: Utilizes MongoDB aggregation pipeline for managing tasks via sprint and kanban views.
- **Redis Caching**: Frequently accessed tasks are cached using Redis to improve access times and reduce server load.

## Tech Stack

### Front-End

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Ant Design](https://img.shields.io/badge/Ant%20Design-0170FE?style=flat&logo=ant-design&logoColor=white)

### Back-End

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)

## Environment Variables

You will need to configure the following environment variables in a `.env` file:

```plaintext
# Frontend                                   | # Backend
-------------------------------------------- | -------------------------------------------------
REACT_APP_APP_NAME=onework                   | PROD=false
REACT_APP_SUPPORT_EMAIL=support@onework.com  | USER_AGENT=localhost
                                             | DB_URL=mongodb://localhost:27017/1work
                                             | USER_AGENT_SECRET
                                             | ACCESS_TOKEN_SECRET
                                             | REFRESH_TOKEN_SECRET
                                             | FORGOT_SECRET
                                             | SMTP_MAIL
                                             | SMTP_PASSWORD
                                             | ZOHO_ACOUNT_ID
                                             | ZOHO_SMTP_MAIL
                                             | ZOHO_AUTH_TOKEN
                                             | LAMBDA_MAILER_SECRET
                                             | LAMBDA_ENDPOINT=https://wc8oq7z1y7.execute-api.ap-south-1.amazonaws.com/v1

## Not Sure Where to Start? Run Locally

1. **Clone the Project**

    ```bash
    git clone https://github.com/Talib8335/Ecommerce-project.git
    ```

2. **Go to the Project Directory**

    ```bash
    cd front-end | cd back-end
    ```

3. **Install Dependencies**

    ```bash
    npm install
    ```

4. **Start the Front-end Server**

    ```bash
    npm run dev
    ```
5. **Start the Back-end Server**

    ```bash
    nodemon
    ```

5. **Make sure to start redis before running**

    ```bash
       redis-cli
    ```

6. **To Generated any service using CLI**

    ```bash
      npm run generate service_name (ex- invitation)
    ```
## Snapshort

![Screenshot 2024-09-27 171350](https://github.com/user-attachments/assets/acada80d-2ff4-4dfd-a32f-61110c3e2eb6)
![Screenshot 2024-09-27 171211](https://github.com/user-attachments/assets/4da36351-4733-4b68-a8e3-948b02a9d305)
![Screenshot 2024-09-27 171136](https://github.com/user-attachments/assets/18bf2892-91ab-43b3-bb6c-828b3caf2ec5)
![Screenshot 2024-09-27 171056](https://github.com/user-attachments/assets/dc9c75ec-0201-406d-bf0e-e2e0623bd400)
![Screenshot 2024-09-27 165258](https://github.com/user-attachments/assets/e6a2e07e-1cdd-4763-950b-31b500eb4450)
![Screenshot 2024-09-27 165051](https://github.com/user-attachments/assets/5375763e-5359-400e-a117-a119fe1a7b66)
![Screenshot 2024-09-27 164037](https://github.com/user-attachments/assets/50e6548b-c942-41dd-a550-443b4c8f7803)
![Screenshot 2024-09-27 164021](https://github.com/user-attachments/assets/d62f698d-d033-472f-973e-e028f0bfaa6d)
![Screenshot 2024-09-27 163953](https://github.com/user-attachments/assets/37a554a4-bd9d-4405-bc7e-1139d7229f7d)
![Screenshot 2024-09-27 163904](https://github.com/user-attachments/assets/20eff04c-4df6-437d-a787-993556840243)
![Screenshot 2024-09-27 162936](https://github.com/user-attachments/assets/9f30a635-0bb2-47da-9767-3369968928c8)
![Screenshot 2024-09-27 162726](https://github.com/user-attachments/assets/2c7351c3-0b9a-44d5-a55c-71332bde4db5)
![Screenshot 2024-09-27 162314](https://github.com/user-attachments/assets/8373882b-996b-4872-a9f4-e9b0bdc17cc5)
![Screenshot 2024-09-27 162258](https://github.com/user-attachments/assets/d369f290-d714-47be-93b3-3670dcf0461a)



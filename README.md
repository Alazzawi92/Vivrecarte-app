# vivreCard

# Creation du user en sql 
```sql

 
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  verification_token VARCHAR(255),
  is_verified BOOLEAN DEFAULT FALSE,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  last_seen DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
 
 ```

```sh


 backend/
│
├── src/
│   ├── config/
│   │   ├── db.js
│   │   ├── env.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │
│   ├── repositories/
│   │   ├── user.repository.js
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── geo.service.js
│   │   ├── mail.service.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   ├── validate.middleware.js
│   │
│   ├── validations/
│   │   ├── auth.schema.js
│   │
│   └── app.js
│
├── server.js
├── .env
└── package.json

```


https://wazabi64000.github.io/vivreCard/






vivre-card-app
│
├── app
│   ├── index.js
│   ├── login.js
│   ├── register.js
│   ├── map.js
│   ├── profile.js
│   └── logout.js
│
├── components
│   ├── Button.js
│   ├── InputField.js
│   └── Loading.js
│
├── services
│   ├── api.js
│   ├── authService.js
│   └── userService.js
│
├── store
│   └── authStore.js
│
├── utils
│   └── validation.js


## navigation ## 

//==========================================//
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install @react-navigation/bottom-tabs


//========================================//



## le projet ##
//==========================================//

npx expo install react-native-screens react-native-safe-area-context

//==========================================//


## Les formulation 


//==========================================//

npm install react-hook-form
npm install zod
npm install @hookform/resolvers

//==========================================//
# 📱 Phone Ordering App – Angular + Apollo + .NET GraphQL

This project is a **full-stack phone ordering system** built using:

- 🧩 **Angular 19** (standalone architecture)
- 🔗 **Apollo Client** with `apollo-angular@10.0.3`
- 🔒 JWT-based login and secure mutations
- 🌐 **.NET Core Web API** with HotChocolate for GraphQL
- 💾 SQL Server + EF Core

---

## 🚀 Features

### ✅ User Management
- Register user (GraphQL Mutation)
- Login user (returns JWT token)
- Store token in localStorage

### ✅ Authentication
- JWT token attached to each GraphQL request
- Logout support
- Logged-in username displayed in navbar (decoded from token)

### ✅ Phone Ordering
- List phones (GraphQL Query)
- Place an order (Mutation with `[Authorize]`)
- Server validates user and product

---

## 📁 Folder Structure

### Angular Frontend (`/Portals/phone-ordering-app`)
```
src/
├── app/
│   ├── pages/
│   │   ├── login/          → Login form and logic
│   │   ├── phones/         → Phone list and order UI
│   ├── shared/
│   │   ├── navbar/         → Navbar with auth display
│   ├── graphql.config.ts   → Apollo client setup (auth-aware)
│   ├── app.config.ts       → Angular app bootstrap
│   ├── app.routes.ts       → Routing setup
│   └── main.ts             → Standalone bootstrap
```

---

## 🛠️ Setup Instructions

### 🔧 Backend (.NET 7/8 + HotChocolate)

1. **Start the API**
```bash
cd PhoneOrderingApi
dotnet run
```

2. Should run on:  
   `https://localhost:7030/graphql`

---

### 🌐 Frontend (Angular 19)

1. **Install dependencies**
```bash
cd Portals/phone-ordering-app
npm install
```

2. **Start Angular app**
```bash
ng serve
```

3. Open browser:  
   `http://localhost:4200`

---

## 🔐 Auth Flow Summary

- User logs in → receives JWT token
- Token is saved in `localStorage`
- `Apollo` attaches token to each request via `Authorization: Bearer <token>`
- Username is extracted from token and shown in navbar
- `logout()` clears token and reloads UI

---

## 📦 GraphQL Operations

### 🔹 Login Mutation

```graphql
mutation {
  login(username: "testuser", password: "123456")
}
```

### 🔹 Place Order Mutation

```graphql
mutation {
  placeOrder(username: "testuser", phoneId: 1, quantity: 2)
}
```

---

## ✅ Tech Stack

| Layer       | Technology                 |
|-------------|-----------------------------|
| Frontend    | Angular 19 (standalone)     |
| GraphQL     | Apollo Angular v10          |
| Backend     | .NET Core + HotChocolate    |
| DB          | SQL Server + EF Core        |
| Auth        | JWT                         |

---

## 📚 Next Improvements

- ✅ Route guards to protect `/phones`
- ✅ Add user registration
- 🟡 Order history view
- 🟡 Better UI styling
- 🟡 Toasts for order confirmation
- 🟡 Unit tests for login + services

---

## 🙌 Author

**Buddhika Amarasinghe**  
🔗 [LinkedIn](https://www.linkedin.com/in/buddhika-amarasinghe-29692737/)  
💻 [GitHub](https://github.com/BudAma87)

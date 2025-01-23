# 🚀 Next.js Project with React, TailwindCSS, ShadCN, and Prisma

This project leverages the latest technologies in the JavaScript ecosystem, using **Next.js 15**, **React 19**, **TailwindCSS**, **ShadCN** for UI components, and **Prisma** as the ORM to interact with a PostgreSQL database hosted on Supabase.


## 🎯 Objective
This project was developed to enhance web development skills using cutting-edge technologies in the JavaScript ecosystem, including **Next.js 15**, **React 19**, **TailwindCSS**, **ShadCN**, **Prisma**, and **Supabase**.

---

## 🔧 Tecnologias Utilizadas
- **[Next.js 15](https://nextjs.org/)**: A framework for React with server-side rendering support.
- **[React 19](https://reactjs.org/)**: A JavaScript library for building user interfaces.
- **[TailwindCSS](https://tailwindcss.com/)**: A utility-first CSS framework for fast and efficient styling.
- **[ShadCN](https://shadcn.dev/)**: A collection of pre-styled UI components integrated with TailwindCSS.
- **[Prisma](https://www.prisma.io/)**: An ORM for database management.
- **[Supabase](https://supabase.com/)**: A platform for database and authentication based on PostgreSQL.

---

## 📦 Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-user/your-project.git
   cd your-project
   
2. **Install dependencies**:
   ```bash
    npm install
    # ou
    yarn install
   
3. **Configure Prisma**:
- Set up the .env file with your Supabase credentials:
   ```env
   DATABASE_URL=postgresql://user:password@host:port/database
  
- Sync the database schema with Prisma:
   ```bash
    npx prisma generate
    npx prisma migrate dev


## 🚀 Run
```bash 
    npm run dev
    # ou
    yarn dev
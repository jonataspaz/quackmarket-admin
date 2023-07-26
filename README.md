# 3D Enhanced Online Marketplace - A Dual Application Online Marketplace Platform

### The focus of this project is to improve the online shopping experience by introducing a platform that integrates 3D modelling technology. The marketplace is designed to enable sellers to showcase their items in a more dynamic and engaging way, thereby giving buyers a more realistic and immersive understanding of the products.


[Admin Repository](https://github.com/jonataspaz/quackmarket-admin)


[Store Repository](https://github.com/jonataspaz/quackmarket-store)

### The project comprises two distinct applications. The first is an Admin Application dedicated to sellers, facilitating the addition of products alongside their respective 3D models. This unique feature allows sellers to offer potential customers a tangible, lifelike perspective of their products, transcending traditional product photographs


### The second component is the Store Application. It is built to fetch product data, including the 3D models, from the Admin API. Buyers can access this application to view and interact with the 3D models of products.

---

## Libraries / Frameworks/API

1. Next.JS [documentation](https://nextjs.org/docs)
2. Node.JS [documentation](https://nodejs.org/en/docs)
3. Tailwind CSS [documentation](https://v2.tailwindcss.com/docs)
4. HeadlessUI CSS [documentation](https://headlessui.com/)
5. Shadcn CSS [documentation](https://ui.shadcn.com/)
6. MongoDB [documentation](https://www.mongodb.com/docs/)
7. Prisma ORM [documentation](https://www.prisma.io/docs/concepts/database-connectors/mongodb)
8. AXIOS [documentation](https://axios-http.com/docs/intro)
9. Zustand - State Management [documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)
10. Zod - Schema validation Form [documentation](https://zod.dev/)
11. React-hot-toast - Notification UI [documentation](https://react-hot-toast.com/docs)
12. Next-cloudinary API - Upload Images [documentation](https://cloudinary.com/documentation/image_upload_api_reference)
13. Sketchfab API - Upload Models [documentation](https://sketchfab.com/developers)
14. Clerk auth - Authentication [documentation](https://clerk.com/)
 
---

## Environment variables needed

1. MongoDB Atlas key
2. Sketchfab API key
3. Cloudinary API key
4. Clerk Auth Key
   
---

## First Run Admin

Create a new .env file and add the API key needed:

* NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
* CLERK_SECRET_KEY=
* NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
* NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
* NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
* NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

---

DATABASE_URL=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
FRONTEND_STORE_URL=http://localhost:3001 THIS IS THE STORE FRONTEND APPLICATION
NEXT_PUBLIC_SKETCHFAB_TOKEN=
---

### Run

* `npm instal`
* `npx pisma generate`
* `npx prisma db push`
* `npm run dev`

## First Run Store

Create a new .env file and add the API key needed:

* NEXT_PUBLIC_API_URL=http://localhost:3000/api THIS URL IS THE ADMIN APPLICATION URL

---

### Run
* `npm instal`
* `npm run dev`


  


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list





---


## Ntd

- role page - basically build out a page so that we can get to a specific role and edit it , this might also involve adding a role id

- connection page, need a page where we can edit connnection data 

both the above pages I think will work a little differently to the basic layout that we have for the hom, story, persona, and scene pages


- the story page needs to get the mutations implemented, I think this is doable without changing the backend (although the connections are gonna be a little complicated)





### Connections NTD

- Adding is all done, need to integrate update and delete
- will likely work on delete first

#### Delete
- There will be 3 ways to delete a connection (sorta)
  - On the personaconnections list, you will be able to right click otherPersona name icon to delete all connections betwee the two personas
  - on the connection card itself, the initiated and recieved halves will each have a bubble allowing the user to right click to delete the connection (or maybe just a delete and save for each side at the bottom)
#### Update
- need to implement a save button
- this will really only affect description, so might be work integrating into the description bubble
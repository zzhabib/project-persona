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



# Tommy Notes



## LoginPage.tsx

I am gonna try to comment this existing code as much as I can cuz I cannot read any of this , but I will leave notes here to try
and give a bigger listing of nomenclature and like structure as I ficure it out


Rn the login page doesn't function as an actual login page, it looks like there is a list of this IdentityCard object that essentially shows all users in the system, there also is no password for the user
datatype, so an actual login cannot be implemented (might switch it up to use id as password for placeholder)

additionally there is a create card box that creates a new user if you enter email (once again password 
config needed)

I get the motivation for testing not having actual login but we need to do this

as current setup stands it will be atleast an hour investement for me to do this because I have no understanding of the underlying setup used, so im leaving this alone for now



## HomePage.tsx

Holds existing stories

stories stored horizontally above the button

I mean realistically this does everything it needs to do
 
Right now it tries to fit all of them horizontally, ideally we should try to have a self filling grid situation.


### changed to grid so above is no longer true, it all fits on page
# Gatsby shared components for React clients
This repo is a collection of common React components written in TypeScript/TSX to be used with React clients for Gatsby.

## Usage in other projects
1. Install to the project `npm install --save @gatsby-tv/components`
2. Import the components `import { Sidebar, Navbar } from "@gatsby-tv/components";`

## Publish to npm
1. `npm install`
2. `npm run build`
3. `npm login`
4. `npm publish`

## Test and install on projects locally without needing to publish
1. `cd ~/components`
2. `npm link`
3. `cd ~/my-react-project`
4. `npm link @gatsby-tv/components`
5. Every time you make a change to this repo, make sure to run `npm run build` to update the link.

## Documentation
A brief overview and examples on usage of the components in this library.

### Sidebar
Creates a sidebar (navigation on the left side of the page) with `react-router-dom` links.

```ts
import { Sidebar } from "@gatsby-tv/components";
...
<Sidebar items={[
    { name: "test1", link: "/test1" },
    { name: "test2", link: "/test2" },
    { name: "test3", link: "/test3" },
    { name: "test4", link: "/test4" },
    { name: "test5", link: "/test5" }]} />
```

### Navbar
Creates a navbar (fixed navigation at the top of the page) with `react-router-dom` links.

```ts
import { Navbar } from "@gatsby-tv/components";
...
<Navbar items={[
    { name: "test1", link: "/test1" },
    { name: "test2", link: "/test2" },
    { name: "test3", link: "/test3" },
    { name: "test4", link: "/test4" },
    { name: "test5", link: "/test5" }]} />
```

# next-example
- consider incorporating ant-design and making this a portfolio (7/15/20)
----

## Statically Generate Pages with Dynamic Routes
- image: https://nextjs.org/static/images/learn/dynamic-routes/page-path-external-data.png
- Goal
    - Create Dynamic Pages for blog posts
    - Each post is to have path `/posts/<id>`
    - <id> = name of .md file under root `/posts` directory
- Paths to expect
    - `/posts/ssg-ssr` and `/posts/pre-rendering`
- Steps to take &rarr; an overview
    - (1) create a page called ‘[id].js’ under ‘pages/posts’
        - Pages wrapped with [] are dynamic in next
- `pages/posts/[id].js`
    - write code that will render a post page
```tsx
import Layout from '../../components/layout'

export default function Post() {
  return <Layout>...</Layout>
}
```

- export an async function &rarr; `getStaticPaths`
    - in this function, return a list of possible values for `id`
```tsx
import Layout from '../../components/layout'

export default function Post() {
  return <Layout>...</Layout>
}

export async function getStaticPaths() {
  // Return a list of possible value for id
}
```

- Then, implement `getStaticProps` once more
    - Fetch data for blog with corresponding `id`
    - `getStaticProps` is passed `params` which contains `id`

```tsx
import Layout from '../../components/layout'

export default function Post() {
  return <Layout>...</Layout>
}

export async function getStaticPaths() {
  // Return a list of possible value for id
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
}
```
- image: https://nextjs.org/static/images/learn/dynamic-routes/how-to-dynamic-routes.png

---

## Linking dynamically routed pages
- Use `[id]` for the `href` and the actual path `/posts/ssg-ssr` or `/posts/pre-rendering` for the `as` prop
```tsx
<Link href="/posts/[id]" as={`/posts/${id}`}>
    <a>{title}</a>
</Link>
```


- Data Fetching
    - https://nextjs.org/docs/basic-features/data-fetching
- Dynamic Routes
    - https://nextjs.org/docs/routing/dynamic-routes

## Essential info about Dynamic Routes

### Fetch External API or Query Database
- Like getStaticProps, getStaticPaths can fetch data from any data source. In our example, getAllPostIds (which is used by getStaticPaths) may fetch from an external API endpoint:

```tsx
export async function getAllPostIds() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch('..')
  const posts = await res.json()
  return posts.map(post => {
    return {
      params: {
        id: post.id
      }
    }
  })
}
```
### Development v.s. Production
- In development (npm run dev or yarn dev), getStaticPaths runs on every request.
- In production, getStaticPaths runs at build time.

### Fallback
- Recall that fallback returned false from getStaticPaths. What does this mean?
    - If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page.
    - If fallback is true, then the behavior of getStaticProps changes:

- The paths returned from getStaticPaths will be rendered to HTML at build time.
- The paths that have not been generated at build time will not result in a 404 page. Instead, Next.js will serve a “fallback” version of the page on the first request to such a path.
- In the background, Next.js will statically generate the requested path. Subsequent requests to the same path will serve the generated page, just like other pages pre-rendered at build time.
- Fallback: true documentation
    - https://nextjs.org/docs/basic-features/data-fetching#fallback-pages

### Catch-all Routes with Dynamic Routing
- Dynamic routes can be extended to catch all paths by adding three dots (...) inside the brackets. For example:
    - pages/posts/[...id].js matches /posts/a, but also /posts/a/b, /posts/a/b/c and so on.
    - If you do this, in getStaticPaths, you must return an array as the value of the id key like so:
```tsx
return [
  {
    params: {
      // Statically Generates /posts/a/b/c
      id: ['a', 'b', 'c']
    }
  }
  //...
]
And params.id will be an array in getStaticProps:

export async function getStaticProps({ params }) {
  // params.id will be like ['a', 'b', 'c']
}
```
- Dynamic Routes documentation for more
    - https://nextjs.org/docs/routing/dynamic-routes

### Router (useRouter Hook)
- Documentation for the Nextjs useRouter Hook
    - https://nextjs.org/docs/routing/dynamic-routes

### IMPORTANT &rarr; Relevant Examples
- Blog Starter using Markdown
    - https://github.com/vercel/next.js/tree/canary/examples/blog-starter
- DatoCMS 
    - https://github.com/vercel/next.js/tree/canary/examples/cms-datocms
- TakeShape
    - https://github.com/vercel/next.js/tree/canary/examples/cms-takeshape
- Sanity
    - https://github.com/vercel/next.js/tree/canary/examples/cms-sanity

---

## API Routes
- Next supports API Routes
    - Allows one to easily create an API endpoint as a Node.js function

### Creating API Routes
- Create a function inside the `pages/api` directory as follows
```tsx
export default (req, res) => {
    //...
}
```
- These can be deployed as Serverless Functions &rarr; Lambdas

### Prebuilt middlewares (req)
- https://nextjs.org/docs/api-routes/api-middlewares

### Helper functions (res)
- https://nextjs.org/docs/api-routes/response-helpers


### API Routes Details
- https://nextjs.org/docs/api-routes/dynamic-api-routes

### Do not fetch an API Route from `getStaticProps` or `getStaticPaths`
- Only use helper functions but never call them directly
- I repeat, never fetch from either of these
- Why?
    - `getStaticProps` and `getStaticPaths` only run server-side
    - Therefore, it will never be run client-side
    - So, it won't be included in the JS bundle for the browser
        - For example, direct database queries would never be sent to the browser

### Handling Form-Input &rarr; A Good Use-Case
- For example, you can create a form on your page and have it send a POST request to your API Route. 
- You can then write code to directly save it to your database. 
- The API Route code will not be part of your client bundle, so you can safely write server-side code.
```tsx
export default (req, _res) => {
    const email = req.body.email
    // then save email to database...etc...
}
```
### Preview Mode
- Static Generation is useful when your pages fetch data from a headless CMS. 
- However, it’s not ideal when you’re writing a draft on your headless CMS and want to preview the draft immediately on your page. 
    - You’d want Next.js to render these pages at request time instead of build time and fetch the draft content instead of the published content. 
    - You’d want Next.js to bypass Static Generation only for this specific case.

- Next.js has the feature called Preview Mode which solves this problem, and it utilizes API Routes.
- Preview Mode Documentation
    - https://nextjs.org/docs/advanced-features/preview-mode

### Dynamic API Routes
- API Routes can be dynamic just as Next pages can
- Documentation
    - https://nextjs.org/docs/api-routes/dynamic-api-routes

---
### Converting to TypeScript
- https://github.com/vercel/next-learn-starter/tree/master/typescript-final
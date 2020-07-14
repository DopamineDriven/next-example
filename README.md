# next-example

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
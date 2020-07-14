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
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "Next/Head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

export default function Post({ postData }) {
	return (
		<Layout>
			<Head>
				<title>{postData.title}</title>
			</Head>
			<article>
				<h1 className={utilStyles.headingX1}>{postData.title}</h1>
				<div className={utilStyles.lightText}>
					<Date dateString={postData.date} />
				</div>
				<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
			</article>
		</Layout>
	);
}

export async function getStaticPaths() {
	const paths = getAllPostIds();
	return {
		paths,
		fallback: false
	};
}

// updated to async after adding remark and remark-html in lib/posts
export async function getStaticProps({ params }) {
	const postData = await getPostData(params.id);
	return {
		props: {
			postData
		}
	};
}

/*
The array of possible values for id must be the value of the paths key of the returned object. 
This is exactly what getAllPostIds() returns.
*/

import React from "react";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import { GetStaticProps, GetStaticPaths } from "next";

export default function Post({
	postData
}: {
	postData: {
		title: string;
		date: string;
		contentHtml: string;
	};
}) {
	return (
		<Layout>
			<Head>
				<title>{postData.title}</title>
			</Head>
			<article>
				<h1 style={styles.h1}>{postData.title}</h1>
				<div style={styles.lightText}>
					<Date dateString={postData.date} />
				</div>
				<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
			</article>
		</Layout>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = getAllPostIds();
	return {
		paths,
		fallback: false
	};
};

// updated to async after adding remark and remark-html in lib/posts
export const getStaticProps: GetStaticProps = async ({ params }) => {
	const postData = await getPostData(params.id as string);
	return {
		props: {
			postData
		}
	};
};

/*
The array of possible values for id must be the value of the paths key of the returned object. 
This is exactly what getAllPostIds() returns.
*/

const styles: { [k: string]: React.CSSProperties } = {
	h1: {
		fontSize: "2rem",
		lineHeight: 1.3,
		fontWeight: 800,
		letterSpacing: "-0.05rem",
		margin: "1rem 0"
	},
	lightText: {
		color: "#666"
	}
};

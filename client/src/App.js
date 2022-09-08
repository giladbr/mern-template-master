import { useEffect, useState } from "react";
const API_URL = process.env.REACT_APP_API;

const ArticleHeader = ({ title, urlToImage, publishedAt, source, author, url }) => {
    return <div className="articleHeader">
        <div className="headerLeft">
            <div className="articleMeta">
                {url && <a className="url" href={url} target="_blank">
                    {author &&
                        <p className="authorWrapper">
                            by
                            <span className="author">{author}</span>
                        </p>
                    }
                </a>}
                {publishedAt && <span className="publishedAt">Published at {new Date(publishedAt).toDateString()}</span>}
            </div>
            <p className="title">{title}</p>
        </div>
        {urlToImage && <img src={urlToImage} />}
    </div>
}


function App() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        async function getData() {
            const url = `${API_URL}/news`;
            const response = await fetch(url);
            const data = await response.json();
            setArticles(data.articles);
        }
        getData();
    }, []);

    return (
        <section id="articlesWrapper">
            {articles.map(({ description, ...articleProps }, i) => (
                <div className="article" key={i}>
                    <ArticleHeader {...articleProps} />
                    <div>{description}</div>

                </div>
            ))}
        </section>
    );
}

export default App;

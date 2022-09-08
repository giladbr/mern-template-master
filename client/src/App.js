import { useEffect, useState } from "react";
const API_URL = process.env.REACT_APP_API;

const ArticleHeader = ({ title, urlToImage, wordCount, publishedAt, source, author, url }) => {
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
                {publishedAt && <div className="publishedAt">Published at {new Date(publishedAt).toDateString()}</div>}
                {wordCount && <div className="wordCount">Word Count: {wordCount}</div>}
            </div>
            <p className="title">{title}</p>
        </div>
        {urlToImage && <img src={urlToImage} />}
    </div>
}


function App() {
    const [articles, setArticles] = useState([]);
    const [articlesToShow, setArticlesToShow] = useState(20);

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
        <div id="main">
            <h1>News Feed</h1>
            <div className="articlesToShow">
                <span>Articles to show:</span>
                <select value={articlesToShow} onChange={(e) => setArticlesToShow(e.target.value)}>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>
            <section id="articlesWrapper">
                {articles.length === 0 ?
                    <div className="loader">Please wait, fetching articles...</div>
                    :
                    articles.slice(0, articlesToShow).map(({ description, ...articleProps }, i) => (
                        <div className="article" key={i}>
                            <ArticleHeader {...articleProps} />
                            <div>{description}</div>
                        </div>
                    ))}
            </section>
        </div>
    );
}

export default App;

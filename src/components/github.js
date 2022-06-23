import React from "react"
import "./github.css"
import loading from "../img/loading.gif"

function Github(){

    const [inputValue, setInputValue] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [repos, setRepos] = React.useState([])

    React.useEffect(()=>{
        if(!inputValue){
            return
        }

        setIsLoading(true)

    fetch("https://api.github.com/search/repositories?q=" + inputValue)
        .then(response =>{
            return response.json()
        })
        .then(data =>{
            setIsLoading(false)
            setRepos(data.items)
        })
        .catch(err =>{
            setIsLoading(false)
            setError(true)
            console.error(err)
        })
    }, [inputValue])

    return(
        <div>
            <nav>
                <div className="icon"> Repositórios <b>Github</b></div>
                <div className="searchbox">
                    <form onSubmit={evt =>{
                        evt.preventDefault();
                        setInputValue(evt.target.elements.query.value)
                    }}>
                        <input type="text" name="query" placeholder="Pesquisar"/>
                    </form>
                </div>
            </nav>
            <ul className="repositories">
                {isLoading && 
                    <div className="alert">
                        <img src={loading} alt="loading"/>
                        <h1>Carregando...</h1>
                    </div>
                }

                {error &&
                    <div>
                        <span class="material-symbols-outlined">error</span>
                        <h1>Ocorreu um erro inesperado... tente novamente!</h1>
                    </div>
                }

                {repos.map(repo =>{
                    return (
                        <li key={repo.id} className="card">
                            <span id="book" className="material-symbols-outlined"> book </span>
                            <a href={repo.html_url} className="link">{repo.name}</a>
                            <p className="desc">{repo.description}</p>
                            <ul className="info">
                                <li><span className="material-symbols-outlined sm_icon">star</span>{repo.stargazers_count}</li>
                                <li><span className="material-symbols-outlined sm_icon">visibility</span>{repo.watchers_count +" Watchers"}</li>
                                <li><span class="material-symbols-outlined sm_icon">account_tree</span>{repo.forks_count + " Forks"}</li>
                                <li><span class="material-symbols-outlined sm_icon">warning</span>{repo.open_issues_count + " Issues"}</li>
                                <li id="lang">{repo.language}</li>
                            </ul>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default Github
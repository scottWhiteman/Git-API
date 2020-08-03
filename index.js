const BASE_URL = "https://api.github.com/users"

const listTemplate = (repos) => {
    return `
    <li>
        <a href="${repos.url}">${repos.name}</a>
    </li>`
}

const displayRepos = (resJson) => {
    console.log(resJson[0].name + " " + resJson[0].url);
    const results = resJson.reduce((fullList, repos) => {
        return fullList += listTemplate(repos);
    }, '');
    $('#repos-list').html(results);
}

const runApiSearch = (user) => {
    fetch(`${BASE_URL}/${user}/repos`)
        .then(res => res.json())
        .then(resJson => displayRepos(resJson))
        .catch(error => console.log("Errors"));
}

const handleSearch = () => {
    $('#git-form').on('submit', (e) => {
        e.preventDefault();
        const handleSearch = $('#user-input').val();
        runApiSearch(handleSearch);
    });
}

$(handleSearch);
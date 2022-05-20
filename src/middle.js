
const Middle = () => {
    const handleClick = () => {

        let outputId = document.getElementById('outputDiv');

        let repoId = document.getElementById('repo');

        outputId.innerHTML="";
        repoId.innerHTML="";

        let access = document.getElementById('access').value;
        let secret = document.getElementById('secret').value;
        let host = document.getElementById('host').value;

        let ans = "https://{"+host+"}/v2/LeadManagement.svc/Lead.Capture?accessKey="+access+"&secretKey="+secret;

        console.log(ans);

        // let ans = reqName;

        fetch(ans).then((data) => data.json())
            .then((data) => {

                let outputId = document.getElementById('outputDiv');

                let allUrls = "";

                fetch(data.repos_url)
                    .then((urls) => urls.json())
                    .then((url) => {

                        for (let i = 0; i < url.length - 1; i++) {

                            let h3Id = document.getElementById('headH3');
                            h3Id.style.display = "block";

                            let repoDiv = document.getElementById('repoDiv');
                            repoDiv.style.borderColor = "wheat";

                            allUrls = url[i].html_url;

                            let repoId = document.getElementById('repo');
                            let repoData = repoId.innerHTML;
                            if(repoData!='')
                                repoData += allUrls;
                            repoId.innerHTML = `
                                <p>${repoData}</p>
                            `
                        }
                    })

            outputId.innerHTML = `
            <div class="profile">
                
                <div>
                    <p> Login ID :  ${data.login}</p>
                </div>

                <div>
                    <p> Created At :  ${data.created_at}</p>
                </div>
            </div>
            `;
                console.log(data);
            });
    }

    return ( // In this return section jsx file will be there
        <div id="middle">

            <div id="inputDiv">

                <form id="info">
                    <input type="text" id="access" placeholder='Access Key'></input>
                    <input type="text" id="secret" placeholder='Secret Key'></input>
                    <input type="text" id="host" placeholder='Host'></input>

                    <input type="button" value="Search" onClick={handleClick}></input>
                </form>

            </div>

            <div id="outputDiv">
            </div>

            <div id="repoDiv">
            <h3 id="headH3">List Of Repo</h3>
                <div id="repo">
                </div>
            </div>

        </div>

    );
}

export default Middle;
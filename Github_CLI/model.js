import axios from 'axios'


async function displayLogsForUser(username) {

    const resp = await axios.get(`https://api.github.com/users/${username}/events`).catch(
        () => {
            console.log('Username Not Found');
    })
    const data = resp.data;
    console.log(data);
    
    const size = data.length;
    
    if (!size) {
        console.log('No Recent Activity')
        return;
    }

    let i = 0;
    console.log("Output: \n");
    for (i; i < size; i++) {
        let log = data[i];
        
        if (log.type == "PushEvent") {
            if (log.payload.size == 1) {
                console.log(` - Pushed ${log.payload.size} commit to ${log.repo.name}`);
            } else {
            console.log(` - Pushed ${log.payload.size} commits to ${log.repo.name}`); 
                }
            }
        else if (log.type == "PullRequestEvent") {
            console.log(` - Made a Pull Request For ${log.repo.name}`);
        } else if (log.type == "CreateEvent") {
            console.log(` - Created Repo Called ${log.repo.name}`);
        } else if (log.type == "DeleteEvent") {
            console.log(` - Committed a deletion to ${log.repo.name}`);
        }
    }
    return;
}

export default displayLogsForUser;
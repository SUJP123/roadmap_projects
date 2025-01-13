import axios from 'axios'
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function displayLogsForUser(username) {

    const resp = await axios.get(`https://api.github.com/users/${username}/events`).catch(
        () => {
            console.log('Username Not Found');
    })

    if (!resp) {
        console.log('Invalid Username');
        return;
    }

    const data = resp.data;
    
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

async function askQuestion() {
    await rl.question('\nInput the username you want to check: ', (name) => {
                console.log("\n")
                displayLogsForUser(name);
                console.log('--------------------------------------------------------');
                console.log('\n');
                setTimeout(() => {
                    askQuestion()
                }, 2000)
            });
}

export default askQuestion;
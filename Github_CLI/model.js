import axios from 'axios'
import { Octokit } from "octokit";


const octokit = new Octokit({ 
    auth: process.env.API_KEY
});



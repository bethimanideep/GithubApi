const mongoose = require('mongoose');
const ownershema= new mongoose.Schema({
  id: Number,
  avatar_url: String,
  html_url: String,
  type: String,
  site_admin: Boolean,
},{
  versionKey: false,

})
const githubRepoSchema = new mongoose.Schema({
  id: Number,
  name: String,
  html_url: String,
  description:String,
  created_at: Date,
  open_issues: Number,
  watchers: Number,
  owner: {
    type:ownershema
  },
}, {
  versionKey: false,
});

const GitHubRepo = mongoose.model('GitHubRepo', githubRepoSchema);


module.exports={GitHubRepo}

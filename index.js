let name = process.argv[2];
if (!name) {
  console.log("Usage: node index.js <Github Username (Case-sensitive)>");
  return 1;
}

async function getUserActivities(username) {
  const url = `https://api.github.com/users/${username}/events`;

  try {
    const userData = await fetch(url);
    if (userData.status == 404) {
      console.log("User Not Found");
      return 1;
    }
    const result = await userData.json();
    console.log(`Github Username: ${username}`);
    console.log("User Last Activities: ");
    result.forEach((object) => {
      let type = object.type;
      let repo = object.repo.name;
      let branch = object.payload.master_branch;
      switch (type) {
        case "CommitCommentEvent":
          console.log(`- Commented on ${repo}`);
          break;

        case "CreateEvent":
          console.log(`- Created a branch ${branch} in ${repo}`);
          break;

        case "DeleteEvent":
          console.log(`- Deleted a branch ${branch} in ${repo}`);
          break;

        case "ForkEvent":
          console.log(`- Forked ${repo}`);
          break;

        case "GollumEvent":
          console.log(`- Created/Updated wiki in ${repo}`);
          break;

        case "IssueCommentEvent":
          console.log(`- Commented on an issue from ${repo}`);
          break;

        case "IssuesEvent":
          console.log(`- Created an issue in ${repo}`);
          break;

        case "MemberEvent":
          console.log(`- Members changed in ${repo}`);
          break;

        case "PublicEvent":
          console.log(`- Changed ${repo} to public`);
          break;

        case "PushEvent":
          console.log(`- Created commits in ${repo}`);
          break;

        case "WatchEvent":
          console.log(`- Starred ${repo}`);
          break;

        default:
          console.log("- Event unknown:", type);
      }
    });
  } catch (err) {
    console.error(err.message);
  }
}

getUserActivities(name);

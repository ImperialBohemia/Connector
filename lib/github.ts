/**
 * THE MESSENGER: Allows the Agent to autonomously commit changes back to the Brain (GitHub).
 */

export async function commitFileUpdate(
    owner: string,
    repo: string,
    path: string,
    content: string,
    message: string,
    token: string
  ): Promise<boolean> {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    try {
      // 1. Get current SHA (Required for update)
      const getResponse = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
        }
      });

      if (!getResponse.ok) {
        console.error("GitHub Get Error:", await getResponse.text());
        return false;
      }

      const fileData = await getResponse.json();
      const sha = fileData.sha;

      // 2. Push Update
      const putResponse = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          content: Buffer.from(content).toString('base64'),
          sha: sha,
          committer: {
            name: "Connector Optimization Bot",
            email: "bot@connector.ai"
          }
        })
      });

      if (putResponse.ok) {
        console.log(`✅ GitHub Commit Success: ${message}`);
        return true;
      } else {
        console.error("GitHub Commit Error:", await putResponse.text());
        return false;
      }

    } catch (error) {
      console.error("GitHub API Connection Failed:", error);
      return false;
    }
  }

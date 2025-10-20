import { Octokit } from '@octokit/rest';
import { PortfolioData } from '../types/portfolio';

export interface GitHubConfig {
  token: string;
  owner: string;
  repo: string;
}

export async function fetchDataFromGitHub(config: GitHubConfig): Promise<PortfolioData | null> {
  try {
    const octokit = new Octokit({ auth: config.token });
    
    const { data } = await octokit.repos.getContent({
      owner: config.owner,
      repo: config.repo,
      path: 'public/data.json',
    });

    if ('content' in data) {
      const content = atob(data.content);
      return JSON.parse(content);
    }
    return null;
  } catch (error) {
    console.error('Error fetching from GitHub:', error);
    return null;
  }
}

export async function pushDataToGitHub(
  config: GitHubConfig,
  data: PortfolioData,
  message: string = 'Update portfolio data'
): Promise<boolean> {
  try {
    const octokit = new Octokit({ auth: config.token });
    
    // Get current file SHA
    let sha: string | undefined;
    try {
      const { data: fileData } = await octokit.repos.getContent({
        owner: config.owner,
        repo: config.repo,
        path: 'public/data.json',
      });
      if ('sha' in fileData) {
        sha = fileData.sha;
      }
    } catch {
      // File doesn't exist yet, that's okay
    }

    const content = btoa(JSON.stringify(data, null, 2));

    await octokit.repos.createOrUpdateFileContents({
      owner: config.owner,
      repo: config.repo,
      path: 'public/data.json',
      message,
      content,
      sha,
    });

    return true;
  } catch (error) {
    console.error('Error pushing to GitHub:', error);
    return false;
  }
}

export function validateGitHubConfig(config: Partial<GitHubConfig>): config is GitHubConfig {
  return !!(config.token && config.owner && config.repo);
}


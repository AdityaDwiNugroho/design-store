import { Octokit } from '@octokit/rest';

if (!process.env.GITHUB_TOKEN) {
  console.warn('GITHUB_TOKEN not set - GitHub integration will not work');
}

// Initialize GitHub API client
export const github = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export interface GitHubRepoAccess {
  owner: string;
  repo: string;
  username: string;
  permission: 'read' | 'write' | 'admin';
}

/**
 * Add a user as a collaborator to a private repository
 */
export async function addRepositoryAccess({
  owner,
  repo,
  username,
  permission = 'read'
}: GitHubRepoAccess): Promise<{ success: boolean; message: string }> {
  try {
    // Add user as collaborator with read-only access
    await github.rest.repos.addCollaborator({
      owner,
      repo,
      username,
      permission,
    });

    console.log(`✅ Added ${username} as ${permission} collaborator to ${owner}/${repo}`);
    
    return {
      success: true,
      message: `Successfully granted ${permission} access to ${owner}/${repo}`
    };
  } catch (error: unknown) {
    console.error('❌ Failed to add repository access:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const status = (error as { status?: number }).status;
    
    if (status === 404) {
      return {
        success: false,
        message: 'Repository not found or user does not exist'
      };
    }
    
    if (status === 422) {
      return {
        success: false,
        message: 'User may already have access or username is invalid'
      };
    }

    return {
      success: false,
      message: `Failed to grant access: ${errorMessage}`
    };
  }
}

/**
 * Remove a user's access from a repository
 */
export async function removeRepositoryAccess({
  owner,
  repo,
  username
}: Omit<GitHubRepoAccess, 'permission'>): Promise<{ success: boolean; message: string }> {
  try {
    await github.rest.repos.removeCollaborator({
      owner,
      repo,
      username,
    });

    console.log(`✅ Removed ${username} from ${owner}/${repo}`);
    
    return {
      success: true,
      message: `Successfully removed access from ${owner}/${repo}`
    };
  } catch (error: unknown) {
    console.error('❌ Failed to remove repository access:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return {
      success: false,
      message: `Failed to remove access: ${errorMessage}`
    };
  }
}

/**
 * Check if a user has access to a repository
 */
export async function checkRepositoryAccess({
  owner,
  repo,
  username
}: Omit<GitHubRepoAccess, 'permission'>): Promise<{ hasAccess: boolean; permission?: string }> {
  try {
    const response = await github.rest.repos.getCollaboratorPermissionLevel({
      owner,
      repo,
      username,
    });

    return {
      hasAccess: true,
      permission: response.data.permission
    };
  } catch (error: unknown) {
    const status = (error as { status?: number }).status;
    
    if (status === 404) {
      return { hasAccess: false };
    }
    
    console.error('❌ Failed to check repository access:', error);
    return { hasAccess: false };
  }
}

/**
 * Get repository information
 */
export async function getRepositoryInfo(owner: string, repo: string) {
  try {
    const response = await github.rest.repos.get({
      owner,
      repo,
    });

    return {
      success: true,
      data: {
        name: response.data.name,
        fullName: response.data.full_name,
        description: response.data.description,
        private: response.data.private,
        url: response.data.html_url,
        cloneUrl: response.data.clone_url,
        sshUrl: response.data.ssh_url,
      }
    };
  } catch (error: unknown) {
    console.error('❌ Failed to get repository info:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return {
      success: false,
      message: errorMessage
    };
  }
}

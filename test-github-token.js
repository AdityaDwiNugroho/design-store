// Test script to verify GitHub token
import { github } from '@/lib/github';

async function testGitHubToken() {
  try {
    console.log('🔍 Testing GitHub token...');
    
    // Test basic API access
    const { data: user } = await github.rest.users.getAuthenticated();
    console.log('✅ Token is valid! Authenticated as:', user.login);
    console.log('📊 Token permissions:', user.permissions);
    
    // Test repository access
    const { data: repos } = await github.rest.repos.listForAuthenticatedUser({
      visibility: 'private',
      per_page: 5
    });
    
    console.log('📦 Private repositories accessible:', repos.length);
    repos.forEach(repo => {
      console.log(`  - ${repo.full_name} (${repo.private ? 'private' : 'public'})`);
    });
    
  } catch (error) {
    console.error('❌ GitHub token test failed:', error);
  }
}

testGitHubToken();

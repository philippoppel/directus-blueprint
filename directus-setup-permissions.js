import { createDirectus, authentication, rest, readRoles, readPermissions, createPermission, updatePermission, deletePermission } from '@directus/sdk';

async function setupPublicPermissions() {
  const directus = createDirectus('https://directus-6t0d.onrender.com')
    .with(authentication())
    .with(rest());

  try {
    // Login as admin
    await directus.login('admin@example.com', 'directus123');
    console.log('✅ Logged into Directus successfully');

    // Get all roles to find the public role
    const roles = await directus.request(readRoles());
    const publicRole = roles.find(role => role.id === null || role.name === 'Public');
    
    console.log('Available roles:', roles.map(r => ({ id: r.id, name: r.name })));

    // Public role in Directus has id = null
    const publicRoleId = null;

    // Get existing permissions for public role
    const existingPermissions = await directus.request(readPermissions({
      filter: { role: { _eq: publicRoleId } }
    }));

    console.log('Existing public permissions:', existingPermissions.length);

    // Collections that need public read access
    const collections = ['pages', 'gallery'];
    
    for (const collection of collections) {
      try {
        // Check if permission already exists for this collection
        const existingPermission = existingPermissions.find(
          p => p.collection === collection && p.action === 'read'
        );

        if (existingPermission) {
          console.log(`ℹ️  Public read permission for ${collection} already exists, updating...`);
          
          await directus.request(updatePermission(existingPermission.id, {
            role: publicRoleId,
            collection: collection,
            action: 'read',
            permissions: {}, // No restrictions
            validation: {},  // No validation rules
            presets: {},     // No presets
            fields: ['*']    // All fields
          }));
          
          console.log(`✅ Updated public read permission for ${collection}`);
        } else {
          console.log(`Creating new public read permission for ${collection}...`);
          
          await directus.request(createPermission({
            role: publicRoleId,
            collection: collection,
            action: 'read',
            permissions: {}, // No restrictions
            validation: {},  // No validation rules
            presets: {},     // No presets
            fields: ['*']    // All fields
          }));
          
          console.log(`✅ Created public read permission for ${collection}`);
        }
      } catch (error) {
        console.error(`❌ Error setting permission for ${collection}:`, error.message);
        if (error.response?.data) {
          console.error('Error details:', error.response.data);
        }
      }
    }

    console.log('🎉 Public permissions setup completed!');
    console.log('🔗 Your frontend should now be able to access the API');
    console.log('📝 Test the API manually: https://directus-6t0d.onrender.com/items/pages');

  } catch (error) {
    console.error('❌ Permission setup failed:', error);
    if (error.response?.data) {
      console.error('Error details:', error.response.data);
    }
  }
}

setupPublicPermissions();
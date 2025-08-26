import { createDirectus, authentication, rest, createRole, updateRole, createPermission } from '@directus/sdk';

async function configurePublicAccess() {
  const directus = createDirectus('http://localhost:8055')
    .with(authentication())
    .with(rest());

  try {
    await directus.login('admin@example.com', 'directus123');
    console.log('✅ Logged into Directus successfully');

    // Create Public role for anonymous access
    try {
      const publicRole = await directus.request(createRole({
        name: 'Public',
        icon: 'public',
        description: 'Role for anonymous public access'
      }));
      console.log('✅ Created Public role:', publicRole.id);

      // Set permissions for pages collection
      await directus.request(createPermission({
        role: publicRole.id,
        collection: 'pages',
        action: 'read',
        permissions: {
          published: { _eq: true }
        }
      }));

      // Set permissions for gallery collection  
      await directus.request(createPermission({
        role: publicRole.id,
        collection: 'gallery',
        action: 'read',
        permissions: {}
      }));

      // Set permissions for directus_files collection (for images)
      await directus.request(createPermission({
        role: publicRole.id,
        collection: 'directus_files',
        action: 'read',
        permissions: {}
      }));

      console.log('✅ Set read permissions for Public role');

      // Update settings to use public role
      await directus.request(updateRole(publicRole.id, {
        public_registration: true,
        public_registration_verify_email: false,
        public_registration_role: publicRole.id
      }));

      console.log('✅ Updated role settings for public access');

    } catch (error) {
      if (error.message.includes('already exists') || error.message.includes('unique constraint')) {
        console.log('ℹ️  Public role configuration already exists');
      } else {
        console.error('❌ Error configuring public access:', error.message);
      }
    }

  } catch (error) {
    console.error('❌ Configuration failed:', error);
  }
}

configurePublicAccess();
import { createDirectus, authentication, rest, readCollections, createCollection, readFields, createField, readItems, createItem } from '@directus/sdk';

async function bootstrapDirectus() {
  const directus = createDirectus('http://localhost:8055')
    .with(authentication())
    .with(rest());

  try {
    // Login as admin
    await directus.login('admin@example.com', 'directus123');

    console.log('✅ Logged into Directus successfully');

    // Create collections
    const collections = [
      {
        collection: 'pages',
        meta: {
          icon: 'description',
          note: 'Website pages collection'
        },
        schema: {
          name: 'pages'
        }
      },
      {
        collection: 'gallery',
        meta: {
          icon: 'photo_library',
          note: 'Image gallery collection'
        },
        schema: {
          name: 'gallery'
        }
      }
    ];

    for (const collection of collections) {
      try {
        await directus.request(createCollection(collection));
        console.log(`✅ Created collection: ${collection.collection}`);
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`ℹ️  Collection ${collection.collection} already exists`);
        } else {
          console.error(`❌ Error creating collection ${collection.collection}:`, error.message);
        }
      }
    }

    // Create fields for pages collection
    const pageFields = [
      {
        collection: 'pages',
        field: 'title',
        type: 'string',
        meta: {
          interface: 'input',
          required: true,
          options: {}
        }
      },
      {
        collection: 'pages',
        field: 'slug',
        type: 'string',
        meta: {
          interface: 'input',
          required: true,
          options: {}
        }
      },
      {
        collection: 'pages',
        field: 'content',
        type: 'text',
        meta: {
          interface: 'input-rich-text-html',
          options: {}
        }
      },
      {
        collection: 'pages',
        field: 'hero_image',
        type: 'uuid',
        meta: {
          interface: 'file-image',
          special: ['file'],
          options: {}
        }
      },
      {
        collection: 'pages',
        field: 'published',
        type: 'boolean',
        meta: {
          interface: 'boolean',
          default_value: false,
          options: {}
        }
      }
    ];

    // Create fields for gallery collection
    const galleryFields = [
      {
        collection: 'gallery',
        field: 'title',
        type: 'string',
        meta: {
          interface: 'input',
          required: true,
          options: {}
        }
      },
      {
        collection: 'gallery',
        field: 'description',
        type: 'text',
        meta: {
          interface: 'input-multiline',
          options: {}
        }
      },
      {
        collection: 'gallery',
        field: 'image',
        type: 'uuid',
        meta: {
          interface: 'file-image',
          special: ['file'],
          required: true,
          options: {}
        }
      },
      {
        collection: 'gallery',
        field: 'alt_text',
        type: 'string',
        meta: {
          interface: 'input',
          options: {}
        }
      }
    ];

    const allFields = [...pageFields, ...galleryFields];

    for (const field of allFields) {
      try {
        const { collection, ...fieldData } = field;
        await directus.request(createField(collection, fieldData));
        console.log(`✅ Created field: ${field.collection}.${field.field}`);
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`ℹ️  Field ${field.collection}.${field.field} already exists`);
        } else {
          console.error(`❌ Error creating field ${field.collection}.${field.field}:`, error.message);
        }
      }
    }

    // Create sample pages
    const samplePages = [
      {
        title: 'Willkommen',
        slug: 'home',
        content: '<h1>Willkommen auf unserer Website</h1><p>Dies ist eine beispielhafte Homepage, die mit Directus als Headless CMS verwaltet wird. Der Content kann einfach und sicher über das Directus Admin Panel bearbeitet werden.</p>',
        published: true
      },
      {
        title: 'Über uns',
        slug: 'about',
        content: '<h1>Über uns</h1><p>Wir sind ein innovatives Team, das moderne Web-Technologien einsetzt, um benutzerfreundliche und effiziente Lösungen zu entwickeln.</p><p>Diese Website demonstriert die Kombination aus Directus als Headless CMS und Next.js als Frontend-Framework.</p>',
        published: true
      },
      {
        title: 'Kontakt',
        slug: 'contact',
        content: '<h1>Kontakt</h1><p>Nehmen Sie gerne Kontakt mit uns auf:</p><ul><li>E-Mail: info@example.com</li><li>Telefon: +49 123 456789</li><li>Adresse: Musterstraße 1, 12345 Musterstadt</li></ul>',
        published: true
      }
    ];

    for (const page of samplePages) {
      try {
        await directus.request(createItem('pages', page));
        console.log(`✅ Created sample page: ${page.title}`);
      } catch (error) {
        console.error(`❌ Error creating page ${page.title}:`, error.message);
      }
    }

    // Create sample gallery items
    const sampleGallery = [
      {
        title: 'Beispielbild 1',
        description: 'Ein wunderschönes Landschaftsbild',
        alt_text: 'Landschaft mit Bergen und See'
      },
      {
        title: 'Beispielbild 2',
        description: 'Moderne Architektur im urbanen Raum',
        alt_text: 'Moderne Gebäude in der Stadt'
      },
      {
        title: 'Beispielbild 3',
        description: 'Naturfotografie in bester Qualität',
        alt_text: 'Blumen in einem Garten'
      }
    ];

    for (const item of sampleGallery) {
      try {
        await directus.request(createItem('gallery', item));
        console.log(`✅ Created sample gallery item: ${item.title}`);
      } catch (error) {
        console.error(`❌ Error creating gallery item ${item.title}:`, error.message);
      }
    }

    console.log('🎉 Directus bootstrap completed successfully!');
    console.log('📝 Admin Panel: http://localhost:8055');
    console.log('🔑 Login: admin@example.com / directus123');

  } catch (error) {
    console.error('❌ Bootstrap failed:', error);
  }
}

bootstrapDirectus();
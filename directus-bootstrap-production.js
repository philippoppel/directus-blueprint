import { createDirectus, authentication, rest, readCollections, createCollection, readFields, createField, readItems, createItem } from '@directus/sdk';

async function bootstrapDirectusProduction() {
  const directus = createDirectus('https://directus-6t0d.onrender.com')
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
        content: '<h1>Willkommen auf unserer Website</h1><p>Dies ist eine beispielhafte Homepage, die mit Directus als Headless CMS verwaltet wird. Der Content kann einfach und sicher über das Directus Admin Panel bearbeitet werden.</p><p>Diese Demo zeigt die Integration zwischen dem deployed Directus Backend auf Render und einem Frontend.</p>',
        published: true
      },
      {
        title: 'Über uns',
        slug: 'about',
        content: '<h1>Über uns</h1><p>Wir sind ein innovatives Team, das moderne Web-Technologien einsetzt, um benutzerfreundliche und effiziente Lösungen zu entwickeln.</p><p>Diese Website demonstriert die Kombination aus Directus als Headless CMS und Next.js als Frontend-Framework.</p><h2>Technologien</h2><ul><li>Directus - Headless CMS</li><li>Next.js - Frontend Framework</li><li>Render - Deployment Platform</li><li>PostgreSQL - Database</li></ul>',
        published: true
      },
      {
        title: 'Kontakt',
        slug: 'contact',
        content: '<h1>Kontakt</h1><p>Nehmen Sie gerne Kontakt mit uns auf:</p><ul><li>E-Mail: info@example.com</li><li>Telefon: +49 123 456789</li><li>Adresse: Musterstraße 1, 12345 Musterstadt</li></ul><h2>Öffnungszeiten</h2><p>Montag bis Freitag: 9:00 - 17:00 Uhr<br>Samstag: 10:00 - 14:00 Uhr<br>Sonntag: Geschlossen</p>',
        published: true
      },
      {
        title: 'Services',
        slug: 'services',
        content: '<h1>Unsere Services</h1><p>Wir bieten eine Vielzahl von digitalen Lösungen:</p><h2>Web Development</h2><p>Moderne, responsive Websites mit den neuesten Technologien.</p><h2>CMS Integration</h2><p>Nahtlose Integration von Content Management Systemen wie Directus.</p><h2>API Development</h2><p>Robuste und skalierbare APIs für verschiedene Anwendungen.</p>',
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
        title: 'Directus Dashboard',
        description: 'Das intuitive Admin Interface von Directus ermöglicht einfaches Content Management',
        alt_text: 'Directus Admin Dashboard Screenshot'
      },
      {
        title: 'Moderne Webentwicklung',
        description: 'Kombination aus bewährten und innovativen Technologien für optimale Ergebnisse',
        alt_text: 'Code Editor mit modernem JavaScript'
      },
      {
        title: 'Responsive Design',
        description: 'Websites die auf allen Geräten perfekt funktionieren',
        alt_text: 'Responsive Website auf verschiedenen Geräten'
      },
      {
        title: 'API-First Architektur',
        description: 'Flexible und erweiterbare Lösungen durch API-zentrierte Entwicklung',
        alt_text: 'API Dokumentation und Endpunkte'
      },
      {
        title: 'Cloud Deployment',
        description: 'Sichere und skalierbare Bereitstellung in der Cloud',
        alt_text: 'Cloud Infrastructure Diagramm'
      },
      {
        title: 'Performance Optimierung',
        description: 'Schnelle Ladezeiten und optimierte Benutzererfahrung',
        alt_text: 'Website Performance Metrics'
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

    console.log('🎉 Production Directus bootstrap completed successfully!');
    console.log('📝 Admin Panel: https://directus-6t0d.onrender.com/admin');
    console.log('🔑 Login: admin@example.com / directus123');
    console.log('🌐 Frontend should now display content from the production backend');

  } catch (error) {
    console.error('❌ Bootstrap failed:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

bootstrapDirectusProduction();
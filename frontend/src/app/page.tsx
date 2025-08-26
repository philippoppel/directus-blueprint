import { directus, type Page, type GalleryItem } from '@/lib/directus';
import { readItems } from '@directus/sdk';
import Link from 'next/link';

export default async function Home() {
  let pages: Page[] = [];
  let galleryItems: GalleryItem[] = [];

  try {
    const pagesResult = await directus.request(readItems('pages', {
      filter: { published: { _eq: true } },
      sort: ['date_created']
    }));
    pages = pagesResult as Page[];
  } catch (error) {
    console.error('Error fetching pages:', error);
  }

  try {
    const galleryResult = await directus.request(readItems('gallery', {
      limit: 6
    }));
    galleryItems = galleryResult as GalleryItem[];
  } catch (error) {
    console.error('Error fetching gallery:', error);
  }

  const heroPage = pages.find(page => page.slug === 'home');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Directus Blueprint
            </Link>
            <nav className="flex space-x-6">
              {pages.map((page) => (
                <Link 
                  key={page.id} 
                  href={`/${page.slug}`}
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  {page.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {heroPage ? (
            <div className="text-center">
              <div 
                className="prose prose-lg mx-auto"
                dangerouslySetInnerHTML={{ __html: heroPage.content }}
              />
            </div>
          ) : (
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Willkommen auf unserer Website
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Diese Website wird mit Directus als Headless CMS verwaltet und 
                zeigt die nahtlose Integration zwischen Backend und Frontend.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Gallery Section */}
      {galleryItems.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Galerie
              </h2>
              <p className="text-lg text-gray-600">
                Unsere neuesten Bilder und Impressionen
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">
                      {item.image ? 'Image' : 'Placeholder'}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-gray-600">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Warum Directus?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Einfache Verwaltung
              </h3>
              <p className="text-gray-600">
                Intuitive Benutzeroberfläche für das Content Management
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Sicher & Zuverlässig
              </h3>
              <p className="text-gray-600">
                Robuste Sicherheitsfeatures und verlässliche Performance
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Flexibel & Erweiterbar
              </h3>
              <p className="text-gray-600">
                API-first Ansatz für maximale Flexibilität
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-300">
              © 2024 Directus Blueprint. Erstellt mit Directus und Next.js.
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              <a 
                href="http://localhost:8055" 
                target="_blank"
                className="text-gray-300 hover:text-white"
              >
                Admin Panel
              </a>
              <a 
                href="https://directus.io" 
                target="_blank"
                className="text-gray-300 hover:text-white"
              >
                Directus
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
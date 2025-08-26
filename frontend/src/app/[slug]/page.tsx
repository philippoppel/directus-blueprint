import { directus, type Page as PageType } from '@/lib/directus';
import { readItems } from '@directus/sdk';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  let pages: PageType[] = [];
  let currentPage: PageType | null = null;

  try {
    const result = await directus.request(readItems('pages', {
      filter: { published: { _eq: true } },
      sort: ['date_created']
    }));
    pages = result as PageType[];

    currentPage = pages.find(page => page.slug === params.slug) || null;
  } catch (error) {
    console.error('Error fetching pages:', error);
  }

  if (!currentPage) {
    notFound();
  }

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
                  className={`font-medium ${
                    page.slug === params.slug
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {page.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="bg-white rounded-lg shadow-sm p-8">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {currentPage.title}
              </h1>
              <div className="text-sm text-gray-500">
                Zuletzt aktualisiert: {new Date(currentPage.date_updated).toLocaleDateString('de-DE')}
              </div>
            </header>
            
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: currentPage.content }}
            />
          </article>
        </div>
      </main>

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
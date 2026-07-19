/**
 * Get the alternate language URL for the current page
 * This ensures language toggle stays on the same page instead of redirecting to home
 */
export function getAlternateLanguageUrl(currentPath: string, currentLang: string): string {
  const targetLang = currentLang === 'en' ? 'fr' : 'en';
  
  // Remove leading slash
  const path = currentPath.replace(/^\//, '');
  
  // If already on a French page, remove /fr prefix
  if (currentLang === 'fr') {
    const pathWithoutLang = path.replace(/^fr\/?/, '');
    // If empty (was on homepage), return English homepage
    return pathWithoutLang === '' ? '/' : `/${pathWithoutLang}`;
  }
  
  // If on English page, add /fr prefix
  if (currentLang === 'en') {
    // If on homepage, return French homepage
    if (path === '') {
      return '/fr';
    }
    return `/fr/${path}`;
  }
  
  return '/';
}

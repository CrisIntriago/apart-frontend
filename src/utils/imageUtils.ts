/**
 * Converts a relative image path to an absolute URL
 * @param imagePath - The image path from the API (could be relative or absolute)
 * @returns A properly formatted URL for Next.js Image component
 */
export const getImageUrl = (imagePath: string | null | undefined): string | null => {
  if (!imagePath) return null;
  
  // If it's already an absolute URL (http/https), return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If it starts with a slash, it's already properly formatted for Next.js
  if (imagePath.startsWith('/')) {
    return imagePath;
  }
  
  // If it's a relative path, convert it to an absolute S3 URL
  // Using the standard S3 URL format (without region in hostname)
  const S3_BASE_URL = 'https://apart-backend-django.s3.amazonaws.com';
  return `${S3_BASE_URL}/${imagePath}`;
};

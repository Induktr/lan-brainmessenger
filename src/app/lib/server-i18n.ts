import path from 'path';
import fs from 'fs/promises'; // Use promises version

// Server-side function to load translations
export async function loadTranslations(locale: string) {
  const supportedLngs = ['en', 'ru', 'ua'];
  const finalLocale = supportedLngs.includes(locale) ? locale : 'en'; // Use fallback if locale not supported

  const filePath = path.join(process.cwd(), 'public', 'translations', `${finalLocale}.json`);
  try {
    const fileContents = await fs.readFile(filePath, 'utf-8');
    return {
      locale: finalLocale,
      translations: JSON.parse(fileContents),
    };
  } catch (error) {
    console.error(`Failed to load translations for ${finalLocale}:`, error);
    // Fallback to English if loading fails
    const fallbackFilePath = path.join(process.cwd(), 'public', 'translations', `en.json`);
    const fallbackFileContents = await fs.readFile(fallbackFilePath, 'utf-8');
    return {
      locale: 'en',
      translations: JSON.parse(fallbackFileContents),
    };
  }
}

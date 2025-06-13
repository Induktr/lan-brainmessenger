export interface UpdateItem {
  id: number;
  iconUrl: string;
  imageUrl?: string;
  titleKey: string;
  originalTitle: string; // Fallback for translation
  descriptionKey: string;
  dateKey: string;
}

export const updates: UpdateItem[] = [
  {
    id: 1,
    iconUrl: '/icons/shield.svg',
    imageUrl: '/images/update1.jpg', // Placeholder image
    titleKey: 'updates.item1.title',
    originalTitle: 'Enhanced Security Features',
    descriptionKey: 'updates.item1.description',
    dateKey: 'updates.item1.date',
  },
  {
    id: 2,
    iconUrl: '/icons/globe.svg',
    imageUrl: '/images/update2.jpg', // Placeholder image
    titleKey: 'updates.item2.title',
    originalTitle: 'Multi-language Support',
    descriptionKey: 'updates.item2.description',
    dateKey: 'updates.item2.date',
  },
  {
    id: 3,
    iconUrl: '/icons/bell.svg',
    imageUrl: '/images/update3.jpg', // Placeholder image
    titleKey: 'updates.item3.title',
    originalTitle: 'Improved Notification System',
    descriptionKey: 'updates.item3.description',
    dateKey: 'updates.item3.date',
  },
  {
    id: 4,
    iconUrl: '/icons/group.svg',
    imageUrl: '/images/update4.jpg', // Placeholder image
    titleKey: 'updates.item4.title',
    originalTitle: 'New Group Chat Features',
    descriptionKey: 'updates.item4.description',
    dateKey: 'updates.item4.date',
  },
  {
    id: 5,
    iconUrl: '/icons/mail.svg',
    imageUrl: '/images/update5.jpg', // Placeholder image
    titleKey: 'updates.item5.title',
    originalTitle: 'Email Integration',
    descriptionKey: 'updates.item5.description',
    dateKey: 'updates.item5.date',
  },
  {
    id: 6,
    iconUrl: '/icons/videoCamera.svg',
    imageUrl: '/images/update6.jpg', // Placeholder image
    titleKey: 'updates.item6.title',
    originalTitle: 'Video Call Enhancements',
    descriptionKey: 'updates.item6.description',
    dateKey: 'updates.item6.date',
  },
];
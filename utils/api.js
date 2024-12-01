
export const fetchFavoriteIds = async (userId) => {
  if (!userId) return [];
  try {
    const response = await fetch(`/api/favorites?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data.favorites;
  } catch (error) {
    console.error('Ошибка при получении избранных:', error);
    return [];
  }
};
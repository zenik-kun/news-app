// filepath: /home/zenik/work/products/news-app/utils/dateFormatter.js
export const formatPublishedAt = (dateString) => {
    if (!dateString) return "Date not available";
    try {
      const date = new Date(dateString);
      // You can customize the format as needed.
      // Example: "May 9, 2025, 10:30 AM"
      return date.toLocaleString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    } catch (error) {
      console.error("Error formatting date:", dateString, error);
      return "Invalid date";
    }
  };
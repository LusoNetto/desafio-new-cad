const useFlight = () => {
  const hasBookmark = (id: number) => {
    const bookmarksObject = JSON.parse(localStorage.getItem('bookmarks') || "{}");
    return (
      typeof bookmarksObject[id] === 'string' &&
      (bookmarksObject[id] !== null || bookmarksObject[id] !== undefined)
    );
  };
  
  return {hasBookmark};
}

export default useFlight;
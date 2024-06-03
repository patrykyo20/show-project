const filter = {
  order: {
    options: [
      { label: 'Ascending', value: 'asc' },
      { label: 'Descending', value: 'desc' },
    ],
    defaultValue: 'asc', 
  },
  sort: {
    options: [
      { label: 'By Title', value: 'title' },
      { label: 'By Likes', value: 'likes' },
      { label: 'By Visits', value: 'visits' },
    ],
    defaultValue: 'name',
  },
};

export default filter;

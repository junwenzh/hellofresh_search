import axios from 'axios';

export default async function pullData(token: string, offset: number) {
  const url = `https://gw.hellofresh.com/api/recipes/search?country=us&limit=250&offset=${offset}`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'User-Agent':
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
    },
  });

  return response.data;
}

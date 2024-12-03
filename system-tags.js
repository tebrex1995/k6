import http from 'k6/http';

export const options = {
  thresholds: {
    http_req_duration: ['p(95)<1000'],
    'http_req_duration{status:200}': ['p(95)<1000'],
    'http_req_duration{status:201}': ['p(95)<1000'],
  },
};

export default function () {
  http.get('https://run.mocky.io/v3/1582e455-9dd0-4f01-8066-424a1e51590e');
  http.get(
    'https://run.mocky.io/v3/8f52e11f-4f24-4d26-89ca-d95bb30eb0d4?mocky-delay=2000ms'
  );
}
